<template>
  <div class="dropdown">
    <div class="selected-item tiny-text-bold" @click="toggleDropdown">
      {{ selectedItem }}
      <img
        :class="['expand-icon', { rotated: isOpen }]"
        src="../../assets/images/close_icon_grey.svg"
      />
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
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItem: this.value,
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
$dropdown-width: rem(250px);
.dropdown {
  z-index: 2;
  position: relative;
  display: inline-block;
  width: $dropdown-width;
  $selected-item-border-width: rem(1px);
  $selected-item-height: rem(33px);
  $selected-item-width: rem(250px);
  .selected-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: $selected-item-border-width solid;
    height: $selected-item-height;
    width: $selected-item-width;
  }
  .expand-icon {
    margin-left: auto;
  }
  .rotated {
    transform: rotate(180deg);
  }
  $dropdown-list-border-width: rem(1px);
  $dropdown-list-width: rem(250px);
  .dropdown-list {
    position: absolute;
    top: 100%;
    background-color: $white;
    border: $dropdown-list-border-width solid $border-grey;
    border-top: none;
    width: $dropdown-list-width;
    $dropdown-item-border-width: rem(1px);
    .dropdown-item {
      border: $dropdown-item-border-width solid $white;
      cursor: pointer;
    }
    .dropdown-item:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
