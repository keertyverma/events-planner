import { Fragment } from "react";
import Head from "next/head";

import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";

const EventDetailPage = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description}></meta>
      </Head>
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
      <Comments eventId={event.id} />
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // pre-generate data with featured events
  const featuredEvents = await getFeaturedEvents();
  const pathsWithParams = featuredEvents.map((event) => ({
    params: { id: event.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
}
