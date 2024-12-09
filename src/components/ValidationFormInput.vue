<template>
  <div class="mb-8">
    <label :for="id" class="mb-1 text-gray-700">{{ label }}</label>
    <div class="w-full">
      <InputText
        :placeholder="placeholder"
        :id="id"
        class="w-full text-sm"
        :type="type"
        :modelValue="modelValue"
        :disabled="disabled"
        :class="{ 'p-invalid': errorMessage }"
        @update:modelValue="updateModelValue"
        :aria-describedby="`${id}-error`"
      />
      <br />
      <small class="p-error w-full" v-if="errorMessage" :id="`${id}-error`">
        {{ label + ' is required.' || '&nbsp;' }}
      </small>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number, Object, Boolean],
  errorMessage: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

const { id, label, placeholder, type, modelValue, errorMessage } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value) => {
  emit('update:modelValue', value)
}
</script>
