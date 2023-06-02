import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/helpers/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        ></meta>
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </Fragment>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
