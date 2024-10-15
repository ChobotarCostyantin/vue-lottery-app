<script setup lang="ts">
import { UserData } from '@/types/UserData'
import Winner from './WinnerComponent.vue'
import Button from './ButtonComponent.vue'
import { computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { UserRepo } from '@/utils/UserRepo'

const isNewWinnerDisabled = computed(() => {
  return UserRepo.getWinners().length >= 3 || UserRepo.getUsers().length === 0
})

const addNewWinner = () => {
  if (UserRepo.getUsers().length > 0 && UserRepo.getWinners().length < 3) {
    let newWinner: UserData | undefined
    const nonWinners = UserRepo.getUsers().filter((u) => !u.isWinner)
    const randomIndex = Math.floor(Math.random() * nonWinners.length)
    newWinner = nonWinners[randomIndex]
    newWinner.isWinner = true
    if (newWinner) {
      UserRepo.updateUser(newWinner)
    }
  }
}
</script>

<template>
  <div class="mb-4 d-flex border rounded bg-white align-items-center">
    <div class="Winners-list d-flex col border ms-2 rounded">
      <Winner />
      <span class="ms-2 text-muted">Winners</span>
    </div>
    <Button
      type="button"
      class="btn btn-info-custom btn-info"
      @onClick="addNewWinner"
      :disabled="isNewWinnerDisabled"
    >
      New winner
    </Button>
  </div>
</template>

<style scoped>
.Winners-list {
  padding: 5px;
  margin: 10px;
  min-width: 84%;
  user-select: none;
}
.btn-info-custom {
  margin: 5px;
  color: white;
  overflow-wrap: initial;
}
.btn-info-custom:hover {
  background-color: #76cdff;
}
.btn-info-custom:active {
  color: #76cdff;
  background-color: #fff;
}
</style>
