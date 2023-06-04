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
        <generic-text-area
          :value="customFieldValues.custom_value"
          @textInput="handleTextInput($event, informationText)"
        />
      </div>
    </div>
    <button-component
      :buttonStyle="createStyleText"
      :buttonText="addMoreText"
      @click="addCustom()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import genericTextArea from "../GenericComponents/TextArea.vue";
import * as textConstants from "../../constants/TextConstants";
import * as keyNames from "../../constants/KeyNameConstants";
import * as valueConstants from "../../constants/ValueConstants";
import store from "../../store/mainStore";
import buttonComponent from "../GenericComponents/Button.vue";
import { mapState } from "vuex";
import { CustomFields } from "../../models/form";

export default defineComponent({
  name: "EducationDataComponent",
  components: { FormText, inputField, buttonComponent, genericTextArea },
  data() {
    return {
      subTitleText: textConstants.SUB_TITLE,
      informationText: textConstants.INFORMATION,
      uuid: 0,
      createStyleText: valueConstants.STYLE_CREATE,
      addMoreText: textConstants.ADD,
    };
  },
  methods: {
    handleTextInput(textData: string) {
      const lastUid = store.getters.getLastUid;
      store.dispatch("updateFormPart", {
        part: keyNames.CUS_VALUE,
        value: textData,
        arrayKeyName: keyNames.CUS,
        uuid: lastUid.last_custom_ID,
      });
    },
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
$custom-data-component-template-first-child-second-div-margin-bottom: rem(1px);
$custom-data-component-template-second-child-margin-top: rem(5px);
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
        margin-bottom: $custom-data-component-template-first-child-second-div-margin-bottom;
      }
    }
  }
  > div:nth-child(2) {
    margin-top: $custom-data-component-template-second-child-margin-top;
  }
}
</style>