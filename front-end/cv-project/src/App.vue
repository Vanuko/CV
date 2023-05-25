<template>
  <div class="application-template">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "sass-rem";
@import "../src/assets/typography.scss";
@import "../src/assets/colors.scss";
// .application-template{
//   color: $mail-gray;
// }
html,
body {
  height: 100%; /*both html and body*/
}
body {
  margin: 0; /*reset default margin*/
}
#app {
  height: 100%;
  background-color: $mail-gray;
}
</style>
