<template>
    <div>
      <h1 class="text-center mb-2 underline">Login Attempts</h1>
      <div class="card">
        <template v-if="loading">
          <!-- Loading Skeleton -->
          <DataTable :value="[{},{},{},{},{}]" :rows="5" paginator tableStyle="min-width: 50rem">
            <Column field="username" header="Username" style="width: 25%">
              <template #body>
                <Skeleton width="100%" height="2rem" />
              </template>
            </Column>
            <Column field="location" header="Location" style="width: 25%">
              <template #body>
                <Skeleton width="100%" height="2rem" />
              </template>
            </Column>
            <Column field="time" header="Time" style="width: 25%">
              <template #body>
                <Skeleton width="100%" height="2rem" />
              </template>
            </Column>
            <Column field="success" header="Success" style="width: 25%">
              <template #body>
                <Skeleton width="100%" height="2rem" />
              </template>
            </Column>
          </DataTable>
        </template>
        <template v-else>
          <!-- DataTable with Data -->
          <DataTable :value="loginAttempts" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="username" header="Username" style="width: 25%"></Column>
            <Column field="location" header="Location" style="width: 25%">
              <template #body="{ data }">
                <td>
                  <span v-if="data.location.latitude === 37.7749 || data.location.latitude === 'unknown' || !data.location.latitude">
                    null
                  </span>
                  <a v-else :href="`https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`" target="_blank">
                    Open in Google Maps
                  </a>
                </td>
              </template>
            </Column>
            <Column field="time" header="Time" style="width: 25%">
              <template #body="{ data }">
                <td>{{ new Date(data.time).toLocaleString() }}</td>
              </template>
            </Column>
            <Column field="success" header="Success" style="width: 25%">
              <template #body="{ data }">
                <Badge :value="data.success ? 'Success' : 'Failure'" :severity="data.success ? 'success' : 'danger'" />
              </template>
            </Column>
          </DataTable>
        </template>
      </div>
    </div>
    <Toast/>
  </template>
  
  <script>
import axios from 'axios';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge';
import Skeleton from 'primevue/skeleton';

  export default {
    components:{
      Toast, DataTable, Column, Badge, Skeleton
    },
    data() {
      return {
        authKey:sessionStorage.getItem('key') ? JSON.parse(sessionStorage.getItem('key')).key : '1',
        loginAttempts: [],
        loading:true
      };
    },
    async created() {
      try{
        const response = await axios.post(`${api_base_url}/admin/login-attempts`,{
          key: this.authKey.toString(),
        }, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        this.loginAttempts = response.data;
        this.loading=false;
      }catch(err){
        console.error(err)
        if(err.response.status === 401){
          this.$toast.add({ severity: 'error', summary: 'Access Denied!', detail: 'You have no accessed to Admin section!', life: 3000 });
          setTimeout(() => {
            this.$router.push('/');
          },3000);
        }else{
          this.$toast.add({ severity: 'error', summary: 'Internal Server issues!', detail: 'Please try again later...', life: 3000 });
          setTimeout(() => {
            this.$router.push('/');
          },3000);  
        }
      }
    },
  };
  </script>
  