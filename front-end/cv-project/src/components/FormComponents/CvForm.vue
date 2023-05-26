<template>
  <div class="form-component-template">
    <div class="form-template-left-side">
      <div class="form-wrapper">
        <component :is="requiredComponent"> </component>
      </div>
      <div class="form-buttons">
        <button-component
          :buttonText="backText"
          v-if="this.viewIndex != 0"
          @click="toggle(false)"
        />
        <button-component
          :buttonText="buttonText"
          v-if="this.viewIndex != 3"
          @click="toggle(true)"
        />
      </div>
    </div>
    <div class="form-template-right-side"><inspect-view /></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import baseData from "./BaseData.vue";
import educationData from "../FormComponents/EducationData.vue";
import workData from "../FormComponents/WorkData.vue";
import addressData from "../FormComponents/Address.vue";
import buttonComponent from "../GenericComponents/Button.vue";
import inspectView from "../../views/Inspect.vue";
import * as viewControl from "../../constants/ViewConstants";

export default defineComponent({
  name: "FormComponent",
  components: {
    baseData,
    educationData,
    workData,
    addressData,
    buttonComponent,
    inspectView,
  },
  data() {
    return {
      viewIndex: 0,
      backText: "ATPAKAĻ",
      buttonText: "NEXT",
      requiredComponent: {},
      componentArray: [baseData, workData, educationData, addressData],
    };
  },
  methods: {
    toggle(add: boolean) {
      add ? (this.viewIndex += 1) : (this.viewIndex -= 1);
      this.requiredComponent = this.componentArray[this.viewIndex];
    },
  },
  beforeMount() {
    this.requiredComponent = shallowRef(baseData);
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
.form-component-template {
  display: flex;
  justify-content: center;
  .form-template-left-side {
    margin-right: 25px;
    $form-wrapper-height: rem(800px);
    $form-wrapper-width: rem(600px);
    $form-wrapper-margin-top: rem(30px);
    .form-wrapper {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-self: center;
      align-items: center;
      width: $form-wrapper-width;
      height: $form-wrapper-height;
      margin-top: $form-wrapper-margin-top;
      background: $white;
    }
    .form-buttons {
      display: flex;
    }
  }
}
</style>