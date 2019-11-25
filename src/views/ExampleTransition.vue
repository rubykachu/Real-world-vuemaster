<template>
  <div>
    <button @click="toggleModal">Open modal</button>
    <transition name="fade">
      <div class="modal" v-if="isOpen">
        <button @click="toggleModal">Close modal</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: 300px;
  height: 300px;
  background-color: darkslategrey;
  border: 1px solid slategray;
  margin: 20px 0;
  color: white;
  padding: 20px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
