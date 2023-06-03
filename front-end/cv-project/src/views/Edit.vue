<template>
  <div class="main-edit-template">
    <div class="main-edit-title h4">{{ editTitleText }}</div>
    <cv-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as textConstants from "../constants/TextConstants";
import cvForm from "../components/FormComponents/CvForm.vue";
import store from "../store/mainStore";

export default defineComponent({
  name: "Edit",
  components: { cvForm },
  data() {
    return {
      editTitleText: textConstants.EDIT_VIEW,
    };
  },
  mounted() {
    store.dispatch("updateHideInspectButtons", true);
  },
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.main-edit-template {
  display: flex;
  flex-direction: column;

  $main-edit-title-left-margin-left: rem(35px);
  $main-edit-title-left-margin-top: rem(35px);
  .main-edit-title {
    width: fit-content;
    margin-left: $main-edit-title-left-margin-left;
    margin-top: $main-edit-title-left-margin-top;
  }
}
</style>