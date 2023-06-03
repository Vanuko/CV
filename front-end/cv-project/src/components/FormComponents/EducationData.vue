<template>
  <div class="education-data-component-template">
    <div v-if="educationValues">
      <div>
        <form-text :titleText="institutionText" />
        <input-field
          :value="educationValues.education_institution"
          @input="handleInput($event, institutionText)"
        />
      </div>
      <div>
        <form-text :titleText="facultyText" />
        <input-field
          :value="educationValues.education_faculty"
          @input="handleInput($event, facultyText)"
        />
      </div>
      <div>
        <form-text :titleText="fieldOfStudyText" />
        <input-field
          :value="educationValues.education_field_of_study"
          @input="handleInput($event, fieldOfStudyText)"
        />
      </div>
      <div>
        <form-text :titleText="educationLevelText" />
        <input-field
          :value="educationValues.education_level"
          @input="handleInput($event, educationLevelText)"
        />
      </div>
      <div>
        <form-text :titleText="educationStatusText" />
        <input-field
          :value="educationValues.education_status"
          @input="handleInput($event, educationStatusText)"
        />
      </div>
      <div>
        <form-text :titleText="educationTimeSpentText" />
        <input-field
          :value="educationValues.education_time_spent"
          @input="handleInput($event, educationTimeSpentText)"
        />
      </div>
    </div>
    <button-component :buttonStyle="createStyleText" :buttonText="'Add more'" @click="addEducation()" />
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
import { mapState } from "vuex";
import { EducationInterface } from "../../models/form";

export default defineComponent({
  name: "EducationDataComponent",
  components: { FormText, inputField, buttonComponent },
  data() {
    return {
      institutionText: textConstants.INSTITUTION,
      facultyText: textConstants.FACULITY,
      fieldOfStudyText: textConstants.FIELD_OF_STUDY,
      educationLevelText: textConstants.EDUCATION_LEVEL,
      educationStatusText: textConstants.STATUS,
      educationTimeSpentText: textConstants.TIME_SPENT,
      uuid: 0,
      createStyleText: "createStyle", //CONST
    };
  },
  methods: {
    handleInput(inputData: string, data: string) {
      const lastUid = store.getters.getLastUid;
      switch (data) {
        case textConstants.INSTITUTION: {
          store.dispatch("updateFormPart", {
            part: keyNames.EDU_INST,
            value: inputData,
            arrayKeyName: keyNames.EDU,
            uuid: lastUid.last_education_ID,
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
            uuid: lastUid.last_education_ID,
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
            uuid: lastUid.last_education_ID,
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
            uuid: lastUid.last_education_ID,
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
            uuid: lastUid.last_education_ID,
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
            uuid: lastUid.last_education_ID,
          });
          break;
        }
      }
    },
    addEducation() {
      const latstUidObject = store.state.formStore.lastUid;
      this.uuid = latstUidObject.last_education_ID + 1;
      const educationData = {
        arrayKeyName: keyNames.EDU,
        object: {
          ID: this.uuid,
          education_institution: null,
          education_faculty: null,
          education_field_of_study: null,
          education_level: null,
          education_status: null,
          education_time_spent: 0,
        },
      };
      store.dispatch("attachObject", educationData);
      store.dispatch("changeLastUid", {
        part: keyNames.LAST_EDU,
        uuid: this.uuid,
      });
    },
  },
  computed: {
    ...mapState({
      educationValues: (state: any) => {
        const formObject = state.formStore.cvObject;
        const latstUidObject = state.formStore.lastUid;
        const educationObject = formObject.education.find(
          (education: EducationInterface) =>
            education.ID === latstUidObject.last_education_ID
        );
        return educationObject;
      },
    }),
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.education-data-component-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  > div:nth-child(1) {
    div {
      display: flex;
      flex-direction: column;
    }
  }
  > div:nth-child(2) {
    margin-top: 5px;
  }
}
</style>