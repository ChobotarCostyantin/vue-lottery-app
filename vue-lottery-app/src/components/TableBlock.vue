<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { UserData } from '@/types/UserData'
import { UserRepo } from '@/utils/UserRepo'
import Button from './ButtonComponent.vue'
import DeleteUserModal from './DeleteUserModal.vue'
import EditFormModal from './EditFormModal.vue'
import SearchBar from './SearchBar.vue'
import { ref, watch } from 'vue'

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref<UserData | null>(null)
const filteredUsers = ref<UserData[]>(UserRepo.getUsers())
const searchQuery = ref('')

const openModal = (user: UserData, type: 'edit' | 'delete') => {
  selectedUser.value = user
  if (type === 'edit') {
    showEditModal.value = true
  } else {
    showDeleteModal.value = true
  }
}

watch(() => UserRepo.Users.value, (newUsers) => {
  if (searchQuery.value) {
    filteredUsers.value = UserRepo.filterUsersByName(searchQuery.value);
  } else {
    filteredUsers.value = newUsers;
  }
}, { deep: true });

const closeModal = (type: 'edit' | 'delete') => {
  if (type === 'edit') {
    showEditModal.value = false
  } else {
    showDeleteModal.value = false
  }
  selectedUser.value = null
}

const removeUser = () => {
  if (selectedUser.value && UserRepo.getUsers().some((w) => w.id === selectedUser.value?.id)) {
    UserRepo.removeUser(selectedUser.value)
  }
  closeModal('delete')
}

const handleInput = (search: string) => {
  searchQuery.value = search
  filteredUsers.value = UserRepo.filterUsersByName(search)
  console.log(search);
}
</script>

<template>
  <div class="p-3 border mb-4 card">
    <SearchBar @filter-by-name="handleInput" />
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="fw-bolder">#</th>
          <th scope="col" class="fw-bolder">
            Name
            <button type="button" class="btn btn-sm ms-0" @click="UserRepo.sortUsersByName()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-sort-alpha-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"
                />
                <path
                  d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"
                />
              </svg>
            </button>
          </th>
          <th scope="col" class="fw-bolder">
            Date of Birth
            <button type="button" class="btn btn-sm ms-0" @click="UserRepo.sortUsersByDob()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-sort-down"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"
                />
              </svg>
            </button>
          </th>
          <th scope="col" class="fw-bolder">Email</th>
          <th scope="col" class="fw-bolder">Phone number</th>
          <th scope="col" class="fw-bolder"></th>
          <th scope="col" class="fw-bolder"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          :class="{ 'table-info': UserRepo.getWinners().some((w) => w.id === user.id) }"
        >
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.dob.toLocaleDateString() }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <Button
              type="button"
              class="btn btn-success p-1 px-2"
              @onClick="openModal(user, 'edit')"
              :disabled="UserRepo.getWinners().some((w) => w.id === user.id)"
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              type="button"
              class="btn btn-danger p-1 px-2"
              @onClick="openModal(user, 'delete')"
              :disabled="UserRepo.getWinners().some((w) => w.id === user.id)"
            >
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </table>

    <EditFormModal
      :showEditForm="showEditModal"
      :selectedUser="selectedUser"
      :modalType="'edit'"
      @closeEdit="closeModal('edit')"
    />

    <DeleteUserModal
      :showConfirmation="showDeleteModal"
      :selectedUser="selectedUser"
      :modalType="'delete'"
      @deleteUser="removeUser"
      @close="closeModal('delete')"
    />
  </div>
</template>

<style scoped></style>
