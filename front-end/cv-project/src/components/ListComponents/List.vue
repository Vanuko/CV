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
import * as textConstants from "../../constants/TextConstants";
import * as valueConstants from "../../constants/ValueConstants";
import store from "../../store/mainStore";
import router from "../../router/index";

export default defineComponent({
  name: "ListComponent",
  components: { listElement, buttonComponent },
  data() {
    return {
      listData: [],
      newCvText: textConstants.NEW_CV,
      createStyleText: valueConstants.STYLE_CREATE,
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
    store.dispatch("updateNeedRefresh", false);
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
  $list-component-div-width: rem(1225px);
  .list-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: $list-component-height;
    width: $list-component-width;
    > div {
      overflow-y: auto;
      width: $list-component-div-width;
    }
  }
  $list-component-create-button-margin-right: rem(201px);
  $list-component-create-button-margin-top: rem(25px);
  .list-component-create-button {
    align-self: flex-end;
    margin-right: $list-component-create-button-margin-right;
    margin-top: $list-component-create-button-margin-top;
  }
}
</style>