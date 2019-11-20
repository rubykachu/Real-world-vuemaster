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
import { mapState } from "vuex";

const perPage = 3;
export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.event.totalEvents > this.page * perPage;
    },
    ...mapState(["event", "user"])
  },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      page: this.page,
      perPage: perPage // default
    });
  }
};
</script>
