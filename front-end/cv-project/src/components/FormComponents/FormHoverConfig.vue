<template>
  <div v-if="hideInspectButtons" class="form-hover-config-template">
    <div class="config-button-block">
      <button-component :buttonText="editText" @click="emitEdit" />
      <button-component :buttonText="deleteText" @click="emitDelete" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import buttonComponent from "../GenericComponents/Button.vue";
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
      editText: "Rediģēt", //Const
      deleteText: "Dzēst", //Const
      showConfig: false,
    };
  },
  methods: {
    emitDelete() {
      this.$emit("deleteEmit");
    },
    emitEdit() {
      this.$emit("editEmit");
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
  }
}
</style>