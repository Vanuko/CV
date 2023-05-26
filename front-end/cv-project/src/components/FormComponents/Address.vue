<template>
  <div class="address-component-template">
    <div>
      <form-text :titleText="countryText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="indexText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="cityText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="streetText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="streetNumbetText" />
      <input-field />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../Constants/TextConstants";

export default defineComponent({
  name: "AddressComponent",
  components: { FormText, inputField },
  data() {
    return {
      countryText: textConstants.COUNTRY,
      indexText: textConstants.INDEX,
      cityText: textConstants.CITY,
      streetText: textConstants.STREET,
      streetNumbetText: textConstants.STREET_NUMBER,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.address-component-template {
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }
}
</style>