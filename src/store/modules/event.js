import EventService from "@/services/EventService.js";
import * as message from "@/store/modules/message_handler.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3
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
  SET_EVENTS_TOTAL(state, numPage) {
    state.eventsTotal = numPage;
  }
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        message.dispatchSuccess(dispatch);
      })
      .catch(error => {
        message.dispatchError(dispatch, error.message);
        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(page, state.perPage)
      .then(response => {
        let eventsTotal = parseInt(response.headers["x-total-count"]);
        commit("SET_EVENTS_TOTAL", eventsTotal);
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        message.dispatchError(dispatch, error.message);
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => {
          message.dispatchError(dispatch, error.message);
        });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
