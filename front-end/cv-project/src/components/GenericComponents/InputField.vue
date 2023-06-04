<template>
  <div class="input-field-element">
    <input
      class="tiny-text-bold"
      :type="type"
      :value="value"
      :maxlength="maxInputLength"
      @input="handleInput"
    />
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
    type: {
      type: String,
      default: "text"
    },
    maxInputLength: {
      type: Number,
      default: 30
    },
  },
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
$input-field-element-height: rem(35px);
.input-field-element {
  width: 100%;
  height: $input-field-element-height;
  input {
    height: 100%;
    width: 100%;
    border-color: $border-grey;
  }
}
</style>
