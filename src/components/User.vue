<template>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
            <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Enter name"
            ></b-form-input>
            </b-form-group>

        <b-form-group
            id="input-group-2"
            label="Email address:"
            label-for="input-2"
        ><b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
        ></b-form-input>
        </b-form-group>
    
        <b-form-group id="input-group-3" label="Your Address:" label-for="input-3">
            <b-form-input
            id="input-3"
            v-model="form.address"
            placeholder="Enter address"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Your Telehpone number:" label-for="input-4">
        <b-form-input
            id="input-3"
            v-model="form.telephone"
            placeholder="Enter telephone number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <div>
        <p>Nuvarande sida: {{ currentPage }}</p>
        <b-table
        :items="pageUsers"
        small
        ></b-table>
        
        <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        class="mb-3"
        ></b-pagination>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import UserService from '../services/UserService'

// Reactive varibles
const users = ref([])
const currentPage = ref(1)
const perPage = ref(10)
const totalRows = ref(0)
const show = true
const form = ref({
    name : '',
    address: '',
    email: '',
    telephone: ''
})

// Gets the users from backend
const fetchUsers = async () => {
  try {
    // Await the respons 
    const response = await UserService.getAllUsers()
    
    // Add the response data to the users array
    users.value = response.data

    // Update the total rows count
    totalRows.value = response.data.length
    
    } catch (error) {
    console.error('Fel vid hämtning av användare:', error)
  }
}

// Compute which users should be shown on the page
const pageUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return users.value.slice(start, start + perPage.value)
})

// Submits the form to the backend to be saved. 
const onSubmit = async () => {
    // Await the created user response
    const response = await UserService.createUser(form.value)

    // Add the new user to the user list. 
    users.value.push(response.data);

    // Update total rows count after adding the new user
    totalRows.value = users.value.length

    // Reset the form
    onReset()
}

const onReset = () => {
    form.value.name = ''
    form.value.address = ''
    form.value.email = ''
    form.value.telephone = ''
}

onMounted(fetchUsers)
</script>
