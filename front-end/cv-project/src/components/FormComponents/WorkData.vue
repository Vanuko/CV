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
        <input-field
          :value="workValues.work_load"
          @input="handleInput($event, workLoadText)"
        />
      </div>
      <div>
        <form-text :titleText="workExperienceText" />
        <input-field
          :type="typeNumber"
          :value="workValues.work_experience"
          @input="handleInput($event, workExperienceText)"
        />
      </div>
    </div>
    <button-component
      :buttonStyle="createStyleText"
      :buttonText="'Add more'"
      @click="addWork()"
    />
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
import { WorkplaceInterface } from "../../models/form";
import { mapState } from "vuex";

export default defineComponent({
  name: "WorkDataComponent",
  components: { FormText, inputField, buttonComponent },
  data() {
    return {
      workPlaceText: textConstants.WORKPLACE,
      workPositionText: textConstants.POSITION,
      workLoadText: textConstants.WORK_LOAD,
      workExperienceText: textConstants.WORK_EXPERIENCE,
      buttonText: "Add more", //CONST
      uuid: 0,
      typeNumber: "number", //REMOVE?
      createStyleText: "createStyle", //CONST
    };
  },
  methods: {
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
      switch (data) {
        case textConstants.WORK_LOAD: {
          store.dispatch("updateFormPart", {
            part: keyNames.W_LOAD,
            value: inputData,
            arrayKeyName: keyNames.WORK,
            uuid: lastUid.last_work_ID,
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
          work_experience: 0,
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
          console.log(formObject.work);
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
$example: rem(800px);
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
        margin-bottom: 1px; //SCSS
      }
    }
  }
  > div:nth-child(2) {
    margin-top: 5px;
  }
}
</style>