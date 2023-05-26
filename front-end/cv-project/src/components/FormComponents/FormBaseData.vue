<template>
  <div class="base-data-component-template">
    <div>
      <form-text :titleText="name" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="surname" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="phoneNr" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="mail" />
      <input-field />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../constants/TextConstants";

export default defineComponent({
  name: "BaseDataComponent",
  components: { FormText, inputField },
  props: {
    baseData: {
      type: Object,
    },
  },
  data() {
    return {
      name: textConstants.NAME,
      surname: textConstants.SURNAME,
      phoneNr: textConstants.PHONE_NUMBER,
      mail: textConstants.EMAIL,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.base-data-component-template {
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }
}
</style>