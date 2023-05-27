<template>
  <div class="input-field-element">
    <input type="text" maxlength="30" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputFieldComponent",
  components: {},
  emits: ["input"],
  props: {},
  methods: {
    handleInput(event: Event) {
      const el = event.target as HTMLInputElement;
      this.$emit("input", el.value);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(45px);
</style>