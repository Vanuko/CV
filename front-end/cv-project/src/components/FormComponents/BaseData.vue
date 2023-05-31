<template>
  <div class="base-data-component-template">
    <div class="cv-base-data-name-title-block">
      <form-text :titleText="name" />
      <input-field @input="handleInput($event, name)" />
    </div>
    <div>
      <form-text :titleText="surname" />
      <input-field @input="handleInput($event, surname)" />
    </div>
    <div>
      <form-text :titleText="phoneNr" />
      <input-field @input="handleInput($event, phoneNr)" />
    </div>
    <div>
      <form-text :titleText="mail" />
      <input-field @input="handleInput($event, mail)" />
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
  methods: {
    handleInput(inputData: string, data: string) {
      switch (data) {
        case textConstants.NAME: {
          store.dispatch("updateFormPart", {
            part: keyNames.NAME,
            value: inputData,
          });
          break;
        }
        case textConstants.SURNAME: {
          store.dispatch("updateFormPart", {
            part: keyNames.SURNAME,
            value: inputData,
          });
          break;
        }
        case textConstants.PHONE_NUMBER: {
          store.dispatch("updateFormPart", {
            part: keyNames.PHONE,
            value: inputData,
          });
          break;
        }
        case textConstants.EMAIL: {
          store.dispatch("updateFormPart", {
            part: keyNames.EMAIL,
            value: inputData,
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
.base-data-component-template {
  width: 100%;
  .cv-base-data-name-title{
    font-size: 35px;
  }
  div {
    display: flex;
    flex-direction: row;
  }
}
</style>