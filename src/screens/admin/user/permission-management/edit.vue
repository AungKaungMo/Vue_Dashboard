<!--------------------------------
     EDIT PERMISSION COMPONENT
--------------------------------->
<script setup>
import { updatePermission, getPermissionDetail } from '@/networks/user-management/permission'
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

/****************************************
      FORMDATA VARIABLES
****************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'Permission Name')
)

/***************************************************
      HANDLING PERMISSION UPDATE 
**************************************************/
const handleUpdatePermission = handleSubmit(async (values) => {
  isLoading.value = true
  const [error, data] = await updatePermission(values.name, route.params.id)
  if (error) {
    errorToast(toast, error)
    isLoading.value = false
  } else {
    if (data.success) {
      successToast(toast, 'Permission update successfully.')
    }
    isLoading.value = false
  }
})

/***************************************************
      GETTING PERMISSION DETAIL BY PERMISSION ID TO SHOW
**************************************************/
const permissionDetai = async () => {
  const [error, data] = await getPermissionDetail(route.params.id)
  if (error) {
    errorToast(toast, error)
  } else {
    name.value = data.name
  }
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  await permissionDetai()
})
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">Permission Edit</h4>
  <Container :loading="loading">
    <form @submit="handleUpdatePermission">
      <div class="card w-8/12 bg-primaryBgColor p-7 me-8">
        <div class="flex">
          <div class="w-6/12 mx-auto">
            <div class="flex flex-col">
              <label for="name" class="mb-1">Permission Name</label>
              <InputText
                id="name"
                v-model="name"
                :class="{ 'p-invalid': nameErrorMessage }"
                aria-describedby="name-error"
              />
              <small class="p-error w-full" v-if="nameErrorMessage" id="name-error">
                {{ nameErrorMessage || '&nbsp;' }}
              </small>
            </div>
          </div>
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
