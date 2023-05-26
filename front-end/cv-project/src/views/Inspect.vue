<template>
  <div class="inspect-view-template">
    <div class="displayed-cv"></div>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";

export default defineComponent({
  name: "Inspect",
  components: {},
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.inspect-view-template {
  display: flex;
  justify-content: center;
  $displayed-cv-height: rem(800px);
  $displayed-cv-width: rem(600px);
  $displayed-cv-margin-top: rem(30px);
  .displayed-cv {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: $displayed-cv-width;
    height: $displayed-cv-height;
    margin-top: $displayed-cv-margin-top;
    background: $white;
  }
}
</style>