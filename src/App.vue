<template>
  <router-view></router-view>
</template>
<script>
</script>
<style>
::selection{
  color: #10b981;
  background-color: rgb(249, 250, 245);
}
.p-stepper .p-stepper-header .p-stepper-action,.p-stepper.p-stepper-vertical .p-stepper-toggleable-content{
  background-color: #f8fafc !important;
}
.p-tabmenu .p-tabmenu-nav{
  text-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
@media (max-width: 720px) {
  .p-tabmenu .p-tabmenu-nav{
    flex-direction: column;
  }
}
@media (max-width: 400px) {
  .p-toast{
    max-width: 300px;
  }
}
  @media (max-width: 300px) {
  .p-toast{
    max-width: 200px;
  }
}
.p-toolbar-group-end{
  margin-left: auto;
}
.p-toolbar-group-start > div{
  flex-wrap: wrap;
}
body{
  background-color: #18181bde !important;
}
.p-stepper .p-stepper-header .p-stepper-action, .p-stepper.p-stepper-vertical .p-stepper-toggleable-content {
    background-color: unset !important;
}


</style>