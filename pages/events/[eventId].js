import { getEventById, getFeaturedEvents } from '@/helpers/api-util'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import EventSummary from '@/components/event-detail/event-summary'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventContent from '@/components/event-detail/event-content'
import ErrorAlert from '@/components/ui/error-alert'

function EventDetailPage(props) {
  // const router = useRouter()

  // const enventId = router.query.eventId

  const event = props.selectedEvent

  if (!event) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 600,
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: true,
  }
}
export default EventDetailPage
