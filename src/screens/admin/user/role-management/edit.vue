<!--------------------------------
     EDIT ROLE COMPONENT
--------------------------------->
<script setup>
// import { getAllPermissions } from '@/networks/user-management/permission'
import ValidationFormInput from '@/components/ValidationFormInput.vue'
import { updateRole, getDetailRole } from '@/networks/user-management/role'
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
// const permissions = ref([])
// const rolePermissions = ref([])
const route = useRoute()

/****************************************
      FORMDATA VARIABLES
****************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'Role Name')
)

/***************************************************
      HANDLING ROLE UPDATE 
**************************************************/
const handleUpdateRole = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    name: values.name
    // permissions: rolePermissions.value
  }
  const [error, data] = await updateRole(payload, route.params.id)
  if (error) {
    errorToast(toast, error?.response?.data?.message)
    isLoading.value = false
  } else {
    if (data.status) {
      successToast(toast, 'Role update successfully.')
      router.push({ name: 'user-management-role' })
    } else {
      errorToast(toast, data)
    }
    isLoading.value = false
  }
})

/***************************************************
      GETTING ALL PERMISSIONS DATA
**************************************************/
// const allPermissions = async () => {
//   const [error, data] = await getAllPermissions()
//   if (error) {
//     errorToast(toast, error)
//   } else {
//     permissions.value = data
//   }
// }

/***************************************************
      GETTING ROLE DETAIL BY ROLE ID TO SHOW
**************************************************/
const getDetail = async () => {
  const [error, data] = await getDetailRole(route.params.id)
  if (error) {
    errorToast(toast)
    loading.value = false
  } else {
    name.value = data?.name
    // rolePermissions.value = data?.permissions?.map((permission) => permission.id)
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  // await allPermissions()
  await getDetail()
})
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">Role Edit</h4>
  <Container :loading="loading">
    <form @submit="handleUpdateRole">
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
