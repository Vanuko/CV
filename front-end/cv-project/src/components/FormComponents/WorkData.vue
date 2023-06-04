<template>
  <div class="work-data-component-template">
    <div v-if="workValues">
      <div>
        <form-text :titleText="workPlaceText" />
        <input-field
          :value="workValues.work_place"
          @input="handleInput($event, workPlaceText)"
        />
      </div>
      <div>
        <form-text :titleText="workPositionText" />
        <input-field
          :value="workValues.work_position"
          @input="handleInput($event, workPositionText)"
        />
      </div>
      <div>
        <form-text :titleText="workLoadText" />
        <generic-dropdown
          :value="workValues.work_load"
          :passedItems="workLoadSelection"
          @itemSelected="handleLoad"
        />
      </div>
      <div class="work-date-picker">
        <form-text :titleText="workExperienceText" />
        <div>
          <Datepicker
            v-model="date"
            autoApply
            range
            :placeholder="workValues.work_experience"
            :maxDate="new Date()"
            :enable-time-picker="false"
            :hide-navigation="['time', 'minutes', 'hours', 'seconds']"
            :clearable="false"
            @closed="updateDateValue(date)"
          />
        </div>
      </div>
    </div>
    <button-component
      :buttonStyle="createStyleText"
      :buttonText="addMoreText"
      @click="addWork()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../constants/TextConstants";
import * as keyNames from "../../constants/KeyNameConstants";
import * as valueConstants from "../../constants/ValueConstants";
import store from "../../store/mainStore";
import buttonComponent from "../GenericComponents/Button.vue";
import { WorkplaceInterface } from "../../models/form";
import { mapState } from "vuex";
import genericDropdown from "../GenericComponents/Dropodown.vue";
import * as formObjects from "../../constants/FormPartConstants";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  name: "WorkDataComponent",
  components: {
    FormText,
    inputField,
    buttonComponent,
    genericDropdown,
    Datepicker,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      minYear: new Date().getFullYear() - 100,
      workPlaceText: textConstants.WORKPLACE,
      workPositionText: textConstants.POSITION,
      workLoadText: textConstants.WORK_LOAD,
      workExperienceText: textConstants.WORK_EXPERIENCE,
      uuid: 0,
      createStyleText: valueConstants.STYLE_CREATE,
      addMoreText: textConstants.ADD,
      workLoadSelection: formObjects.WORK_LOAD,
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
        part: keyNames.W_EXP,
        value: dateString,
        arrayKeyName: keyNames.WORK,
        uuid: lastUid.last_work_ID,
      });
    },
    handleLoad(data: string) {
      const lastUid = store.getters.getLastUid;
      store.dispatch("updateFormPart", {
        part: keyNames.W_LOAD,
        value: data,
        arrayKeyName: keyNames.WORK,
        uuid: lastUid.last_work_ID,
      });
    },
    handleInput(inputData: string, data: string) {
      const lastUid = store.getters.getLastUid;
      switch (data) {
        case textConstants.WORKPLACE: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_PLACE,
            value: inputData,
            arrayKeyName: keyNames.WORK,
            uuid: lastUid.last_work_ID,
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
            uuid: lastUid.last_work_ID,
          });
          break;
        }
      }
    },
    addWork() {
      const latstUidObject = store.state.formStore.lastUid;
      this.uuid = latstUidObject.last_work_ID + 1;
      const workData = {
        arrayKeyName: keyNames.WORK,
        object: {
          ID: this.uuid,
          work_place: null,
          work_position: null,
          work_load: null,
          work_experience: null,
        },
      };
      store.dispatch("attachObject", workData);
      store.dispatch("changeLastUid", {
        part: keyNames.LAST_WORK,
        uuid: this.uuid,
      });
    },
  },
  computed: {
    ...mapState({
      workValues: (state: any) => {
        const formObject = state.formStore.cvObject;
        const latstUidObject = state.formStore.lastUid;
        if (formObject.work) {
          const workObject = formObject.work.find(
            (work: WorkplaceInterface) =>
              work.ID === latstUidObject.last_work_ID
          );
          return workObject;
        } else {
          return null;
        }
      },
    }),
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$work-data-component-template-first-child-inner-div-margin-bottom: rem(1px);
$work-data-component-template-second-child-margin-top: rem(5px);
.work-data-component-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  > div:nth-child(1) {
    div {
      display: flex;
      flex-direction: column;
      div {
        margin-bottom: $work-data-component-template-first-child-inner-div-margin-bottom;
      }
    }
  }
  > div:nth-child(2) {
    margin-top: $work-data-component-template-second-child-margin-top;
  }
  $work-date-picker-height: rem(62px);
  $work-date-picker-second-child-width: rem(250px);
  .work-date-picker {
    height: $work-date-picker-height;
    > div:nth-child(2) {
      width: $work-date-picker-second-child-width;
    }
  }
}
</style>