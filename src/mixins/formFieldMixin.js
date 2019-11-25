export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: String,
    value: [String, Number]
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
