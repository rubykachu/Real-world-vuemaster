<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title | formatTitle("!!!") }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : "" }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        class="list-item"
        :key="index"
      >
        <b>{{ attendee }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import store from "@/store/index.js";

export default {
  props: ["id"],
  filters: {
    formatTitle(value, text) {
      return value.toUpperCase() + text;
    }
  },
  computed: mapState({
    event: state => state.event.event
  }),
  methods: mapActions("event", ["fetchEvent"]),
  // created() {
  // this.fetchEvent(this.id);
  // this.$store.dispatch("event/fetchEvent", this.id);
  // },
  beforeRouteEnter(to, _from, next) {
    store
      .dispatch("event/fetchEvent", to.params.id)
      .then(() => {
        next();
      })
      .catch(error => {
        if (error.response && error.response.status == 404) {
          next({ name: "not-found", params: { resource: "event" } });
        } else {
          next({ name: "network-issue" });
        }
      });
  }
};
</script>
