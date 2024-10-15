<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { UserData } from '@/types/UserData'
import Button from './ButtonComponent.vue'
import Modal from './ModalComponent.vue'
import { globalKeyManager } from '@/utils/key-manager'
import { onUnmounted } from 'vue'

const props = defineProps<{
  showConfirmation: boolean
  selectedUser: UserData | null
  modalType: 'delete'
}>()

const emit = defineEmits(['close', 'deleteUser', 'modalType'])

const handleEscape = (e: KeyboardEvent) => {
  if (props.showConfirmation) {
    emit('close')
  }
};

globalKeyManager.addHandler('Escape', handleEscape);
globalKeyManager.useKeyManager();

onUnmounted(() => {
  globalKeyManager.removeHandler('Escape', handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <Modal :modalType="$emit('modalType')" :show="props.showConfirmation">
      <template #header>
        <h5 class="modal-title">Delete user?</h5>
      </template>
      <template #body>
        <p class="text-muted">
          Are you sure you want to delete user {{ props.selectedUser?.name }},
          {{ props.selectedUser?.email }}?
        </p>
      </template>
      <template #footer>
        <Button type="button" class="btn mx-2 px-3 btn-secondary" @onClick="$emit('close')"
          >No</Button
        >
        <Button type="button" class="btn mx-2 px-3 btn-danger" @onClick="$emit('deleteUser')"
          >Yes</Button
        >
      </template>
    </Modal>
  </Teleport>
</template>
