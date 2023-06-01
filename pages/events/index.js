import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/data/dummy-data";
import { useRouter } from "next/router";

const EventsPage = () => {
  const router = useRouter();

  const events = getAllEvents();

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
