import { Fragment } from "react";

import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getEventById, getAllEvents } from "@/helpers/api-utils";

const EventDetailPage = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
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
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const pathsWithParams = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}
