<template>
    <div class="card mt-5">
        <div class="flex mb-2 gap-2 justify-content-end">
            <Button @click="goTo('/',0)" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
            <Button @click="goTo('/best-sellers',0)" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
            <Button @click="goTo('/inquiry',2)" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
        </div>

        <!-- <TabMenu v-model:activeIndex="active" :model="items" /> -->
        <TabMenu v-model:activeIndex="active" :model="items">
            <template #item="{ item, props }">
                <router-link :to="item.href" draggable="false" v-bind="props.action" class="flex align-items-center gap-2">
                    <img v-if="item.image" :alt="item.name" :src="item.image" style="height: 20px" />
                    <i v-else :class="item.icon"></i>
                    <span class="font-bold">{{ item.label }}</span>
                </router-link>
            </template>
        </TabMenu>
    </div>
</template>

<script>
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';

export default {
    components:{
        Button,TabMenu,
    },
    mounted() {
        this.checkRoute();
    },
    data() {
        return {
            active: 0,
            items: [
                { label: 'Suggested', icon: 'pi pi-sparkles', href: "/" },
                { label: 'Best Sellers', icon: 'pi pi-sparkles',href:'/best-sellers' },
                { label: 'Inquiry', icon: 'pi pi-question', href:'/inquiry' },
                // { label: 'Secret Mod?', image: '/rekt.png', href:'/secret-mod' },
            ]
        }
    },
    methods: {
        checkRoute(){
            switch(this.$route.path){
                case ('/'):
                case (''):
                    this.active = 0;
                    break;
                case ('/tagcode'):
                case ('/tagcode/'):
                    this.active = 1;
                    break;
                case ('/how-to-use'):
                case ('/how-to-use/'):
                    this.active = 2;
                    break;
            }
        },
        goTo(route,index){
            this.$router.push(route);
            this.active = index;
        }
    },
}
</script>