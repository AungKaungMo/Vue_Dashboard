<!--------------------------------
     CREATE PERMISSION COMPONENT
--------------------------------->
<script setup>
import { createPermission } from '@/networks/user-management/permission'
import router from '@/routes'
import { errorToast, successToast } from '@/utils/toast-alert'
import { validateField } from '@/utils/var-validation'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const toast = useToast()
const isLoading = ref(false)
const { handleSubmit } = useForm()

/***************************************************
      FORMDATA VARIABLES
**************************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'Permission Name')
)

/***************************************************
       HANDLING FOR CREATE NEW PERMISSION
**************************************************/
const addNewPermission = handleSubmit(async (values) => {
  isLoading.value = true
  const [error, data] = await createPermission(values.name)
  if (error) {
    errorToast(toast, error)
    isLoading.value = false
  } else {
    if (data.success) {
      successToast(toast, 'Permission create successfully.')
    }
    isLoading.value = false
  }
})
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">Permission Create</h4>
  <form @submit="addNewPermission">
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
</template>
