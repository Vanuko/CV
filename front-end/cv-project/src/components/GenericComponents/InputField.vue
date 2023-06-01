<template>
  <div class="input-field-element">
    <input type="text" :value="value" maxlength="30" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputField",
  components: {},
  emits: ["input"],
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    handleInput(event: Event) {
      const el = event.target as HTMLInputElement;
      this.$emit("input", el.value);
    },
  },
  mounted() {
    console.log("value?", this.value);
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(45px);
</style>
