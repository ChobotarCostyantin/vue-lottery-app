<script setup lang="ts">
import { UserData } from '@/types/UserData'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { UserRepo } from '@/utils/UserRepo'

const removeWinner = (winner: UserData) => {
  winner.isWinner = false
  UserRepo.updateUser(winner)
}
</script>

<template>
  <div class="d-flex flex-wrap">
    <span
      v-for="winner in UserRepo.getWinners()"
      :key="winner.id"
      class="badge bg-info d-flex me-1 align-items-center winner-tag"
    >
      {{ winner.name }}
      <button @click="removeWinner(winner)" class="close-button">
        <span aria-hidden="true">×</span>
      </button>
    </span>
  </div>
</template>

<style scoped>
.close-button {
  font-weight: 700;
  font-size: large;
  line-height: 0.5;
  color: white;
  padding: 0;
  background-color: transparent;
  border: 0;
}
.winner-tag {
  border-radius: 4px;
  padding: 2px 8px;
  margin: 2px;
  display: inline-flex;
  align-items: center;
}
</style>
