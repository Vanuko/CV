<template>
  <div class="home">
    <div>This is main view</div>
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

export default defineComponent({
  name: "MainView",
  components: {
    editView,
    cvList,
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
