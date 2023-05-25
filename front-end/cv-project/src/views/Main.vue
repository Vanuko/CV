<template>
  <div class="main-view-template">
    <div class="main-view-title h4">{{ mainTitleText }}</div>
    <cv-list />
    <component :is="currentView"></component>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index";
import editView from "./Edit.vue";
import cvList from "../components/ListComponents/List.vue";
import * as textConstants from "../Constants/TextConstants";

export default defineComponent({
  name: "MainView",
  components: {
    editView,
    cvList,
  },
  data() {
    return {
      mainTitleText: textConstants.CV_TITLE,
    };
  },
  setup() {
    const currentView = computed(() => {
      if (useRoute().name === "List") {
        return;
      } else if (useRoute().name === "Edit") {
        return editView;
      } else {
        return null;
      }
    });
    return { currentView };
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.main-view-template {
  display: flex;
  flex-direction: column;

  $main-view-title-left-margin-left: rem(35px);
  $main-view-title-left-margin-top: rem(35px);
  .main-view-title {
    width: fit-content;
    margin-left: $main-view-title-left-margin-left;
    margin-top: $main-view-title-left-margin-top;
  }
}
</style>
