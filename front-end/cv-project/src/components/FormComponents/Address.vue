<template>
  <div class="address-component-template">
    <div>
      <form-text :titleText="countryText" />
      <input-field @input="handleInput($event, countryText)" />
    </div>
    <div>
      <form-text :titleText="indexText" />
      <input-field @input="handleInput($event, indexText)" />
    </div>
    <div>
      <form-text :titleText="cityText" />
      <input-field @input="handleInput($event, cityText)" />
    </div>
    <div>
      <form-text :titleText="streetText" />
      <input-field @input="handleInput($event, streetText)" />
    </div>
    <div>
      <form-text :titleText="streetNumbetText" />
      <input-field @input="handleInput($event, streetNumbetText)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../constants/TextConstants";
import * as keyNames from "../../constants/KeyNameConstants";
import store from "../../store/mainStore";

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
  methods: {
    handleInput(inputData: string, data: string) {
      console.log(inputData, data);
      switch (data) {
        case textConstants.COUNTRY: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_COUNTRY,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.INDEX: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_INDEX,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.CITY: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_CITY,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.STREET: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_STREET,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.STREET_NUMBER: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_NR,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
          });
          break;
        }
      }
    },
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