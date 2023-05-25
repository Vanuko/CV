<template>
  <div class="list-element">
    This is a element
    <button-component :buttonText="editText" @click="edit()" />
    <button-component :buttonText="deleteText" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import buttonComponent from "../GenericComponents/Button.vue";
import * as textConstants from "../../Constants/TextConstants";
import router from "../../router/index";

export default defineComponent({
  name: "ListElementComponent",
  components: { buttonComponent },

  data() {
    return {
      deleteText: textConstants.DELETE,
      editText: textConstants.EDIT,
    };
  },
  methods: {
    edit() {
      router.push("/edit");
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$list-element-height: rem(45px);
$list-element-width: rem(1000px);
$list-element-margin-top: rem(15px);
$list-element-border-radius: rem(3px);
.list-element {
  display: flex;
  align-items: center;
  height: $list-element-height;
  width: $list-element-width;
  margin-top: $list-element-margin-top;
  background-color: $mail-white;
  border-radius: $list-element-border-radius;
}
</style>