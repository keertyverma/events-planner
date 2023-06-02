import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-utils";

const HomePage = (props) => {
  return (
    <div>
      <EventList events={props.events} />
    </div>
  );
};

export default HomePage;

// getStaticProps() gets called before rendering page on server
export async function getStaticProps() {
  // This will pre-fetch data during build and include the data in pre-rendered page
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, //30 mins
  };
}
