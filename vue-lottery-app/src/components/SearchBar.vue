<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ref } from 'vue';

const searchQuery = ref('')
</script>

<template>
  <div class="mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Search by name"
      v-model="searchQuery"
      @input="$emit('filter-by-name', searchQuery)"
    />
  </div>
</template>
