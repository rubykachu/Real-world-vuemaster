<template>
  <div>
    <label v-if="label">{{ label }}</label>

    <select
      @change="updateValue"
      v-bind="$attrs"
      :value="value"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    // Fix confuse action @change and others
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
