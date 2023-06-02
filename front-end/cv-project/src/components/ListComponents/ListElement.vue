<template>
  <div class="list-element" @click="viewCV()">
    <div class="list-info-block">
      <div>
        {{ listItem.name }}
      </div>
      <div>
        {{ listItem.surname }}
      </div>
      <div>
        {{ listItem.phone_nr }}
      </div>
    </div>
    <button-component :buttonText="editText" @click.stop="edit()" />
    <button-component :buttonText="deleteText" @click.stop="deleteCV()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import buttonComponent from "../GenericComponents/Button.vue";
import * as textConstants from "../../constants/TextConstants";
import router from "../../router/index";
import { FormModel } from "../../models/form";
import store from "../../store/mainStore";
import axios from "axios";

export default defineComponent({
  name: "ListElementComponent",
  components: { buttonComponent },
  emits: ["reloadData"],
  props: {
    listItem: {
      type: Object as () => FormModel,
      required: true,
    },
  },

  data() {
    return {
      deleteText: textConstants.DELETE,
      editText: textConstants.EDIT,
    };
  },
  methods: {
    viewCV() {
      store.dispatch("updateCvObjectAction", this.listItem);
      router.push("/inspect");
    },
    deleteCV() {
      const requestData = {
        functionName: "deleteCV",
        data: this.listItem,
      };
      axios
        .delete("http://localhost/backend.php", { data: requestData })
        .then(() => {
          this.$emit("reloadData");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    edit() {
      store.dispatch("updateCvObjectAction", this.listItem);
      store.dispatch("updateInspectMode", true);
      router.push("/edit");
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$list-element-height: rem(45px);
$list-element-width: rem(1000px);
$list-element-margin-top: rem(15px);
$list-element-border-radius: rem(3px);
.list-element {
  display: flex;
  align-items: center;
  height: $list-element-height;
  width: $list-element-width;
  margin-top: $list-element-margin-top;
  background-color: $mail-white;
  border-radius: $list-element-border-radius;
  .list-info-block {
    display: flex;
  }
}
</style>