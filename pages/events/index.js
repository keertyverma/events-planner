import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";

const EventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </div>
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
