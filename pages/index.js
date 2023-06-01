import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/data/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>HomePage</h1>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default HomePage;
