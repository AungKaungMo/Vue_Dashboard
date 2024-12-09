<!-----------------------------------
    SHOWIND ROLES LIST COMPONENT 
------------------------------------>
<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { Edit } from '@/assets/icons'
import { getAllRoles } from '@/networks/user-management/role'
import { useToast } from 'primevue/usetoast'
import { errorToast } from '@/utils/toast-alert'
const toast = useToast()
const roles = ref([])
const loading = ref(false)
const lastPage = ref(0)
const currentIndex = ref(0)

/***************************************************
    FILTERING ROLES FROM GLOBAL SEARCH
**************************************************/
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

/***************************************************
       GETTING ALL ROLES
**************************************************/
const getRoles = async (pageId, rows) => {
  const [error, data] = await getAllRoles(pageId, rows)
  if (error) {
    errorToast(toast, error)
    loading.value = false
  } else {
    lastPage.value = data?.total
    roles.value = data?.data
    loading.value = false
  }
}

const onPageChange = (event) => {
  currentIndex.value = event.page * event.rows
  getRoles(event.page + 1, event.rows)
}

onMounted(async () => {
  loading.value = true
  await getRoles(1, 10)
})
</script>
<template>
  <h4 class="mb-6 text-xl font-semibold">Roles Management</h4>

  <Container :loading="loading">
    <div class="card me-8 bg-primaryBgColor">
      <DataTable
        v-model:filters="filters"
        :value="roles"
        dataKey="id"
        class="px-5 py-3"
        :globalFilterFields="['name']"
      >
        <template #header>
          <div class="flex justify-between">
            <div class="p-input-icon-left">
              <InputText placeholder="Keyword Search" v-model="filters['global'].value" />
            </div>
            <div>
              <router-link to="role/new">
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
        <Column field="status" header="Status" sortable style="width: 25%">
          <template #body="slotProps">
            {{ slotProps.data.status == 1 ? 'Active' : 'Inactive' }}
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <router-link :to="`role/${slotProps.data.id}/edit`">
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
