<template>
    <Header/>
    <dashboard/>
    <router-view></router-view>
    <Footer/>
  </template>
  <script>
  import Header from "./pages/header.vue";
  import Footer from "./pages/footer.vue";
  import dashboard from './pages/dashboard.vue'
  export default {
      components:{
        Header,
        Footer,
        dashboard
      }
  }
  </script>
  <style>
  body{
    scroll-behavior: smooth;
    background-color: #f8fafc;
  }
  </style>