<!-----------------------------------
      CREATE ROLE COMPONENT 
--------------------------------------->
<script setup>
// import { getAllPermissions } from '@/networks/user-management/permission'
import ValidationFormInput from '@/components/ValidationFormInput.vue'
import { createRole } from '@/networks/user-management/role'
import router from '@/routes'
import { errorToast, successToast } from '@/utils/toast-alert'
import { validateField } from '@/utils/var-validation'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const toast = useToast()
const isLoading = ref(false)
const loading = ref(false)
const { handleSubmit, resetForm } = useForm()
// const permissions = ref([])
// const rolePermissions = ref([])

/***************************************************
      FORMDATA VARIABLES
**************************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'Role Name')
)

/***************************************************
       HANDLING FOR CREATE NEW ROLE
**************************************************/
const addNewRole = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    name: values.name
    // permissions: rolePermissions.value
  }
  const [error, data] = await createRole(payload)
  if (error) {
    errorToast(toast)
    isLoading.value = false
  } else {
    if (data.status) {
      successToast(toast, 'Role create successfully.')
      resetForm()
      router.push({ name: 'user-management-role' })
      // rolePermissions.value = []
    }
    isLoading.value = false
  }
})

/***************************************************
       GETTING ALL PERMISSIONS
**************************************************/
// const getPermissions = async () => {
//   const [error, data] = await getAllPermissions()
//   if (error) {
//     errorToast(toast, error)
//     loading.value = false
//   } else {
//     permissions.value = data
//     loading.value = false
//   }
// }

// onMounted(async () => {
// loading.value = true
// await getPermissions()
// })
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">Role Create</h4>
  <Container :loading="loading">
    <form @submit="addNewRole">
      <div class="card w-5/12 bg-primaryBgColor p-7 me-8">
        <div>
          <ValidationFormInput
            label="Role Name"
            placeholder="Type your role name"
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
