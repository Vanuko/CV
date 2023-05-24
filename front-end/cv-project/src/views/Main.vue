<template>
  <div>
    <div class="main-view-title">{{ mainTitleText }}</div>
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
  methods: {
    switchView() {
      console.log("clicked");
      router.push("/inspect");
    },
  },
});
</script>
<style lang="scss">
.main-view-title {
  font-size: 35px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: fit-content;
  margin-left: 35px;
  margin-top: 35px;
}
</style>
