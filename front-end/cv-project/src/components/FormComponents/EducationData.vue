<template>
  <div class="education-data-component-template">
    <div>
      <form-text :titleText="institutionText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="facultyText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="fieldOfStudyText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="educationLevelText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="educationStatusText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="educationTimeSpentText" />
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