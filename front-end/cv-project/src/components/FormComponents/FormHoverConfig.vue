<template>
  <div v-if="hideInspectButtons" class="form-hover-config-template">
    <div class="config-button-block">
      <button-component
        v-if="!showConfirmation"
        :buttonStyle="editStyle"
        :buttonText="editText"
        @click="emitEdit"
      />
      <button-component
        v-if="!showConfirmation"
        :buttonStyle="deleteStyle"
        :buttonText="deleteText"
        @click="emitDelete"
      />
      <div v-if="showConfirmation" class="confirmation-dialog">
        <div class="tiny-text-bold">{{ dzēstTexts }}</div>
        <button-component
          :buttonStyle="deleteStyle"
          :buttonText="confirmText"
          @click="confirmDelete"
        />
        <button-component
          :buttonStyle="positiveStyle"
          :buttonText="cancelText"
          @click="cancelDelete"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import buttonComponent from "../GenericComponents/Button.vue";
import * as textConstants from "../../constants/TextConstants";
import * as valueConstants from "../../constants/ValueConstants";
import store from "../../store/mainStore";

export default defineComponent({
  name: "FormHoverConfig",
  components: { buttonComponent },
  emits: ["deleteEmit", "editEmit"],
  props: {
    titleText: {
      type: String,
    },
  },
  data() {
    return {
      editText: textConstants.EDIT,
      deleteText: textConstants.DELETE,
      confirmText: textConstants.YES,
      cancelText: textConstants.NO,
      showConfig: false,
      showConfirmation: false,
      dzēstTexts: textConstants.ASK_DELETE,
      deleteStyle: valueConstants.STYLE_DELETE,
      positiveStyle: valueConstants.STYLE_POSITIV,
      editStyle: valueConstants.STYLE_EDIT,
    };
  },
  methods: {
    emitDelete() {
      this.showConfirmation = true;
    },
    emitEdit() {
      this.$emit("editEmit");
    },
    confirmDelete() {
      this.$emit("deleteEmit");
    },
    cancelDelete() {
      this.showConfirmation = false;
    },
  },
  computed: {
    hideInspectButtons() {
      return store.getters.getHideInspectButtons;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.form-hover-config-template {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: $hover-config;
  .config-button-block {
    display: flex;
    > div:nth-child(1) {
      margin-right: 40px;
    }
    .confirmation-dialog {
      display: flex;
      width: fit-content;

      div:nth-child(1) {
        display: flex;
        align-items: center;
        background: $white;
        box-sizing: border-box;
        padding: 0px 10px 0px 10px;
        border-radius: 5px;
      }
      div:not(:last-child) {
        margin-right: 25px;
      }
    }
  }
}
</style>