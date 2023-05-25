<template>
  <div class="form-component-template">
    <div class="form-wrapper">
      <base-data />
      <work-data />
      <education-data />
      <address-data />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import baseData from "../FormComponents/FormBaseData.vue";
import educationData from "../FormComponents/EducationData.vue";
import workData from "../FormComponents/WorkData.vue";
import addressData from "../FormComponents/Address.vue";

export default defineComponent({
  name: "FormComponent",
  components: { baseData, educationData, workData, addressData },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
.form-component-template {
  display: flex;
  justify-content: center;
  $form-wrapper-height: rem(800px);
  $form-wrapper-width: rem(1200px);
  $form-wrapper-margin-top: rem(30px);
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: $form-wrapper-width;
    height: $form-wrapper-height;
    margin-top: $form-wrapper-margin-top;
    background: $white;
  }
}
</style>