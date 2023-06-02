<template>
  <div class="list-component-template">
    <div v-for="listItem in listData" :key="listItem">
      <list-element :listItem="listItem" @reloadData="getData()" />
    </div>
    <button-component :buttonText="newCvText" @click="newCV()" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import listElement from "../ListComponents/ListElement.vue";
import buttonComponent from "../GenericComponents/Button.vue";
import store from "../../store/mainStore";
import router from "../../router/index";

export default defineComponent({
  name: "ListComponent",
  components: { listElement, buttonComponent },
  data() {
    return {
      listData: [],
      newCvText: "Izveidot CV", //const,
    };
  },
  methods: {
    newCV() {
      router.push("/edit");
    },
    getData() {
      const requestData = {
        functionName: "getCV",
      };
      axios
        .get("http://localhost/backend.php", {
          params: requestData,
        })
        .then((response) => {
          this.listData = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    store.dispatch("updateInspectMode", false);
    store.dispatch("resetCvObjectAction");
    this.getData();
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$list-component-template-height: rem(800px);
$list-component-template-width: rem(1200px);
$list-component-template-margin-top: rem(30px);
.list-component-template {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  width: $list-component-template-width;
  height: $list-component-template-height;
  margin-top: $list-component-template-margin-top;
  background: $white;
}
</style>