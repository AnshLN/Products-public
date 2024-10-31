<template>
    <div v-if="!loggedIn" class="container align-items-center flex justify-content-center" style="height: 70vh;">
    <Card style="width: 25rem; overflow: hidden">
        <template #title>Login</template>
        <template #subtitle>please login here</template>
        <template #content>
            <form @reset.prevent @submit.prevent="getData()">
                <div class="flex flex-column gap-2" style="width: 100%;">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="username" aria-describedby="username-help" />
                    
                </div>
                <div class="my-2 flex flex-column gap-2">
                    <label id="password">Password</label>
                    <InputText type="password" v-model="password" :inputStyle="{'width': '100%'}" />
                </div>
                <button type="submit" class="hidden">Submit</button>
            </form>
        </template>
        <template #footer>
            <div class="flex gap-3 mt-1">
                <!-- <Button label="Cancel" severity="secondary" :disabled="Loading" outlined @click="cancelLogin()" class="w-full" /> -->
                <Button label="Login" class="w-full" @click="getData()" :disabled="Loading" />
            </div>
        </template>
    </Card>
    </div>
    <div class="container align-items-center flex justify-content-center" style="height: 70vh;" v-else>
        <ProgressSpinner style="width: 60px; height: 60px" strokeWidth="3" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
    <Toast/>
</template>
<script>
import InputText from 'primevue/inputtext';
// import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import axios from 'axios';
import ProgressSpinner from 'primevue/progressspinner';
import CryptoJS from 'crypto-js';

export default {
    components:{
        InputText,Card,Button,Divider,Toast,ProgressSpinner
    },
    mounted() {
        this.getUserLocation();
    },
    methods:{
        getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.location.latitude = position.coords.latitude;
                    this.location.longitude = position.coords.longitude;
                    console.log('Location:', this.location);
                },
                (error) => {
                    this.handleLocationError(error);
                }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        },
        handleLocationError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                console.error('User denied the request for Geolocation.');
                this.$toast.add({ severity: 'error', summary: 'Location error!', detail: 'Please Allow location to continue login!', life: 6000 });
                break;
                case error.POSITION_UNAVAILABLE:
                console.error('Location information is unavailable.');
                this.location = {
                    latitude: 37.7749,   // Default latitude (e.g., San Francisco)
                    longitude: -122.4194 // Default longitude (e.g., San Francisco)
                };
                break;
                case error.TIMEOUT:
                console.error('The request to get user location timed out.');
                this.location = {
                    latitude: 37.7749,   // Default latitude (e.g., San Francisco)
                    longitude: -122.4194 // Default longitude (e.g., San Francisco)
                };
                break;
                default:
                console.error('An unknown error occurred.');
                this.location = {
                    latitude: 37.7749,   // Default latitude (e.g., San Francisco)
                    longitude: -122.4194 // Default longitude (e.g., San Francisco)
                };
                break;
            }
        },
        str2ab(str) {
            const buf = new Uint8Array(str.length);
            for (let i = 0, strLen = str.length; i < strLen; i++) {
                buf[i] = str.charCodeAt(i);
            }
        return buf;
    },
    async createAuthKey(username, password) {
        const combined = username + ':' + password;
        const hashHex = CryptoJS.SHA256(combined).toString(CryptoJS.enc.Hex);
        return hashHex;
    },
    async getData(){
       
        this.Loading = true;
        
        try {
                const authKey = await this.createAuthKey(this.username, this.password);
                // console.log(authKey);
                // return;
                const response = await axios.post(`${api_base_url}/login`, {
                    key: authKey,
                    username:this.username,
                    location: this.location,
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                if(response.status === 200){
                    this.loggedIn = true,
                    sessionStorage.setItem('key',JSON.stringify(response.data.data));
                    this.$toast.add({ severity: 'success', summary: 'Login Successfull', detail: 'Congratulations you have successfully Logged in!', life: 3000 });
                    setTimeout(() => {
                        this.$router.push('/');
                    },3000);
                }
            } catch (error) {
                if(error.response.status === 401){
                    this.$toast.add({ severity: 'error', summary: 'Unauthorized', detail: 'Email or Password is Invalid', life: 3000 });
                }
                else if(error.response.status === 402){
                    this.$toast.add({ severity: 'error', summary: 'Location error!', detail: 'Please allow location to continue login!', life: 6000 });
                }
                else{
                    this.$toast.add({ severity: 'error', summary: 'Server Internal Issues', detail: 'Please Contact The Developer for more informations', life: 3000 });
                }
                console.error('Error fetching data:', error);
            }
            this.Loading = false;
    },
    },
    data() {
        return {
            currentIP:window.location.hostname,
            username : '',
            password : '',
            Loading:false,
            loggedIn:false,
            location: {
                latitude: null,
                longitude: null
            },
        }
    }
}
</script>
<style scoped></style>