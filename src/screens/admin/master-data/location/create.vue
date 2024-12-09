<!-----------------------------------
      CREATE LOCATIONS COMPONENT 
--------------------------------------->
<script setup>
import ValidationFormInput from '@/components/ValidationFormInput.vue'
import { createLocation } from '@/networks/master-data/location'
import router from '@/routes'
import { errorToast, successToast } from '@/utils/toast-alert'
import { validateField } from '@/utils/var-validation'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { getAllLocation } from '@/networks/master-data/location'

const toast = useToast()
const isLoading = ref(false)
const loading = ref(false)
const { handleSubmit, resetForm } = useForm()
const locations = ref([])

/***************************************************
      FORMDATA VARIABLES
**************************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'Location')
)

const { value: location } = useField('location')

/***************************************************
       HANDLING FOR CREATE LOCATIONS
**************************************************/
const addNewLocation = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    name: values.name,
    parent_id: values.location?.id
  }
  const [error, data] = await createLocation(payload)
  if (error) {
    errorToast(toast, error?.response?.data?.message)
    isLoading.value = false
  } else {
    if (data.status) {
      successToast(toast, 'Location create successfully.')
      resetForm()
      router.push({ name: 'master-data-locations' })
    }
    isLoading.value = false
  }
})

const getLocations = async () => {
  const [error, data] = await getAllLocation()

  if (error) {
    errorToast(toast)
    loading.value = false
  } else {
    locations.value = data
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  await getLocations()
})
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">Location Create</h4>
  <Container :loading="loading">
    <form @submit="addNewLocation">
      <div class="card xl:w-5/12 lg:w-9/12 bg-primaryBgColor p-7 me-8">
        <div class="mb-8">
          <ValidationFormDropDown
            :filter="true"
            label="Parent Location"
            id="location"
            :options="locations"
            optionLabel="name"
            placeholder="Select parent location"
            v-model="location"
          />
        </div>
        <div>
          <ValidationFormInput
            label="Location Name"
            placeholder="Type your location name"
            id="name"
            v-model="name"
            :errorMessage="nameErrorMessage"
          />
        </div>
        <div class="flex gap-5 justify-center mt-7">
          <Button
            label="Cancel"
            @click="router.go(-1)"
            class="w-100 bg-gray-500 border-none hover:bg-gray-600"
          />
          <Button
            type="submit"
            :loading="isLoading"
            label="Submit"
            class="w-100 bg-secondaryColor hover:bg-hoverBgColor"
          />
        </div>
      </div>
    </form>
  </Container>
</template>
