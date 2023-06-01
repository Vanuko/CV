<template>
  <div :class="['button-element small-text']">
    {{ buttonText }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  components: {},
  props: {
    buttonText: {
      type: String,
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(45px);
.button-element {
  cursor: pointer;
  color: $mail-gray-10;
  background: $white;
  padding: 5px; //SCSS
  border-radius: 5px; //SCSS
  width: 100px; //SCSS
  display: flex;
  justify-content: center;
}
.button-element:hover {
  background: #d3d3d3;
}
</style>