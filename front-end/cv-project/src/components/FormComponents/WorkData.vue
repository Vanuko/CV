<template>
  <div class="work-data-component-template">
    <div>
      <form-text :titleText="workPlaceText" />
      <input-field @input="handleInput($event, workPlaceText)" />
    </div>
    <div>
      <form-text :titleText="workPositionText" />
      <input-field @input="handleInput($event, workPositionText)" />
    </div>
    <div>
      <form-text :titleText="workLoadText" />
      <input-field @input="handleInput($event, workLoadText)" />
    </div>
    <div>
      <form-text :titleText="workExperienceText" />
      <input-field @input="handleInput($event, workExperienceText)" />
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
  name: "WorkDataComponent",
  components: { FormText, inputField },
  data() {
    return {
      workPlaceText: textConstants.WORKPLACE,
      workPositionText: textConstants.POSITION,
      workLoadText: textConstants.WORK_LOAD,
      workExperienceText: textConstants.WORK_EXPERIENCE,
    };
  },
  methods: {
    handleInput(inputData: string, data: string) {
      console.log(inputData, data);
      switch (data) {
        case textConstants.WORKPLACE: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_PLACE,
            value: inputData,
            arrayKeyName: keyNames.WORK,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.POSITION: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_POS,
            value: inputData,
            arrayKeyName: keyNames.WORK,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.WORK_LOAD: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_LOAD,
            value: inputData,
            arrayKeyName: keyNames.WORK,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.WORK_EXPERIENCE: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_EXP,
            value: inputData,
            arrayKeyName: keyNames.WORK,
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
.work-data-component-template {
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }
}
</style>