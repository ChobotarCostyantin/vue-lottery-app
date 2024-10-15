<script setup lang="ts">
import { Validation } from '@/utils/Validation'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import Input from './InputComponent.vue'
import Button from './ButtonComponent.vue'
import { UserRepo } from '@/utils/UserRepo'
import { UserData } from '@/types/UserData'

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const form = event.target as HTMLFormElement

  if (Validation.validateForm(form)) {
    const formData = new FormData(form)
    const newUser = new UserData(
      formData.get('name') as string,
      new Date(formData.get('dob') as string),
      formData.get('email') as string,
      formData.get('phone') as string
    )
    UserRepo.addUser(newUser)
    form.reset()
  }
}
</script>

<template>
  <div class="p-2 mb-4 border card pb-0">
    <div class="card-body">
      <h5 class="card-title fw-bold">REGISTER FORM</h5>
      <p class="card-text text-muted">Please fill in all the fields.</p>
      <form class="d-flex flex-column" @submit="handleSubmit" novalidate>
        <!-- Name Validation -->
        <Input
          id="nameValidation"
          name="name"
          type="text"
          placeholder="Enter user name"
          inputSlot="Name"
          :message="`Name must contains at least ${Validation.minimalNameLength} character(s)`"
        />
        <!-- Date of Birth Validation -->
        <Input
          id="dobValidation"
          name="dob"
          type="date"
          placeholder="mm/dd/yyyy"
          inputSlot="Date of Birth"
          :message="`Date must be between ${Validation.MinimalDate.toLocaleDateString()} and ${Validation.MaximalDate.toLocaleDateString()}`"
        />
        <!-- Email Validation -->
        <Input
          id="emailValidation"
          name="email"
          type="email"
          placeholder="Enter email"
          inputSlot="Email"
          :message="`Please provide a valid email (example@domain).`"
        />
        <!-- Phone number Validation -->
        <Input
          id="phoneValidation"
          name="phone"
          type="text"
          placeholder="Enter phone number"
          inputSlot="Phone"
          :message="`Please provide a valid phone number (example: (063) 555-5555).`"
        />
        <Button type="submit" class="btn btn-info btn-info-custom ms-auto form-button">Save</Button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-button {
  padding-left: 20px;
  padding-right: 20px;
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
