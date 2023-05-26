<template>
  <div class="application-template">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "sass-rem";
@import "../src/assets/typography.scss";
@import "../src/assets/colors.scss";

html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  height: 100%;
  background-color: $mail-gray;
}
</style>
