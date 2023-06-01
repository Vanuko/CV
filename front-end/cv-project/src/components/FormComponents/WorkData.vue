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
    <button-component :buttonText="'Add more'" @click="addWork()" />
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
  name: "WorkDataComponent",
  components: { FormText, inputField, buttonComponent },
  data() {
    return {
      workPlaceText: textConstants.WORKPLACE,
      workPositionText: textConstants.POSITION,
      workLoadText: textConstants.WORK_LOAD,
      workExperienceText: textConstants.WORK_EXPERIENCE,
      buttonText: "Add more",
      uuid: 0,
    };
  },
  methods: {
    handleInput(inputData: string, data: string) {
      switch (data) {
        case textConstants.WORKPLACE: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_PLACE,
            value: inputData,
            arrayKeyName: keyNames.WORK,
            uuid: this.uuid,
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
            uuid: this.uuid,
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
            uuid: this.uuid,
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
            uuid: this.uuid,
          });
          break;
        }
      }
    },
    addWork() {
      this.uuid += this.uuid;
      const workData = {
        arrayKeyName: keyNames.WORK,
        object: {
          ID: this.uuid,
          work_place: "Other Place",
          work_position: "Other Position",
          work_load: "Full-time",
          work_experience: 0,
        },
      };
      store.dispatch("attachObject", workData);
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