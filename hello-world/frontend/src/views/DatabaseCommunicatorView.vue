<script setup lang="ts">
import DatabaseSetterForm from '../components/DatabaseSetterForm.vue'
import DatabaseGetterForm from '../components/DatabaseGetterForm.vue'
import { ref } from 'vue'

const currentFragment = ref('set')
const serverResponse = ref('')

function updateResponse(newResponse: string) {
  serverResponse.value = newResponse
}

interface UserRecord {
  name: string
  bio: string
}

function validateReceivedBio(user_bio: UserRecord) {
  if (user_bio.name && user_bio.bio) {
    serverResponse.value = `Name: ${user_bio.name}, Bio: ${user_bio.bio}`
  } else {
    serverResponse.value = 'Error: Server response does not have name and bio'
  }
}
</script>

<template>
  <h2>Database Communicator</h2>
  <!-- Even though the 'input' elements fire the event, it propogates up to fieldset where it is caught -->
  <fieldset @change="updateResponse('')">
    <div id="setterOption">
      <input type="radio" v-model="currentFragment" :value="'set'" />
      <label for="setterOption">Update Bio</label>
    </div>
    <div id="getterOption">
      <input type="radio" v-model="currentFragment" id="getterRadio" :value="'get'" />
      <label for="getterOption">View Bio</label>
    </div>
  </fieldset>
  <div id="fragment_holder">
    <DatabaseSetterForm
      v-if="currentFragment === 'set'"
      id="setter"
      @form_submitted="updateResponse"
      @form_error="updateResponse"
    ></DatabaseSetterForm>
    <DatabaseGetterForm
      v-else-if="currentFragment === 'get'"
      id="getter"
      @response_received="validateReceivedBio"
    ></DatabaseGetterForm>
  </div>
  <div v-if="serverResponse !== ''">
    {{ serverResponse }}
  </div>
</template>

<style>
input {
  margin: 0.4rem;
}
</style>
