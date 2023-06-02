import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";

const API_URL =
  "https://nextjs-poc-15a0c-default-rtdb.firebaseio.com/events.json";

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();

  const filterData = router.query.slug;

  // fetch all events
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(API_URL, fetcher);

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // convert to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found for selected filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const selectedDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={selectedDate} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
