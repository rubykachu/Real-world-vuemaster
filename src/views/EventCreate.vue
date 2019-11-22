<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      label="Select a category"
      v-model="event.category"
      :options="categories"
      class="field"
    />

    <h3>Name & describe your event</h3>

    <BaseInput
      label="Title"
      v-model="event.title"
      type="text"
      placeholder="Add an event title"
      class="field"
    />

    <BaseInput
      label="Description"
      type="text"
      placeholder="Add a description"
      v-model="event.description"
      class="field"
    />

    <h3>Where is your event?</h3>
    <BaseInput
      label="Location"
      type="text"
      placeholder="Add a location"
      v-model="event.location"
      class="field"
    />

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date" />
    </div>

    <BaseSelect
      label="Select a time"
      v-model="event.time"
      :options="times"
      class="field"
    />

    <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
  </form>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
// import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 0; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      peoples: [
        { id: 1, name: "People 1" },
        { id: 2, name: "People 2" }
      ],
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories
    };
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 100000);
      return {
        id: id,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    },
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          NProgress.done();
        });
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
