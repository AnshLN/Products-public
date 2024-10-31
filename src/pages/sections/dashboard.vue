<template>
    <div v-if="Loading" class="card">
        <DataView :value="products" layout="grid">
            <template #grid>
                <div class="grid grid-nogutter">
                    <div v-for="i in 16" :key="i" class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                        <div class="p-4 border-1 surface-border surface-card border-round">
                            <div class="flex flex-column align-items-center gap-3 py-5">
                                <Skeleton class="w-full border-round h-10rem" />
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <Skeleton class="w-9 border-round h-2rem mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>

    <div v-else class="card">
        <DataView :value="imageAndTagCode" layout="grid">
            

            <template #grid="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-3 p-2">
                        <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                            <div class="surface-50 flex justify-content-center border-round p-3">
                                <div class="relative mx-auto">
                                        <img class="rtt-90-deg border-round w-full" :src="item.src" style="max-width: 300px" />
                                </div>
                            </div>
                            <div class="pt-4">
                                <div class="flex flex-row justify-content-between align-items-start gap-2">
                                    <div>
                                        <span v-if="item.bb&&item.password" class="font-semibold text-900 text-sm">Product name : </span>
                                    </div>
                                    <div class="text-lg font-medium text-900 mt-1">
                                        <span class="text-xl font-semibold text-900">
                                            <span v-if="item.bb&&item.password" class="text-l ">{{ item.bb }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-column gap-4 mt-4">
                                    <div class="flex gap-2">
                                        <Button v-if="item.bb&&item.password" label="See product Details" @click="seeTagDetails(item.bb, item.password, item.src)" class="flex-auto white-space-nowrap"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
    <Toast/>
    <Dialog v-model:visible="visible" modal header="Product Information" :style="{ width: '25rem' }">
    <div class="flex">
        <img :src="tagDetailCode.img" style="max-width: 300px;" class="mx-auto" alt="tag_image">
    </div>
    <div class="flex align-items-center gap-3 mb-3 mt-3">
        <label for="username" class="font-semibold w-6rem">Product name : </label>
        {{ tagDetailCode.code }}
    </div>
    <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Price : </label>
        {{ tagDetailCode.password }} $
    </div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Close" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Buy" @click="copyCode()"></Button>
    </div>
</Dialog>
</template>

<script>
import Toast from 'primevue/toast';
import DataView from 'primevue/dataview';
import Skeleton from 'primevue/skeleton';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import axios from 'axios';

export default {
    components: {
        Toast, DataView, Skeleton, Tag, Button, Dialog,
    },
    data() {
        return {
            authKey:sessionStorage.getItem('key') ? JSON.parse(sessionStorage.getItem('key')).key : '1',
            tagDetailCode:{
                code:'',
                password:'',
                img:''
            },
            visible:false,
            imageAndTagCode:  [
  {
    "bb": "Laptop",
    "src": "/laptop.webp",
    "password": 1200
  },
  {
    "bb": "Smartphone",
    "src": "/mobile.jpg",
    "password": 799
  },
  {
    "bb": "Headphones",
    "src": "/headphones.jpg",
    "password": 199
  },
  {
    "bb": "Smartwatch",
    "src": "/smart watch.jpg",
    "password": 299
  },
  {
    "bb": "Camera",
    "src": "/camera.jpg",
    "password": 950
  }
],
            Loading: false,
            products: [{ "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 }]
        }
    },
    methods: {
        seeTagDetails(code, password, src){
            this.tagDetailCode.code=code;
            this.tagDetailCode.password=password;
            this.tagDetailCode.img = src;
            this.visible=true;
        },
        async copyCode() {
            this.$toast.add({ severity: 'success', summary: 'Purchased!', detail: 'Product Purchased Successfully!', life: 4000 });
        },
        async fetchData(authKey) {
            try {
                const response = await axios.post(`${api_base_url}/data`, {
                    key: authKey.toString(),
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.data;
                this.imageAndTagCode = data;
                this.Loading = false;
            } catch (error) {
                sessionStorage.removeItem('key');
                console.error('Error fetching data:', error);
                this.$toast.add({ severity: 'error', summary: 'Internal Server Issue', detail: 'Please try again later! or Contact The developer', life: 4000 });
                setTimeout(() => {
                    this.$router.push('/login');
                },3000);
            }
        }
    }
}
</script>

<style>
.mm{
    margin-left: auto;
    color: white;
}
.cc{
    width: 260px;
}
.info{
    color: red;
    font-style: italic
}
</style>
