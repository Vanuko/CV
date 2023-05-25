<template>
  <div class="base-data-component-template">
    <form-text />
    <input-field />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";

export default defineComponent({
  name: "BaseDataComponent",
  components: { FormText, inputField },
  props: {
    baseData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
</style>