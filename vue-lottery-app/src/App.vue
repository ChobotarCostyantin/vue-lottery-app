<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Validation } from './utils/Validation'
import { UserData } from './types/UserData'

const users = ref<UserData[]>([])
const winners = ref<UserData[]>([])

const isNewWinnerDisabled = computed(() => {
  return winners.value.length >= 3 || users.value.length === 0
})

const addNewWinner = () => {
  if (users.value.length > 0 && winners.value.length < 3) {
    let newWinner: UserData | undefined
    do {
      const randomIndex = Math.floor(Math.random() * users.value.length)
      newWinner = users.value[randomIndex]
    } while (winners.value.some((w) => w.id === newWinner?.id))
    if (newWinner) {
      winners.value.push(newWinner)
    }
  }
}
const removeWinner = (winner: UserData) => {
  const index = winners.value.findIndex((w) => w.id === winner.id)
  if (index !== -1) {
    winners.value.splice(index, 1)
  }
}

const handleChangeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.classList.contains('is-invalid') || target.classList.contains('is-valid')) {
    target.classList.remove('is-invalid')
    target.classList.remove('is-valid')
    switch (target.name) {
      case 'name':
        target.classList.add(Validation.validateName(target.value) ? 'is-valid' : 'is-invalid')
        break
      case 'dob':
        target.classList.add(
          Validation.validateDob(new Date(target.value)) ? 'is-valid' : 'is-invalid'
        )
        break
      case 'email':
        target.classList.add(Validation.validateEmail(target.value) ? 'is-valid' : 'is-invalid')
        break
      case 'phone':
        target.classList.add(Validation.validatePhone(target.value) ? 'is-valid' : 'is-invalid')
        break
    }
  }
}

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
    users.value.push(newUser)
    form.reset()
  }
}

onMounted(() => {
  users.value = [
    new UserData('Amsterdam', new Date('1990-10-01'), 'email1@example.com', '(063) 555-5555'),
    new UserData('Washington', new Date('1985-05-02'), 'email2@example.com', '(063) 555-5555'),
    new UserData('Sydney', new Date('1987-08-15'), 'email3@example.com', '(063) 555-5555')
  ]
})
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex row">
      <!-- Top section with search bar and button -->
      <div class="mb-4 d-flex border rounded bg-white align-items-center">
        <div class="Winners-list d-flex col border ms-2 rounded">
          <div class="d-flex flex-wrap">
            <span
              v-for="winner in winners"
              :key="winner.id"
              class="badge bg-info d-flex align-items-center winner-tag"
            >
              {{ winner.name }}
              <button @click="removeWinner(winner)" class="close-button ms-1">
                <span aria-hidden="true">×</span>
              </button>
            </span>
          </div>
          <span class="ms-2 text-muted">Winners</span>
        </div>
        <button
          type="button"
          id="new-winner-button"
          class="btn-info-custom btn btn-info"
          @click="addNewWinner"
          :disabled="isNewWinnerDisabled"
        >
          New winner
        </button>
      </div>
      <!-- Registration form -->
      <div class="p-2 mb-4 border card pb-0">
        <div class="card-body">
          <h5 class="card-title fw-bold">REGISTER FORM</h5>
          <p class="card-text text-muted">Please fill in all the fields.</p>
          <form class="d-flex flex-column" @submit="handleSubmit" novalidate>
            <div class="mb-3">
              <label for="nameValidation" class="form-label fw-bold">Name</label>
              <input
                type="text"
                class="form-control"
                id="nameValidation"
                name="name"
                placeholder="Enter user name"
                required
                @input="handleChangeInput"
              />
              <div class="invalid-feedback">
                Name must contains at least {{ Validation.minimalNameLength }} character(s)
              </div>
            </div>
            <div class="mb-3">
              <label for="dobValidation" class="form-label fw-bold">Date of Birth</label>
              <input
                type="date"
                class="form-control"
                id="dobValidation"
                name="dob"
                placeholder="mm/dd/yyyy"
                required
                @input="handleChangeInput"
              />
              <div class="invalid-feedback">
                Date must be between {{ Validation.MinimalDate.toLocaleDateString() }} and
                {{ Validation.MaximalDate.toLocaleDateString() }}.
              </div>
            </div>
            <div class="mb-3">
              <label for="emailValidation" class="form-label fw-bold">Email</label>
              <input
                type="email"
                class="form-control"
                id="emailValidation"
                name="email"
                placeholder="Enter email"
                required
                @input="handleChangeInput"
              />
              <div class="invalid-feedback">Please provide a valid email (example@domain).</div>
            </div>
            <div class="mb-5">
              <label for="phoneValidation" class="form-label fw-bold">Phone number</label>
              <input
                type="text"
                class="form-control"
                id="phoneValidation"
                name="phone"
                placeholder="Enter Phone number"
                required
                @input="handleChangeInput"
              />
              <div class="invalid-feedback">Please provide a valid phone number.</div>
            </div>
            <button type="submit" class="btn btn-info-custom ms-auto btn-info">Save</button>
          </form>
        </div>
      </div>
      <!-- Table for registered users -->
      <div class="p-3 border mb-4 card">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="fw-bolder">#</th>
              <th scope="col" class="fw-bolder">Name</th>
              <th scope="col" class="fw-bolder">Date of Birth</th>
              <th scope="col" class="fw-bolder">Email</th>
              <th scope="col" class="fw-bolder">Phone number</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              :class="{ 'table-info': winners.some((w) => w.id === user.id) }"
            >
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.dob.toLocaleDateString() }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-info-custom {
  margin: 5px;
  color: white;
  overflow-wrap: initial;
}
.Winners-list {
  padding: 5px;
  margin: 10px;
  min-width: 84%;
  user-select: none;
}
.btn-info-custom:hover {
  background-color: #76cdff;
}
.winner-tag {
  border-radius: 4px;
  padding: 2px 8px;
  margin: 2px;
  display: inline-flex;
  align-items: center;
}
.close-button {
  font-weight: 700;
  font-size: large;
  line-height: 0.5;
  color: white;
  padding: 0;
  background-color: transparent;
  border: 0;
}
form button {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
