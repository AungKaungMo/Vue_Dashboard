<!------------------------------------------------
    SHOWING USERS LIST COMPONENT 
------------------------------------------------->
<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { Edit } from '@/assets/icons'
import { getAllUsers } from '@/networks/user-management/user'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const users = ref([])
const loading = ref(false)
const lastPage = ref(0)
const currentIndex = ref(0)

/***************************************************
    FILTERING USERS FROM GLOBAL SEARCH
**************************************************/
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

/***************************************************
    GETTING ALL USERS DATA
**************************************************/
const getUsers = async (pageId, rows) => {
  const [error, data] = await getAllUsers(pageId, rows)
  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: error?.response?.data?.message || 'Something went wrong.',
      life: 3000
    })
  } else {
    lastPage.value = data?.total
    users.value = data?.data
  }
  loading.value = false
}

const onPageChange = (event) => {
  currentIndex.value = event.page * event.rows
  getUsers(event.page + 1, event.rows)
}

onMounted(async () => {
  loading.value = true
  await getUsers(1, 10)
})
</script>
<template>
  <h4 class="mb-6 text-xl font-semibold">Users Management</h4>

  <Container :loading="loading">
    <div class="card me-8 bg-primaryBgColor">
      <DataTable
        v-model:filters="filters"
        :value="users"
        dataKey="id"
        class="px-5 py-3"
        :globalFilterFields="['name', 'email']"
      >
        <template #header>
          <div class="flex justify-between">
            <div class="p-input-icon-left">
              <InputText placeholder="Keyword Search" v-model="filters['global'].value" />
            </div>
            <div>
              <router-link to="user/new">
                <Button>Add</Button>
              </router-link>
            </div>
          </div>
        </template>
        <Column field="no" header="No." sortable style="width: 25%">
          <template #body="slotProps">
            {{ slotProps.index + currentIndex + 1 }}
          </template>
        </Column>
        <Column field="name" header="Name" sortable style="width: 25%"></Column>
        <Column field="email" header="Email" sortable style="width: 25%"></Column>
        <Column field="roles" header="Role" sortable style="width: 25%">
          <template #body="slotProps">
            {{ slotProps.data.roles[0]?.name }}
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <router-link :to="`user/${slotProps.data.id}/edit`">
              <Edit />
            </router-link>
          </template>
        </Column>
        <template #empty>
          <div class="w-100 text-center my-8">No data found.</div>
        </template>
      </DataTable>

      <Paginator
        :totalRecords="lastPage"
        :rowsPerPageOptions="[10, 20, 30]"
        :rows="10"
        @page="onPageChange"
      ></Paginator>
    </div>
  </Container>
</template>
