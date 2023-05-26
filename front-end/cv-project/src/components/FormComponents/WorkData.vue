<template>
  <div class="work-data-component-template">
    <div>
      <form-text :titleText="workPlaceText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="workPositionText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="workLoadText" />
      <input-field />
    </div>
    <div>
      <form-text :titleText="workExperienceText" />
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