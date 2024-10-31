<template>
    <div class="container align-items-center flex justify-content-center" style="height: 70vh;">
    <Card style="width: 25rem; overflow: hidden">
        <template #title>Any question?</template>
        <template #subtitle>please submit here</template>
        <template #content>
            <form @reset.prevent @submit.prevent="getData()">
                <div class="flex flex-column gap-2" style="width: 100%;">
                    <label for="username">Your question</label>
                    <Textarea placeholder="Is store available in usa?..." id="username" aria-describedby="username-help" />
                    
                </div>
                <div class="my-2 flex flex-column gap-2">
                    <label id="password">Your Email:</label>
                    <InputText placeholder="johndoe@yahoo.in..." type="email" :inputStyle="{'width': '100%'}" />
                </div>
            </form>
        </template>
        <template #footer>
            <div class="flex gap-3 mt-1">
                <!-- <Button label="Cancel" severity="secondary" :disabled="Loading" outlined @click="cancelLogin()" class="w-full" /> -->
                <Button @click="copyCode" label="Submit your question" class="w-full" />
            </div>
        </template>
    </Card>
    </div>
    <Toast/>
</template>
<script>
import Textarea from 'primevue/textarea';
// import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
export default {
    components:{
        Textarea,Card,Button,InputText,Toast
    },
    methods: {
        copyCode() {
            this.$toast.add({ severity: 'success', summary: 'Submitted!', detail: 'Your query has been submited Successfully!', life: 4000 });
        },
    },
    }
</script>