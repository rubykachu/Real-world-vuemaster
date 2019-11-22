<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      v-model.trim="email"
      @blur="$v.email.$touch()"
      :class="{ error: $v.email.$error }"
    />
    <template v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email address
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Please enter email</p>
    </template>

    <button type="submit" :disabled="$v.$invalid">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required field(s).
    </p>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.invalid) {
        alert("Submited");
      }
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
};
</script>

<style lang="scss" scoped>
.errorMessage {
  color: red;
}
input.error {
  border: 1px solid red;
  color: red;
}
</style>
