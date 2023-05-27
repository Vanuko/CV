<template>
  <div class="education-data-component-template">
    <div>
      <form-text :titleText="institutionText" />
      <input-field @input="handleInput($event, institutionText)" />
    </div>
    <div>
      <form-text :titleText="facultyText" />
      <input-field @input="handleInput($event, facultyText)" />
    </div>
    <div>
      <form-text :titleText="fieldOfStudyText" />
      <input-field @input="handleInput($event, fieldOfStudyText)" />
    </div>
    <div>
      <form-text :titleText="educationLevelText" />
      <input-field @input="handleInput($event, educationLevelText)" />
    </div>
    <div>
      <form-text :titleText="educationStatusText" />
      <input-field @input="handleInput($event, educationStatusText)" />
    </div>
    <div>
      <form-text :titleText="educationTimeSpentText" />
      <input-field @input="handleInput($event, educationTimeSpentText)" />
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
  name: "EducationDataComponent",
  components: { FormText, inputField },
  data() {
    return {
      institutionText: textConstants.INSTITUTION,
      facultyText: textConstants.FACULITY,
      fieldOfStudyText: textConstants.FIELD_OF_STUDY,
      educationLevelText: textConstants.EDUCATION_LEVEL,
      educationStatusText: textConstants.STATUS,
      educationTimeSpentText: textConstants.TIME_SPENT,
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
      switch (data) {
        case textConstants.FIELD_OF_STUDY: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_STUDY,
            value: inputData,
            arrayKeyName: keyNames.EDU,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.EDUCATION_LEVEL: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_LVL,
            value: inputData,
            arrayKeyName: keyNames.EDU,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.STATUS: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_STAT,
            value: inputData,
            arrayKeyName: keyNames.EDU,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.TIME_SPENT: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_TIME,
            value: inputData,
            arrayKeyName: keyNames.EDU,
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
.education-data-component-template {
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }
}
</style>