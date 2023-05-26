<template>
  <div class="input-field-element">
    <input type="text" maxlength="30" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputFieldComponent",
  components: {},
  props: {},
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(45px);
</style>