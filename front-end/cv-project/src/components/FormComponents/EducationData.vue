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
        <generic-dropdown
          :passedItems="educationLevelSelection"
          @itemSelected="handleLevel"
        />
      </div>
      <div>
        <form-text :titleText="educationStatusText" />
        <generic-dropdown
          :passedItems="educationStatusSelection"
          @itemSelected="handleStatus"
        />
      </div>
      <div>
        <form-text :titleText="educationTimeSpentText" />
        <div class="education-date-picker">
          <form-text :titleText="workExperienceText" />
          <div>
            <Datepicker
              v-model="date"
              autoApply
              range
              :maxDate="new Date()"
              :enable-time-picker="false"
              :hide-navigation="['time', 'minutes', 'hours', 'seconds']"
              :clearable="false"
              @closed="updateDateValue(date)"
            />
          </div>
        </div>
      </div>
    </div>
    <button-component
      :buttonStyle="createStyleText"
      :buttonText="addMoreText"
      @click="addEducation()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../constants/TextConstants";
import * as keyNames from "../../constants/KeyNameConstants";
import * as formObjects from "../../constants/FormPartConstants";
import store from "../../store/mainStore";
import buttonComponent from "../GenericComponents/Button.vue";
import { mapState } from "vuex";
import { EducationInterface } from "../../models/form";
import genericDropdown from "../GenericComponents/Dropodown.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  name: "EducationDataComponent",
  components: {
    FormText,
    inputField,
    buttonComponent,
    genericDropdown,
    Datepicker,
  },
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
      addMoreText: "PIEVIENOT",
      educationStatusSelection: formObjects.EDUCATION_STATUS,
      educationLevelSelection: formObjects.EDUCATION_LEVEL,
    };
  },
  setup() {
    const date = ref();
    return {
      date,
    };
  },
  methods: {
    updateDateValue(data: any) {
      const lastUid = store.getters.getLastUid;
      let dateString = "";
      if (data) {
        const datesArray = [new Date(data[0]), new Date(data[1])];
        const formatDate = (date: Date) => {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = String(date.getFullYear());
          return `${day}/${month}/${year}`;
        };

        const formattedDates = datesArray.map(formatDate);
        dateString = formattedDates.join(" - ");
      }
      store.dispatch("updateFormPart", {
        part: keyNames.EDU_TIME,
        value: dateString,
        arrayKeyName: keyNames.EDU,
        uuid: lastUid.last_education_ID,
      });
    },
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
    },
    handleStatus(data: string) {
      const lastUid = store.getters.getLastUid;
      store.dispatch("updateFormPart", {
        part: keyNames.EDU_LVL,
        value: data,
        arrayKeyName: keyNames.EDU,
        uuid: lastUid.last_education_ID,
      });
    },
    handleLevel(data: string) {
      const lastUid = store.getters.getLastUid;
      store.dispatch("updateFormPart", {
        part: keyNames.EDU_STAT,
        value: data,
        arrayKeyName: keyNames.EDU,
        uuid: lastUid.last_education_ID,
      });
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
      div {
        margin-bottom: 1px; //SCSS
      }
    }
  }
  > div:nth-child(2) {
    margin-top: 5px;
  }
  .education-date-picker {
    height: 62px;
    > div:nth-child(2) {
      width: 250px;
    }
  }
}
</style>