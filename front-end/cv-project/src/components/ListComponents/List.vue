<template>
  <div class="list-component-template">
    <div class="list-component">
      <div v-for="listItem in listData" :key="listItem">
        <list-element :listItem="listItem" @reloadData="getData()" />
      </div>
    </div>
    <button-component
      class="list-component-create-button"
      :buttonStyle="createStyleText"
      :buttonText="newCvText"
      @click="newCV()"
    />
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
      createStyleText: "createStyle",
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
$list-component-template-height: rem(1200px);
$list-component-template-width: rem(1600px);
$list-component-template-margin-top: rem(30px);
$list-component-template-padding-top: rem(45px);
.list-component-template {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  width: $list-component-template-width;
  height: $list-component-template-height;
  margin-top: $list-component-template-margin-top;
  background: $white;
  box-sizing: border-box;
  padding-top: $list-component-template-padding-top;
  $list-component-height: rem(1000px);
  $list-component-width: rem(1400px);
  .list-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: $list-component-height;
    width: $list-component-width;
    > div {
      overflow-y: auto;
      width: 1225px; //SCSS
    }
  }
  .list-component-create-button {
    align-self: flex-end;
    margin-right: 201px; //SCSS
    margin-top: 25px; //SCSS
  }
}
</style>