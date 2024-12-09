<!--------------------------------
     EDIT LOCATIONS COMPONENT
--------------------------------->
<script setup>
import ValidationFormInput from '@/components/ValidationFormInput.vue'
import { getDetailLocation, updateLocation, getAllLocation } from '@/networks/master-data/location'
import router from '@/routes'
import { errorToast, successToast } from '@/utils/toast-alert'
import { validateField } from '@/utils/var-validation'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const toast = useToast()
const isLoading = ref(false)
const loading = ref(false)
const { handleSubmit } = useForm()
const route = useRoute()
const parentLocations = ref([])

/****************************************
      FORMDATA VARIABLES
****************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'location')
)

const { value: parentLocation } = useField('parentLocation')

/***************************************************
      HANDLING LOCATIONS UPDATE 
**************************************************/
const handleUpdateLocation = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    name: values?.name,
    parent_id: values?.parentLocation?.id
  }

  const [error, data] = await updateLocation(payload, route.params.id)
  if (error) {
    errorToast(toast, error?.response?.data?.message)
    isLoading.value = false
  } else {
    if (data.status) {
      successToast(toast, 'Location update successfully.')
      router.push({ name: 'master-data-locations' })
    } else {
      errorToast(toast, data)
    }
    isLoading.value = false
  }
})

/***********************************************************
      GETTING ALL LOCATION FOR PARENT LOCATION SELECT BOX
**********************************************************/
const getLocations = async () => {
  const [error, data] = await getAllLocation()
  if (error) {
    errorToast(toast)
    loading.value = false
  } else {
    parentLocations.value = data?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        status: item.status,
        is_deleted: item.is_deleted
      }
    })
    loading.value = false
  }
}

/***************************************************
      GETTING LOCATION DETAIL BY LOCATION ID TO SHOW
**************************************************/
const getDetail = async () => {
  const [error, data] = await getDetailLocation(route.params.id)
  if (error) {
    errorToast(toast)
    loading.value = false
  } else {
    name.value = data?.name
    parentLocation.value = data?.parent
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  await getDetail()
  await getLocations()
})
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">Location Edit</h4>
  <Container :loading="loading">
    <form @submit="handleUpdateLocation">
      <div class="card xl:w-5/12 lg:w-9/12 bg-primaryBgColor p-7 me-8">
        <div class="mb-8">
          <ValidationFormDropDown
            :filter="true"
            label="Parent Location"
            id="parentLocation"
            :options="parentLocations"
            optionLabel="name"
            placeholder="Select parent location"
            v-model="parentLocation"
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
