<template>
  <div class="list-component-template">
    <div v-for="listItem in MockData" :key="listItem">
      <list-element />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import listElement from "../ListComponents/ListElement.vue";

export default defineComponent({
  name: "ListComponent",
  components: { listElement },
  data() {
    return {
      MockData: [{ name: "Object one" }, { name: "Object two" }],
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$list-component-template-height: rem(800px);
$list-component-template-width: rem(1200px);
$list-component-template-margin-top: rem(30px);
.list-component-template {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  width: $list-component-template-width;
  height: $list-component-template-height;
  margin-top: $list-component-template-margin-top;
  background: $white;
}
</style>