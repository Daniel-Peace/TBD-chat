<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['form_submitted', 'form_error'])

const loading = ref(false)
const name = ref('')
const bio = ref('')

async function submitUserForm() {
  loading.value = true
  try {
    const post_response = await fetch('http://localhost:5173/api/form-handler/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ person_name: name.value, person_bio: bio.value }),
    })

    const result = await post_response.json()
    console.log('Success:', result)
    emit('form_submitted', result)
    name.value = ''
    bio.value = ''
  } catch (error) {
    console.log('Error:', error)
    emit('form_error', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form>
    <p>Use this form to send key/value pairs to the database:</p>
    <ul>
      <li>
        <label for="name">Name:</label>
        <input type="text" id="name" name="person_name" v-model="name" />
      </li>
      <li>
        <label for="biography">Bio:</label>
        <textarea id="bio" name="person_bio" v-model="bio"></textarea>
      </li>
      <li class="button">
        <button type="button" :disabled="loading" @click="submitUserForm">
          Send your information
        </button>
      </li>
    </ul>
  </form>
</template>

<style>
body {
  /* Center the form on the page */
  text-align: center;
}

form {
  display: inline-block;
  /* Form outline */
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

form li + li {
  margin-top: 1em;
}

label {
  /* Uniform size and alignment */
  display: inline-block;
  min-width: 90px;
  text-align: right;
  margin-right: 16px;
}

input,
textarea {
  font: 1em sans-serif;
  width: 200px;
  box-sizing: border-box;
  border: 1px solid #999;
}

input:focus,
textarea:focus {
  /* Additional highlight for focused elements */
  border-color: #000;
}

textarea {
  /* Align multiline text fields with their labels */
  vertical-align: top;
  height: 5em;
}

.button {
  padding-left: 90px;
}

button {
  margin-left: 0.5em;
  background-color: #04aa6d; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
}
</style>
