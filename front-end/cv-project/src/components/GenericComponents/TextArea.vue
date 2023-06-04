<template>
  <div class="text-box-element">
    <textarea
      class="text-box tiny-text-bold"
      :value="value"
      :maxlength="maxInputLength"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextBox",
  emits: ["textInput"],
  props: {
    value: {
      type: String,
    },
    maxInputLength: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    handleInput(event: Event) {
      const el = event.target as HTMLInputElement;
      this.$emit("textInput", el.value);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

$text-box-element-height-textarea-text-box-height: rem(400px);
.text-box-element {
  width: 100%;
  textarea.text-box {
    width: 100%;
    height: $text-box-element-height-textarea-text-box-height;
    resize: none;
    border-color: $border-grey;
  }
}
</style>
