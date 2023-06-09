<template>
  <div class="form-component-template">
    <div class="form-template-left-side">
      <div class="form-template-view-name-block">
        <button-component
          :buttonStyle="returnStyle"
          :buttonText="returnText"
          @click="back()"
        />
        <div class="medium-text-bold">
          {{ updateView }}
        </div>
      </div>
      <div class="form-wrapper">
        <component :is="requiredComponent"> </component>
      </div>
      <div class="warning-message tiniest-text-red" v-if="showWarning">
        {{ warningText }}
      </div>
      <div class="form-buttons">
        <div class="information-update-button-block">
          <button-component
            v-if="!inpectMode"
            :buttonStyle="saveStyle"
            :buttonText="saveText"
            @click="saveCV()"
          />
          <button-component
            v-if="inpectMode"
            :buttonStyle="updateStyle"
            :buttonText="updateText"
            @click="updateCV()"
          />
        </div>
        <div class="navigation-button-block">
          <button-component
            :buttonText="backText"
            v-if="this.viewIndex != 0"
            @click="toggle(false)"
          />
          <button-component
            class="navigation-next-button"
            :buttonText="nextButtonText"
            v-if="this.viewIndex != 4"
            @click="toggle(true)"
          />
        </div>
      </div>
    </div>
    <div class="form-template-right-side"><inspect-view /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import baseData from "./BaseData.vue";
import educationData from "../FormComponents/EducationData.vue";
import workData from "../FormComponents/WorkData.vue";
import addressData from "../FormComponents/Address.vue";
import customData from "../FormComponents/customData.vue";
import buttonComponent from "../GenericComponents/Button.vue";
import inspectView from "../../views/Inspect.vue";
import axios from "axios";
import store from "../../store/mainStore";
import * as textConstants from "../../constants/TextConstants";
import * as valueConstants from "../../constants/ValueConstants";
import router from "../../router/index";

export default defineComponent({
  name: "FormComponent",
  components: {
    baseData,
    educationData,
    workData,
    addressData,
    buttonComponent,
    inspectView,
    customData,
  },
  data() {
    return {
      viewIndex: 0,
      returnText: "UZ SARAKSTU",
      backText: "ATPAKAĻ",
      nextButtonText: "TĀLĀK",
      saveText: "SAGLABĀT",
      updateText: "SAGLABĀT IZMAIŅAS",
      requiredComponent: {},
      componentArray: [
        baseData,
        workData,
        educationData,
        addressData,
        customData,
      ],
      saveStyle: valueConstants.STYLE_SAVE,
      updateStyle: valueConstants.STYLE_UPDATE,
      returnStyle: valueConstants.STYLE_RETURN,
      warningText: textConstants.WARNING_NAME_SUR,
      showWarning: false,
    };
  },
  methods: {
    back() {
      router.push("/");
    },
    toggle(add: boolean) {
      add ? (this.viewIndex += 1) : (this.viewIndex -= 1);
      store.dispatch("updateViewSwitchValue", this.viewIndex);
      this.toggleView(this.viewIndex);
    },
    toggleView(index: number) {
      if (index >= 0 && index < this.componentArray.length) {
        this.requiredComponent = this.componentArray[index];
        this.viewIndex = index;
      }
    },
    saveCV() {
      if (this.formData.name.length > 0 && this.formData.surname.length > 0) {
        const requestData = {
          functionName: "saveCV",
          data: store.getters.getForm,
        };
        axios
          .post("http://localhost/backend.php", requestData)
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.showWarning = true;
      }
    },
    updateCV() {
      if (this.formData.name.length > 0 && this.formData.surname.length > 0) {
        const requestData = {
          functionName: "updateCV",
          data: store.getters.getForm,
        };
        axios
          .post("http://localhost/backend.php", requestData)
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.showWarning = true;
      }
    },
  },
  computed: {
    updateView() {
      const viewSwtichValue = store.getters.getViewSwitchValue;
      this.toggleView(viewSwtichValue);
      const viewTitleArray = [
        textConstants.BASE_DATA_TEXT,
        textConstants.WORK_DATA_TEXT,
        textConstants.EDU_DATA_TEXT,
        textConstants.ADDRESS_DATA_TEXT,
        textConstants.CUSTOM_DATA_TEXT,
      ];
      return viewTitleArray[viewSwtichValue];
    },
    inpectMode() {
      return store.getters.getInspectMode;
    },
    formData() {
      return store.getters.getForm;
    },
  },
  beforeMount() {
    this.requiredComponent = shallowRef(baseData);
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$form-component-template-margin-top: rem(50px);
.form-component-template {
  display: flex;
  justify-content: center;
  margin-top: $form-component-template-margin-top;

  $form-template-left-side-margin-right: rem(25px);
  $form-template-left-side-margin-top: rem(-12px);

  .form-template-left-side {
    margin-right: $form-template-left-side-margin-right;
    margin-top: $form-template-left-side-margin-top;
    $form-wrapper-height: rem(710px);
    $form-wrapper-width: rem(600px);
    $form-template-view-name-block-margin-bottom: rem(8px);
    .form-template-view-name-block {
      display: flex;
      justify-content: space-between;
      margin-bottom: $form-template-view-name-block-margin-bottom;
    }
    $form-wrapper-padding: rem(25px);
    .form-wrapper {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-self: center;
      align-items: center;
      width: $form-wrapper-width;
      height: $form-wrapper-height;
      background: $white;
      box-sizing: border-box;
      padding: $form-wrapper-padding;
    }
    .warning-message {
      position: absolute;
    }
    $form-buttons-margin-top: rem(25px);
    .form-buttons {
      margin-top: $form-buttons-margin-top;
      display: flex;
      .information-update-button-block {
        display: flex;
      }
      .navigation-button-block {
        display: flex;
        margin-left: auto;
        $navigation-next-button-margin-left: rem(15px);
        .navigation-next-button {
          margin-left: $navigation-next-button-margin-left;
        }
      }
    }
  }
  $form-template-right-side-width: rem(600px);
  .form-template-right-side{
    width: $form-template-right-side-width;
  }
}
</style>