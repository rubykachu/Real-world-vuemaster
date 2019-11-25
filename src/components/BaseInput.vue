<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin]
  // inheritAttrs: false,
  // props: {
  //   label: String,
  //   value: [String, Number]
  // },
  // computed: {
  //   // Fix confuse action @change and others
  //   listeners() {
  //     return {
  //       ...this.$listeners,
  //       input: this.updateValue
  //     };
  //   }
  // },
  // methods: {
  //   updateValue(event) {
  //     this.$emit("input", event.target.value);
  //   }
  // }
};
</script>
