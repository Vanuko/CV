<template>
  <div class="inspect-view-template">
    <div class="displayed-cv">
      <div class="base-data-block">
        <div>
          {{ testing.name }}
        </div>
        <div>
          {{ testing.surname }}
        </div>
        <div>
          {{ testing.phone_nr }}
        </div>
        <div>
          {{ testing.email }}
        </div>
      </div>
      <div class="work-data-block">
        {{ testing.work }}
      </div>
      <div class="education-data-block">
        {{ testing.education }}
      </div>
      <div class="address-data-block">
        {{ testing.address }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import store from "../store/mainStore";

export default defineComponent({
  name: "Inspect",
  components: {},
  computed: {
    testing() {
      return store.getters.getForm;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.inspect-view-template {
  display: flex;
  justify-content: center;
  $displayed-cv-height: rem(800px);
  $displayed-cv-width: rem(600px);
  $displayed-cv-margin-top: rem(30px);
  .displayed-cv {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: $displayed-cv-width;
    height: $displayed-cv-height;
    margin-top: $displayed-cv-margin-top;
    background: $white;
  }
}
</style>