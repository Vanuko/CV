<template>
  <div class="list-element" @click="viewCV()">
    <div class="list-info-block">
      <div class="tiny-text-bold list-info-block-element">
        {{ listItem.name }} {{ listItem.surname }}
      </div>

      <div class="tiny-text-bold list-info-block-element">
        {{ phoneNrText }} {{ listItem.phone_nr }}
      </div>
      <div class="tiny-text-bold list-info-block-element">
        {{ emailText }} {{ listItem.email }}
      </div>
    </div>
    <div class="list-element-button-block">
      <button-component
        v-if="!showConfirmation"
        :buttonStyle="editStyleText"
        :buttonText="editText"
        @click.stop="edit()"
      />
      <button-component
        @mouseleave="resetCheck"
        :buttonStyle="deleteStyleText"
        :buttonText="deleteText"
        @click.stop="deleteCV()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import buttonComponent from "../GenericComponents/Button.vue";
import * as textConstants from "../../constants/TextConstants";
import * as valueConstants from "../../constants/ValueConstants";
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
      phoneNrText: textConstants.PHONE_NR_SPACE,
      emailText: textConstants.EMAIL_SPACE,
      editStyleText: valueConstants.STYLE_EDIT,
      deleteStyleText: valueConstants.STYLE_DELETE,
      deleteConfirmText: textConstants.QUESTION_DELETE,
      showConfirmation: false,
    };
  },
  methods: {
    resetCheck() {
      this.showConfirmation = false;
      this.deleteText = textConstants.DELETE;
    },
    viewCV() {
      store.dispatch("updateCvObjectAction", this.listItem);
      router.push("/inspect");
    },
    deleteCV() {
      if (this.showConfirmation) {
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
      } else {
        this.deleteText = this.deleteConfirmText;
        this.showConfirmation = true;
      }
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
$list-element-width: rem(1200px);
$list-element-margin-top: rem(15px);
$list-element-border-radius: rem(3px);
$list-element-padding: rem(0px 15px 0px 15px);
.list-element {
  display: flex;
  align-items: center;
  height: $list-element-height;
  width: $list-element-width;
  margin-top: $list-element-margin-top;
  padding: $list-element-padding;
  box-sizing: border-box;
  background-color: $mail-white;
  border-radius: $list-element-border-radius;
  .list-info-block {
    display: flex;
    .list-info-block-element {
      display: flex;
      max-width: calc(40%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; //Return to this ellipsis!
    }

    $list-info-block-element-not-last-child-margin-right: rem(10px);
    .list-info-block-element:not(:last-child) {
      margin-right: $list-info-block-element-not-last-child-margin-right;
    }
  }
  $list-element-button-block-div-last-child-margin-left: rem(15px);
  .list-element-button-block {
    margin-left: auto;
    display: flex;

    > div:last-child {
      margin-left: $list-element-button-block-div-last-child-margin-left;
    }
  }
}
.list-element:hover {
  cursor: pointer;
  background-color: $default-grey-hover;
}
</style>