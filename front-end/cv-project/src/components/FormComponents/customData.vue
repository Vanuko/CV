<template>
  <div class="education-data-component-template">
    <div>
      <form-text :titleText="subTitleText" />
      <input-field @input="handleInput($event, subTitleText)" />
    </div>
    <div>
      <form-text :titleText="informationText" />
      <input-field @input="handleInput($event, informationText)" />
    </div>
    <button-component :buttonText="'Add more'" @click="addCustom()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../constants/TextConstants";
import * as keyNames from "../../constants/KeyNameConstants";
import store from "../../store/mainStore";
import buttonComponent from "../GenericComponents/Button.vue";

export default defineComponent({
  name: "EducationDataComponent",
  components: { FormText, inputField, buttonComponent },
  data() {
    return {
      subTitleText: textConstants.SUB_TITLE, //Const
      informationText: textConstants.INFORMATION, //Const
      uuid: 0,
    };
  },
  methods: {
    handleInput(inputData: string, data: string) {
      console.log(inputData, data);
      switch (data) {
        case textConstants.INSTITUTION: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_INST,
            value: inputData,
            arrayKeyName: keyNames.EDU,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.FACULITY: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_FAC,
            value: inputData,
            arrayKeyName: keyNames.EDU,
          });
          break;
        }
      }
    },
    addCustom() {
      this.uuid += 1;
      const customData = {
        arrayKeyName: keyNames.CUS,
        object: {
          ID: this.uuid,
          custom_name: "Custom Title",
          custom_value:
            "Custom Data Custom Data Custom Data Custom Data Custom Data",
        },
      };
      store.dispatch("attachObject", customData);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.education-data-component-template {
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }
}
</style>