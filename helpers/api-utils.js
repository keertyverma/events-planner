const API_URL =
  "https://nextjs-poc-15a0c-default-rtdb.firebaseio.com/events.json";

export async function getAllEvents() {
  const response = await fetch(API_URL);
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
