<script setup lang="ts">
import { Validation } from '@/utils/Validation'

const props = defineProps<{
  id: string
  name: string
  type: 'text' | 'date' | 'email'
  placeholder: string
  inputSlot: string
  message?: string
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInputChange = (event: Event) => {
  Validation.validateInputOnChange(event)
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mb-3">
    <label :for="props.id" class="form-label fw-bold">{{ props.inputSlot }}</label>
    <input
      :type="props.type"
      class="form-control"
      :id="props.id"
      :name="props.name"
      :placeholder="props.placeholder"
      required
      :value="props.modelValue"
      @input="handleInputChange"
    />
    <div class="invalid-feedback">
      {{ props.message }}
    </div>
  </div>
</template>
