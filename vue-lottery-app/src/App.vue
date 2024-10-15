<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { onMounted } from 'vue'
import WinnersBlock from './components/WinnersBlock.vue'
import FormBlock from './components/FormBlock.vue'
import TableBlock from './components/TableBlock.vue'
import { UserRepo } from './utils/UserRepo'

onMounted(() => {
  const users = UserRepo.SeedData()
  UserRepo.setData(users)
})
UserRepo.Init()
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex row">
      <WinnersBlock />
      <FormBlock />
      <TableBlock />
    </div>
  </div>
</template>
