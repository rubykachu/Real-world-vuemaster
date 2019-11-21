<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev
      </router-link>
      |
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState, mapActions } from "vuex";
import store from "@/store/index.js";

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page || 1);
  store.dispatch("event/fetchEvents", { page: currentPage }).then(() => {
    to.params.page = currentPage;
    next();
  });
}

export default {
  components: {
    EventCard
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(["event", "user"])
  },
  methods: mapActions("event", ["fetchEvents"]),
  beforeRouteEnter(to, _from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, _from, next) {
    getPageEvents(to, next);
  }
};
</script>
