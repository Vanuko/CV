<template>
  <div class="form-text-component-template default-title-text-light">
    {{ titleText }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormTextComponent",
  components: {},
  props: {
    titleText: {
      type: String,
    },
  },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
</style>