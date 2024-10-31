<template>
    <section class="mx-auto"><span class="loader-106"> </span></section>
    <h1
    class="text-center">
        Page Not Found
    </h1>
    <div class="container text-center">
        <Button @click="goToDashboard()" outlined class="border-2 mx-auto">
            <h3 class="my-0">
                <pre class="my-0">Back To Main</pre>
            </h3> &nbsp;
            <img src="/logo.png" style="border-radius: 100%;" width="30px" alt="NTL Logo">
        </Button>
    </div>
</template>
<script>
import Button from 'primevue/button';

export default {
    components : {
        Button
    },
    methods: {
        goToDashboard(){
            this.$router.push('/');
        }
    },
}
</script>
<style scoped>

section {
    min-width: 200px;
    width: 33.33%;
    height: 200px;
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    cursor: pointer;
    transition: 0.3s linear;
}
.loader-106 {
    width: 32px;
    height: 90px;
    margin-bottom: 20px;
    position: relative;
    border-radius: 50% 50% 0 0;
    border-bottom: 10px solid #FF3D00;
    background-color: #FFF;
    background-image: radial-gradient(ellipse at center, #FFF 34%, #FF3D00 35%, #FF3D00 54%, #FFF 55%), linear-gradient(#FF3D00 10px, transparent 0);
    background-size: 28px 28px;
    background-position: center 20px, center 2px;
    background-repeat: no-repeat;
    -webkit-animation: animloader106back 1s linear infinite alternate;
    animation: animloader106back 1s linear infinite alternate;
}
.loader-106::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 64px;
    height: 44px;
    border-radius: 50%;
    box-shadow: 0px 15px #FF3D00 inset;
    top: 67px;
}
.loader-106::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 34px;
    height: 34px;
    top: 112%;
    background: radial-gradient(ellipse at center, #ffdf00 8%, rgba(249, 62, 0, 0.6) 24%, rgba(0, 0, 0, 0) 100%);
    border-radius: 50% 50% 0;
    background-repeat: no-repeat;
    background-position: -44px -44px;
    background-size: 100px 100px;
    box-shadow: 4px 4px 12px 0px rgba(255, 61, 0, 0.5);
    -webkit-animation: animloader106 1s linear infinite alternate;
    animation: animloader106 1s linear infinite alternate;
}
@keyframes animloader106back {
    0%, 30%, 70% {
      transform: translateY(0px);
    }
    20%, 40%, 100% {
      transform: translateY(-5px);
    }
  }
</style>