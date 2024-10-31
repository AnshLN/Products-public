<template>
    <header>
    <div class="card">
        <Toolbar style="padding: 1rem 1rem 1rem 1.5rem">
            <template #start>
                <div class="flex align-items-center gap-2">
                    <Button outlined class="" >
                        <pre class="my-0">Electronics</pre> &nbsp;
                    </Button>
                    <Button outlined class="" >
                        <pre class="my-0">Mobiles</pre> &nbsp;
                    </Button>
                    <Button outlined class="" >
                        <pre class="my-0">Cameras</pre> &nbsp;
                    </Button>
                </div>
            </template>

            <template #end>
                <div class="flex align-items-center gap-2">
                    <!-- <Button v-if="!authKey" label="Login" severity="success" icon="pi pi-user" iconPos="right" @click="GoToLogin()" /> -->
                    <!-- <Button label="GitHub" severity="contrast" icon="pi pi-github" iconPos="right" @click="load('https://github.com/AnshLN/AnshLN.github.io')" /> -->
                    <!-- <Button label="Discord" class="follow_discord" icon="pi pi-discord" iconPos="right" @click="load('https://discord.gg/kyVUUpJfYA')" /> -->
                    <!-- <Button label="Youtube" severity="danger" icon="pi pi-youtube" iconPos="right" @click="load('https://www.youtube.com/channel/UC0_tRvwEM6FYwJlLlqavjtg')" /> -->
                    <!-- <Avatar v-if="!authKey" image="/logo.png" class="logo_contain" style="width: 52px; height: 52px" /> -->
                     <pre v-if="authKey">User:</pre>
                    <Chip class="ttt" icon="pi pi-user" label="John Doe" />
                </div>
            </template>
        </Toolbar>
    </div>
</header>
</template>
<script>
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';

export default {
    components:{
        Toolbar,Button,Avatar, Chip
    },
    data() {
        return{
            authKey : JSON.parse(sessionStorage.getItem('key')),
        }
    },
    methods:{
        load(href){
            window.open(href, "_blank");
        },
        GoToLogin(){
            this.$router.push('/login');
        },
        logOut(){
            sessionStorage.removeItem('key');
            this.$router.push('/login')
        }
    }
}
</script>
<style>
header{
    position: sticky;
    top:15px;
    margin-top: 30px;
    /* background-color: rgba(255, 255, 255, 0.7); */
    backdrop-filter: blur(8px);
    z-index: 1101;
}
.p-toolbar{
    background-color: transparent;
    border-radius: 6px !important;
}
.logo_contain > img{
    border-radius: 26px
}
.follow_discord{
    background-color: #5865F2;
    border: none !important;
}
.follow_discord:hover{
    background-color: rgb(78, 88, 197);
}
.ntl_logo{
    color: #64748b;
    font-weight: 700;
    outline-color: gold !important;
    border-color: gold !important;
}
.ntl_logo:hover{
    background-color: rgba(224, 217, 175, 0.301);
}
.ttt{
    cursor: pointer;
}
</style>