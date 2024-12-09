<!--------------------------------------------------------
   THIS COMPONENT IS FOR AUTHENTICATION LOGIN
--------------------------------------------------------->
<script setup>
// import Logo from '@/assets/images/doctorlogo.png'
import Logo from '@/assets/images/logo.png'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import router from '@/routes'
import { errorToast, successToast } from '@/utils/toast-alert'
import { validateField } from '@/utils/var-validation'

const { handleSubmit } = useForm()
const auth = useAuthStore()
const isLoading = ref(false)
const toast = useToast()

/***************************************************
      FOMRDATA VARIABLES 
**************************************************/
const { value: email, errorMessage: emailErrorMessage } = useField('email', (value) =>
  validateField(value, 'Email')
)
const { value: password, errorMessage: passwordErrorMessage } = useField('password', (value) =>
  validateField(value, 'Password')
)

/***************************************************
    HANDLING USER LOGIN 
**************************************************/
const handleLogin = handleSubmit(async (values) => {
  isLoading.value = true
  await auth
    .login(values)
    .then((res) => {
      if (res.status) {
        successToast(toast, 'Login successfully.')
        isLoading.value = false
        router.push({ name: 'dashboard' })
      } else {
        isLoading.value = false
        errorToast(toast, res.message)
      }
    })
    .catch((err) => {
      errorToast(toast, err?.response?.data?.data)
      isLoading.value = false
    })
})
</script>

<template>
  <div class="bgimage">
    <div class="w-full h-[100vh] flex"></div>
  </div>

  <div class="w-full absolute inset-0 m-auto flex items-center justify-center">
    <form @submit="handleLogin" class="2xl:w-3/12 xl:w-5/12 md:w-6/12 w-9/12 bg-white p-12 shadow-xl rounded-md">
      <div>
        <div class="flex gap-2 mb-3 item-center text-secondaryColor">
          <img :src="Logo" class="w-16 h-16" />
          <!-- <Car class="w-10 h-10" /> -->
          <p class="font-bold select-none text-2xl mt-1">VUE Dashboard</p>
        </div>
        <h2 class="mb-10 font-semibold text-xl">Login To Your Account</h2>
      </div>
      <div class="flex flex-col gap-1">
        <label for="email">Email</label>
        <InputText
          type="text"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          class="w-full"
          :class="{ 'p-invalid': emailErrorMessage }"
          aria-describedby="email-error"
        />
        <small class="p-error w-full" v-if="emailErrorMessage" id="email-error">
          {{ emailErrorMessage || '&nbsp;' }}
        </small>
      </div>
      <div class="flex flex-col gap-1 my-4">
        <label for="password">Password</label>
        <InputText
          type="password"
          v-model="password"
          id="password"
          placeholder="Enter your password"
          class="w-full"
          :class="{ 'p-invalid': passwordErrorMessage }"
          aria-describedby="password-error"
        />
        <small class="p-error w-full" v-if="emailErrorMessage" id="password-error">
          {{ passwordErrorMessage || '&nbsp;' }}
        </small>
      </div>
      <div class="">
        <Button
          type="submit"
          :loading="isLoading"
          label="Submit"
          class="w-100 bg-secondaryColor border-none hover:bg-hoverBgColor"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.bgimage {
  background-image: url('@/assets/images/bg.jpg');
  background-position: center;
  background-size: cover;
  filter: blur(3px);
}
</style>
