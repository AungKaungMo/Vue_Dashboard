<!------------------------------------------------
    SHOWING PERMISSIONS LIST COMPONENT 
------------------------------------------------->
<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { Edit } from '@/assets/icons'
import { getAllPermissions } from '@/networks/user-management/permission'
import { useToast } from 'primevue/usetoast'
import { errorToast } from '@/utils/toast-alert'
const toast = useToast()
const permissions = ref([])
const loading = ref(false)

/***************************************************
      FILTERING PERMISSIONS FROM GLOBAL SEARCH
**************************************************/
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

/***************************************************
       GETTING ALL PERMISSIONS
**************************************************/
const getPermissions = async () => {
  const [error, data] = await getAllPermissions()
  if (error) {
    errorToast(toast, error)
    loading.value = false
  } else {
    permissions.value = data?.data
    loading.value = false
  }
}
onMounted(async () => {
  loading.value = true
  await getPermissions(1, 10)
})
</script>
<template>
  <h4 class="mb-6 text-xl font-semibold">Permissions Management</h4>

  <Container :loading="loading">
    <div class="card me-8 bg-primaryBgColor">
      <DataTable
        v-model:filters="filters"
        :value="permissions"
        dataKey="id"
        class="px-5 py-3"
        :globalFilterFields="['name']"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
      >
        <template #header>
          <div class="flex justify-between">
            <div class="p-input-icon-left">
              <InputText placeholder="Keyword Search" v-model="filters['global'].value" />
            </div>
            <div>
              <router-link to="permission/new">
                <Button>Add</Button>
              </router-link>
            </div>
          </div>
        </template>
        <Column field="no" header="No." sortable style="width: 25%">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column field="name" header="Name" sortable style="width: 25%"></Column>
        <Column field="delete_status" header="Status" sortable style="width: 25%">
          <template #body="slotProps">
            {{ slotProps.data?.delete_status == 1 ? 'Inactive' : 'Active' }}
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <router-link :to="`permission/${slotProps.data.id}/edit`">
              <Edit />
            </router-link>
          </template>
        </Column>
        <template #empty>
          <div class="w-100 text-center my-8">No data found.</div>
        </template>
      </DataTable>
    </div>
  </Container>
</template>
