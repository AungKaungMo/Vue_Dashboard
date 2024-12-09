<!----------------------------------------------------------------
    THIS COMPONENT IS FOR CHANGE PASSWORD POP UP BOX
 ---------------------------------------------------------------->
<script setup>
import { changePassword } from '@/networks/user-management/user'
import { errorToast, successToast } from '@/utils/toast-alert'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import { ref, toRefs } from 'vue'

/***************************************************
           HANDLE SHOWING POP UP BOX
**************************************************/
const emit = defineEmits(['changeVisible'])
const props = defineProps({
  visible: Boolean
})

const { visible } = toRefs(props)
const isLoading = ref(false)
const { handleSubmit, resetForm } = useForm()
const toast = useToast()

/***************************************************
           CUSTOM VALIDATION FIELD FOR VARIABLES
**************************************************/
const validateField = (value, fieldName) => {
  if (!value) {
    return `${fieldName} is required.`
  }
  if (fieldName == 'Confirm Password' && value != new_password.value) {
    return "Password doesn't match."
  }

  return true
}

/***************************************************
           FORMDATA VARIABLES
**************************************************/
const { value: current_password, errorMessage: currentPasswordErrorMessage } = useField(
  'current_password',
  (value) => validateField(value, 'Current Password')
)
const { value: new_password, errorMessage: newPasswordErrorMessage } = useField(
  'new_password',
  (value) => validateField(value, 'New Password')
)
const { value: confirm_password, errorMessage: confirmPasswordErrorMessage } = useField(
  'confirm_password',
  (value) => validateField(value, 'Confirm Password', new_password)
)

/***************************************************
           HANDLING FOR USER CHANGING PASSWORD 
**************************************************/
const handleChangePassword = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    current_password: values.current_password,
    new_password: values.new_password
  }
  const [error, data] = await changePassword(payload)
  if (error) {
    errorToast(toast)
    isLoading.value = false
  } else {
    if (data.status) {
      successToast(toast, 'Change password successfully.')
      resetForm()
      isLoading.value = false
      emit('changeVisible')
    }
  }
})
</script>

<template>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="visible"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
    >
      <template #container>
        <div class="p-8 px-16 rounded-md">
          <h4 class="font-semibold text-lg mb-6 text-center">
            Change Password<i class="pi pi-key ms-3 text-secondaryColor"></i>
          </h4>
          <form @submit="handleChangePassword">
            <div class="flex mb-3 flex-col">
              <label for="current_password">Current Password</label>
              <Password
                v-model="current_password"
                :feedback="false"
                id="current_password"
                toggleMask
                :class="{ 'p-invalid': currentPasswordErrorMessage }"
                aria-describedby="current-password-error"
              />
              <small
                class="p-error w-full"
                v-if="currentPasswordErrorMessage"
                id="current-password-error"
              >
                {{ currentPasswordErrorMessage || '&nbsp;' }}
              </small>
            </div>
            <div class="flex mb-3 flex-col">
              <label for="new_password">New Password</label>
              <Password
                v-model="new_password"
                :feedback="false"
                id="new_password"
                toggleMask
                :class="{ 'p-invalid': newPasswordErrorMessage }"
                aria-describedby="new-password-error"
              />
              <small class="p-error w-full" v-if="newPasswordErrorMessage" id="new-password-error">
                {{ newPasswordErrorMessage || '&nbsp;' }}
              </small>
            </div>

            <div class="flex mb-3 flex-col">
              <label for="confirm_password">Confirm Password</label>
              <Password
                v-model="confirm_password"
                :feedback="false"
                id="confirm_password"
                toggleMask
                :class="{ 'p-invalid': confirmPasswordErrorMessage }"
                aria-describedby="confirm-password-error"
              />
              <small
                class="p-error w-full"
                v-if="confirmPasswordErrorMessage"
                id="confirm-password-error"
              >
                {{ confirmPasswordErrorMessage || '&nbsp;' }}
              </small>
            </div>

            <div class="flex justify-center gap-3 mt-6">
              <Button
                label="Cancel"
                @click="$emit('changeVisible')"
                class="bg-gray-500 border-none hover:bg-gray-600"
              ></Button>
              <Button
                label="Change"
                type="submit"
                :loading="isLoading"
                class="bg-secondaryColor border-none hover:bg-hoverBgColor"
              ></Button>
            </div>
          </form>
        </div>
      </template>
    </Dialog>
  </div>
</template>
