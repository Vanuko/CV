<template>
  <div class="custom-data-component-template">
    <div v-if="customFieldValues">
      <div>
        <form-text :titleText="subTitleText" />
        <input-field
          :value="customFieldValues.custom_name"
          @input="handleInput($event, subTitleText)"
        />
      </div>
      <div>
        <form-text :titleText="informationText" />
        <input-field
          :value="customFieldValues.custom_value"
          @input="handleInput($event, informationText)"
        />
      </div>
    </div>
    <button-component
      :buttonStyle="createStyleText"
      :buttonText="'Add more'"
      @click="addCustom()"
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
import { mapState } from "vuex";
import { CustomFields } from "../../models/form";

export default defineComponent({
  name: "EducationDataComponent",
  components: { FormText, inputField, buttonComponent },
  data() {
    return {
      subTitleText: textConstants.SUB_TITLE, //Const
      informationText: textConstants.INFORMATION, //Const
      uuid: 0,
      createStyleText: "createStyle", //CONST
    };
  },
  methods: {
    handleInput(inputData: string, data: string) {
      const lastUid = store.getters.getLastUid;
      switch (data) {
        case textConstants.SUB_TITLE: {
          store.dispatch("updateFormPart", {
            part: keyNames.CUS_NAME,
            value: inputData,
            arrayKeyName: keyNames.CUS,
            uuid: lastUid.last_custom_ID,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.INFORMATION: {
          store.dispatch("updateFormPart", {
            part: keyNames.CUS_VALUE,
            value: inputData,
            arrayKeyName: keyNames.CUS,
            uuid: lastUid.last_custom_ID,
          });
          break;
        }
      }
    },
    addCustom() {
      const latstUidObject = store.state.formStore.lastUid;
      this.uuid = latstUidObject.last_custom_ID + 1;
      const customData = {
        arrayKeyName: keyNames.CUS,
        object: {
          ID: this.uuid,
          custom_name: null,
          custom_value: null,
        },
      };
      store.dispatch("attachObject", customData);
      store.dispatch("changeLastUid", {
        part: keyNames.LAST_CUS,
        uuid: this.uuid,
      });
    },
  },
  computed: {
    ...mapState({
      customFieldValues: (state: any) => {
        const formObject = state.formStore.cvObject;
        const latstUidObject = state.formStore.lastUid;
        const customObject = formObject.custom.find(
          (custom: CustomFields) => custom.ID === latstUidObject.last_custom_ID
        );
        return customObject;
      },
    }),
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.custom-data-component-template {
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