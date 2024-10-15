<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { UserData } from '@/types/UserData'
import { Validation } from '@/utils/Validation'
import Button from './ButtonComponent.vue'
import Modal from './ModalComponent.vue'
import Input from './InputComponent.vue'
import { onUnmounted, ref, watch } from 'vue'
import { UserRepo } from '@/utils/UserRepo'
import { globalKeyManager } from '@/utils/key-manager'

const props = defineProps<{
  showEditForm: boolean
  selectedUser: UserData | null
}>()

const emit = defineEmits(['closeEdit', 'updateUser'])

const name = ref('')
const dob = ref('')
const phone = ref('')

watch(
  () => props.selectedUser,
  (newUser) => {
    if (newUser) {
      name.value = newUser.name
      dob.value = newUser.dob.toISOString().split('T')[0]
      phone.value = newUser.phone
    }
  },
  { immediate: true }
)

const updateUser = (event: Event) => {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  if (Validation.validateForm(form)) {
    props.selectedUser!.name = formData.get('name') as string
    props.selectedUser!.dob = new Date(formData.get('dob') as string)
    props.selectedUser!.phone = formData.get('phone') as string
    UserRepo.updateUser(props.selectedUser!)
    emit('closeEdit')
  }
}
const handleEscape = (e: KeyboardEvent) => {
  if (props.showEditForm) {
    emit('closeEdit')
  }
};

globalKeyManager.addHandler('Escape', handleEscape);
globalKeyManager.useKeyManager();

onUnmounted(() => {
  globalKeyManager.removeHandler('Escape', handleEscape);
});
</script>

<template>
  <Modal :show="props.showEditForm">
    <template #header>
      <h5 class="modal-title">Edit User</h5>
    </template>
    <template #body>
      <form class="d-flex flex-column" @submit="updateUser" novalidate>
        <Input
          id="nameValidation"
          name="name"
          type="text"
          placeholder="Enter user name"
          inputSlot="Name"
          :message="`Name must contain at least ${Validation.minimalNameLength} character(s)`"
          v-model="name"
        />
        <Input
          id="dobValidation"
          name="dob"
          type="date"
          placeholder="mm/dd/yyyy"
          inputSlot="Date of Birth"
          :message="`Date must be between ${Validation.MinimalDate.toLocaleDateString()} and ${Validation.MaximalDate.toLocaleDateString()}`"
          v-model="dob"
        />
        <Input
          id="phoneValidation"
          name="phone"
          type="text"
          placeholder="Enter phone number"
          inputSlot="Phone"
          :message="`Please provide a valid phone number (example: (063) 555-5555).`"
          v-model="phone"
        />
        <div class="d-flex justify-content-end mt-3">
          <Button type="button" class="btn btn-secondary me-2" @click="$emit('closeEdit')"
            >Cancel</Button
          >
          <Button type="submit" class="btn btn-primary">Update Data</Button>
        </div>
      </form>
    </template>
  </Modal>
</template>
