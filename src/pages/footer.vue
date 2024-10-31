<template>
    <footer class="mt-5">
        <h5 class="text-center">
            <img style="width: 25px; vertical-align: middle;" src="/ind.png" alt="India">
            {{ currentDate }}
        </h5>
        <h6 class="text-center">
            @Copyrights @Ap~(Exculding tags)
        </h6>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentDate: new Date().toLocaleString()
      }
    },
    mounted() {
      setInterval(() => {
        this.currentDate = new Date().toLocaleString()
      }, 1000)
    }
  }
  </script>
  
  <style scoped></style>