<template>
  <div :class="overwriteCss ? overwriteCss : 'mb-8'">
    <label :for="id" class="mb-1 text-gray-700">{{ label }}</label>
    <div class="w-full">
      <Dropdown
        :loading="dropDownLoading"
        :filter="filter"
        :modelValue="modelValue"
        :options="options"
        :optionLabel="optionLabel"
        :placeholder="placeholder"
        class="w-full !text-sm"
        :class="{ 'p-invalid': errorMessage }"
        @update:modelValue="updateModelValue"
        :aria-describedby="`${id}-error`"
        @change="handleDropdownChange"
      >
      </Dropdown>
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
  label: String,
  id: String,
  options: Array,
  optionLabel: String,
  placeholder: String,
  modelValue: [String, Number, Object, Boolean],
  errorMessage: String,
  filter: {
    type: Boolean,
    default: false
  },
  dropDownLoading: Boolean,
  overwriteCss: String
})

const { label, id, options, optionLabel, placeholder, modelValue, errorMessage } = toRefs(props)
const emit = defineEmits(['update:modelValue', 'change'])

const updateModelValue = (value) => {
  emit('update:modelValue', value)
}

const handleDropdownChange = (value) => {
  emit('change', value)
}
</script>
