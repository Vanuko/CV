<template>
  <div class="button-element">{{ buttonText }}</div>
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
}
</style>