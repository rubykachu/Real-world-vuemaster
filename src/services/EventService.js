import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: `https://my-json-server.typicode.com/Code-Pop/real-world-nuxt`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 15000 // 15s
});

export default {
  getEvents(page = 1, perPage = 5) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events/", event);
  }
};
