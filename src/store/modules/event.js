import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  totalEvents: 1
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  TOTAL_EVENTS(state, numPage) {
    state.totalEvents = numPage;
  }
};

export const actions = {
  createEvent({ commit }, event) {
    EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  fetchEvents({ commit }, { page, perPage }) {
    EventService.getEvents(page, perPage)
      .then(response => {
        let numPage = parseInt(response.headers["x-total-count"]);
        commit("TOTAL_EVENTS", numPage);
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
