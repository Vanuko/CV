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
        "return-button": this.buttonStyle === "returnStyle",
        "positive-button": this.buttonStyle === "positiveStyle",
      };
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$button-element-padding: rem(5px);
$button-element-border-radius: rem(5px);
$button-element-width: rem(100px);
.button-element {
  cursor: pointer;
  color: $mail-gray-10;
  background: $white;
  padding: $button-element-padding;
  border-radius: $button-element-border-radius;
  width: $button-element-width;
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
  background-color: $hover-mail-yellow;
}
.delete-button {
  color: $white;
  background-color: $red;
}
.delete-button:hover {
  color: $white;
  background-color: $hover-red;
}
$create-button-width: rem(150px);
.create-button {
  color: $white;
  background-color: $mail-blue;
  width: $create-button-width;
}
.create-button:hover {
  color: $white;
  background-color: $hover-mail-blue;
}
$save-button-width: rem(125px);
.save-button {
  color: $white;
  background-color: $mail-yellow;
  width: $save-button-width;
}
.save-button:hover {
  color: $white;
  background-color: $hover-mail-yellow;
}
$update-button-padding-left: rem(10px);
$update-button-padding-right: rem(10px);

.update-button {
  color: $white;
  background-color: $mail-yellow;
  width: fit-content;
  padding-left: $update-button-padding-left;
  padding-right: $update-button-padding-right;
}
.update-button:hover {
  color: $white;
  background-color: $hover-mail-yellow;
}
$return-button-padding-left: rem(10px);
$return-button-padding-right: rem(10px);
.return-button {
  color: $mail-gray-10;
  background-color: $white;
  width: fit-content;
  padding-left: $return-button-padding-left;
  padding-right: $return-button-padding-right;
}
.return-button:hover {
  color: $mail-gray-10;
  background-color: $default-grey-hover;
}
.positive-button {
  color: $white;
  background-color: $green;
}
.positive-button:hover {
  color: $white;
  background-color: $hover-green;
}
</style>