<!-----------------------------------
    SHOWIND LOCATIONS LIST COMPONENT 
------------------------------------>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { Edit, Bin } from '@/assets/icons'
import { useToast } from 'primevue/usetoast'
import { errorToast, successToast } from '@/utils/toast-alert'
import {
  getAllLocation,
  deleteLocation,
  permanentDeleteLocation,
  unarchiveLocation
} from '@/networks/master-data/location'
const toast = useToast()
const locations = ref([])
const loading = ref(false)
const btnLoading = ref(false)
const lastPage = ref(0)
const currentIndex = ref(0)
const listType = ref('all')
const pagination = reactive({
  page: 1,
  row: 10
})

/***************************************************
    FILTERING LOCATIONS FROM GLOBAL SEARCH
**************************************************/
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

/***************************************************
       GETTING ALL LOCATIONS
**************************************************/
const getLocations = async (pageId, rows, isTrashed) => {
  let key = 'not_tree'
  const [error, data] = await getAllLocation(pageId, rows, key, isTrashed)
  if (error) {
    errorToast(toast, error)
    loading.value = false
  } else {
    lastPage.value = data?.total
    locations.value = data?.data
    loading.value = false
  }
}

const onPageChange = (event) => {
  currentIndex.value = event.page * event.rows
  pagination.page = event.page + 1
  pagination.row = event.rows
  getLocations(event.page + 1, event.rows, listType.value === 'trashed')
}

const deleteDataById = async (id) => {
  btnLoading.value = true
  const [error, data] = await deleteLocation(id)
  if (error) {
    errorToast(toast, error.response?.data?.message)
    btnLoading.value = false
  } else {
    if (data.status) {
      await getLocations(pagination.page, pagination.row, listType.value === 'trashed')
      successToast(toast, 'Successfully deleted Location.')
    }
    btnLoading.value = false
  }
}

const handleRadioSwitch = (value) => {
  currentIndex.value = 0
  pagination.page = 1
  pagination.row = 10
  listType.value = value // Make sure to set the listType to the new value
  getLocations(1, 10, listType.value === 'trashed')
}

const handlePermanentDelete = async (id) => {
  btnLoading.value = true
  const [error, data] = await permanentDeleteLocation(id)
  if (error) {
    errorToast(toast, error.response?.data?.message)
    btnLoading.value = false
  } else {
    if (data.status) {
      await getLocations(pagination.page, pagination.row, listType.value === 'trashed')
      successToast(toast, 'Successfully deleted Location.')
    }
    btnLoading.value = false
  }
}

const handleRestore = async (id) => {
  btnLoading.value = true
  const [error, data] = await unarchiveLocation(id)
  if (error) {
    errorToast(toast, error.response?.data?.message)
    btnLoading.value = false
  } else {
    if (data.status) {
      await getLocations(pagination.page, pagination.row, listType.value === 'trashed')
      successToast(toast, 'Successfully restore Location.')
    }
    btnLoading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  await getLocations(1, 10)
})
</script>
<template>
  <h4 class="mb-6 text-xl font-semibold">LOCATIONS</h4>

  <Container :loading="loading">
    <div class="card me-8 bg-primaryBgColor">
      <DataTable
        v-model:filters="filters"
        :value="locations"
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
              <router-link to="locations/new">
                <Button>Add</Button>
              </router-link>
            </div>
          </div>

          <div class="card flex my-7 justify-content-center">
            <div class="flex flex-wrap gap-3">
              <div class="flex align-items-center">
                <RadioButton
                  @click="handleRadioSwitch('all')"
                  v-model="listType"
                  inputId="all"
                  name="all"
                  value="all"
                />
                <label for="ingredient1" class="ml-2">All</label>
              </div>

              <div class="flex align-items-center">
                <RadioButton
                  @click="handleRadioSwitch('trashed')"
                  v-model="listType"
                  inputId="trashed"
                  name="trashed"
                  value="trashed"
                />
                <label for="ingredient1" class="ml-2">Trashed</label>
              </div>
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
            <div class="flex gap-3 items-center" v-if="listType === 'all'">
              <router-link :to="`locations/${slotProps.data.id}/edit`">
                <Edit />
              </router-link>
              <Bin
                :class="btnLoading ? 'pointer-events-none' : ''"
                class="text-xl text-gray-500 hover:text-blue-500 cursor-pointer"
                @click="deleteDataById(slotProps.data.id)"
              />
            </div>

            <div class="flex gap-5 items-center" v-else-if="listType === 'trashed'">
              <div
                @click="handlePermanentDelete(slotProps.data.id)"
                :class="btnLoading ? 'pointer-events-none' : ''"
                class="text-xs hover:text-red-700 hover:font-bold transition-all duration-100 cursor-pointer text-red-500"
              >
                Permanent Delete
              </div>
              <div
                @click="handleRestore(slotProps.data.id)"
                :class="btnLoading ? 'pointer-events-none' : ''"
                class="text-xs hover:text-green-700 hover:font-semibold transition-all duration-100 cursor-pointer text-green-500"
              >
                Restore
              </div>
            </div>
          </template>
        </Column>
        <template #empty>
          <div class="w-100 text-center my-8">No data found.</div>
        </template>
      </DataTable>

      <Paginator
        :totalRecords="lastPage"
        :rowsPerPageOptions="[10, 20, 30]"
        :first="currentIndex"
        :rows="pagination.row"
        @page="onPageChange"
      ></Paginator>
    </div>
  </Container>
</template>
