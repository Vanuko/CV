<template>
  <div class="dropdown">
    <div class="selected-item tiny-text-bold" @click="toggleDropdown">
      {{ selectedItem }}
    </div>
    <div v-if="isOpen" class="dropdown-list">
      <div
        class="dropdown-item tiny-text-bold"
        v-for="item in items"
        :key="item"
        @click="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Dropdown",
  emits: ["itemSelected"],
  props: {
    passedItems: {
      type: Array as () => Array<string>,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItem: "",
      items: [] as string[],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item: string) {
      this.selectedItem = item;
      this.isOpen = false;
      this.$emit("itemSelected", item);
    },
  },
  mounted() {
    this.items = this.passedItems;
  },
});
</script>

<style  lang="scss" scoped>
@import "../../assets/colors.scss";
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  .selected-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid;
    height: 33px; //SCSS
    width: 554px;
  }
  .dropdown-list {
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: $white;
    border: 1px solid $border-grey;
    border-top: none;
    width: 554px;
    .dropdown-item {
      border: 1px solid $white;
      cursor: pointer;
    }
    .dropdown-item:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
