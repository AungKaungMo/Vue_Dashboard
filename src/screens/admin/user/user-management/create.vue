<!----------------------------------
       CREATE USER COMPONENT
----------------------------------->
<script setup>
import router from '@/routes'
import { onMounted, ref } from 'vue'
import { getAllRoles } from '@/networks/user-management/role'
import { errorToast, successToast } from '@/utils/toast-alert'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import { createUser } from '@/networks/user-management/user'
import { validateField } from '@/utils/var-validation'

const isLoading = ref(false)
const loading = ref(false)
const toast = useToast()
const roles = ref([])
const { handleSubmit, resetForm } = useForm()

/***************************************************
      FORMDATA VARIABLES
**************************************************/
const { value: name, errorMessage: nameErrorMessage } = useField('name', (value) =>
  validateField(value, 'Name')
)
const { value: email, errorMessage: emailErrorMessage } = useField('email', (value) =>
  validateField(value, 'Email')
)

const { value: phone, errorMessage: phoneErrorMessage } = useField('phone', (value) =>
  validateField(value, 'Phone')
)

const { value: roleVal, errorMessage: roleErrorMessage } = useField('roleVal', (value) =>
  validateField(value, 'Role')
)

const { value: password, errorMessage: passwordErrorMessage } = useField('password', (value) =>
  validateField(value, 'Password')
)

const { value: c_password, errorMessage: cPasswordErrorMessage } = useField('c_password', (value) =>
  validateField(value, 'Confirm Password', password.value)
)

/***************************************************
       HANDLING FOR CREATE NEW USER
**************************************************/
const addNewUser = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    name: values.name,
    email: values.email,
    password: values.password,
    'confirm-password': values.c_password,
    phone: values.phone,
    roles: [values.roleVal?.id]
  }
  const [error, data] = await createUser(payload)

  if (error) {
    errorToast(toast)
    isLoading.value = false
  } else {
    if (data.status) {
      successToast(toast, 'User create successfully.')
      resetForm()
      isLoading.value = false
      router.push({ name: 'user-management-user' })
    } else {
      errorToast(toast, data.message[0])
      isLoading.value = false
    }
  }
})

/***************************************************
       GETTING ALL ROLES
**************************************************/
const getRoles = async () => {
  const [error, data] = await getAllRoles()

  if (error) {
    errorToast(toast, error)
    loading.value = false
  } else {
    roles.value = data
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  await getRoles()
})
</script>
<template>
  <h4 class="text-xl font-semibold mb-4">User Create</h4>
  <Container :loading="loading">
    <form @submit="addNewUser">
      <div class="card w-8/12 bg-primaryBgColor p-7 me-8">
        <div class="flex">
          <div class="w-6/12">
            <div class="flex flex-col w-10/12">
              <label for="name" class="mb-1">Name</label>
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

            <div class="flex flex-col w-10/12 mt-5">
              <label for="email" class="mb-1">Email</label>
              <InputText
                id="email"
                v-model="email"
                :class="{ 'p-invalid': emailErrorMessage }"
                aria-describedby="email-error"
              />
              <small class="p-error w-full" v-if="emailErrorMessage" id="email-error">
                {{ emailErrorMessage || '&nbsp;' }}
              </small>
            </div>

            <div class="flex flex-col w-10/12 mt-5">
              <label for="phone" class="mb-1">Phone</label>
              <InputText
                id="phone"
                v-model="phone"
                :class="{ 'p-invalid': phoneErrorMessage }"
                aria-describedby="phone-error"
              />
              <small class="p-error w-full" v-if="phoneErrorMessage" id="phone-error">
                {{ phoneErrorMessage || '&nbsp;' }}
              </small>
            </div>
          </div>
          <div class="w-6/12">
            <div class="flex flex-col w-10/12">
              <label for="password" class="mb-1">Password</label>
              <InputText
                id="password"
                type="password"
                v-model="password"
                :class="{ 'p-invalid': passwordErrorMessage }"
                aria-describedby="password-error"
              />
              <small class="p-error w-full" v-if="passwordErrorMessage" id="password-error">
                {{ passwordErrorMessage || '&nbsp;' }}
              </small>
            </div>
            <div class="flex flex-col w-10/12 mt-5">
              <label for="c_password" class="mb-1">Conirm Password</label>
              <InputText
                id="c_password"
                type="password"
                v-model="c_password"
                :class="{ 'p-invalid': cPasswordErrorMessage }"
                aria-describedby="c-password-error"
              />
              <small class="p-error w-full" v-if="cPasswordErrorMessage" id="c-password-error">
                {{ cPasswordErrorMessage || '&nbsp;' }}
              </small>
            </div>

            <div class="mt-5">
              <label>Assign Roles</label>
              <div class="mt-3">
                <div
                  class="mb-2 flex text-center gap-2"
                  v-for="(role, index) in roles"
                  :key="index"
                >
                  <input
                    name="role"
                    type="radio"
                    :id="role.name"
                    class="cursor-pointer"
                    v-model="roleVal"
                    :value="role"
                    :class="{ 'p-invalid': roleErrorMessage }"
                    aria-describedby="role-error"
                  />
                  <label class="text-sm cursor-pointer select-none opacity-75" :for="role.name">{{
                    role.name
                  }}</label>
                </div>
                <small class="p-error w-full" v-if="roleErrorMessage" id="role-error">
                  {{ roleErrorMessage || '&nbsp;' }}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-5 justify-center mt-16">
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
