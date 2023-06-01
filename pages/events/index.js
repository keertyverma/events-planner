import EventList from "@/components/events/EventList";
import { getAllEvents } from "@/data/dummy-data";

const EventsPage = () => {
  const events = getAllEvents();

  return (
    <div>
      <h1>All Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;
