<script setup lang="ts">
defineProps<{
  class?: string
  type: 'submit' | 'button'
  disabled?: boolean
}>()
</script>

<template>
  <button @click="$emit('onClick')" :type="type" :class="class" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped></style>
