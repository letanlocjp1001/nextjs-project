import { getEventById } from '@/dummy-data'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import EventSummary from '@/components/event-detail/event-summary'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventContent from '@/components/event-detail/event-content'

function EventDetailPage() {
  const router = useRouter()

  const enventId = router.query.eventId

  const event = getEventById(enventId)

  if (!event) {
    return <p>No event found!</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  )
}
export default EventDetailPage
