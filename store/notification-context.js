import { createContext, useState, useEffect } from 'react'

const NotificationContext = createContext({
  notification: null, //{title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
})

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    if (
      (activeNotification && activeNotification.status === 'success') ||
      (activeNotification && activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeNotification])

  function showNotificationHandler(notificationData) {
    setActiveNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    })
  }
  function hideNotificationHanler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHanler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
