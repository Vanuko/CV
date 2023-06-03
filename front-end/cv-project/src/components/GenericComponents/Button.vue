<template>
  <div :class="['button-element tiny-text-bold', buttonStyleClass]">
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
    buttonStyle: {
      type: String,
    },
  },
  computed: {
    buttonStyleClass() {
      return {
        "edit-button": this.buttonStyle === "editStyle",
        "delete-button": this.buttonStyle === "deleteStyle",
        "create-button": this.buttonStyle === "createStyle",
        "save-button": this.buttonStyle === "saveStyle",
        "update-button": this.buttonStyle === "updateStyle",
      };
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
  background: $default-grey;
}
.edit-button {
  color: $white;
  background-color: $mail-yellow;
}
.edit-button:hover {
  color: $white;
  background-color: $mail-yellow;
  opacity: 0.6;
}
.delete-button {
  color: $text-grey;
  background-color: $red;
}
.delete-button:hover {
  color: $text-grey;
  background-color: $red;
  opacity: 0.6;
}
.create-button {
  color: $white;
  background-color: $mail-blue;
  width: 125px;
}
.create-button:hover {
  color: $white;
  background-color: $mail-blue;
  opacity: 0.6;
}
.save-button {
  color: $white;
  background-color: $mail-yellow;
  width: 125px;
}
.save-button:hover {
  color: $white;
  background-color: $mail-yellow;
  opacity: 0.6;
}
.update-button {
  color: $white;
  background-color: $mail-yellow;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px; //SCSS
}
.update-button:hover {
  color: $white;
  background-color: $mail-yellow;
  opacity: 0.6;
}
</style>