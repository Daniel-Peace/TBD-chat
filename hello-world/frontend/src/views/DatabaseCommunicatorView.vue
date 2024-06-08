<script setup lang="ts">
import DatabaseSetterForm from '../components/DatabaseSetterForm.vue'
import DatabaseGetterForm from '../components/DatabaseGetterForm.vue'
import { ref } from 'vue'

const currentFragment = ref('set')
const serverResponse = ref('No response yet, try using a form.')
</script>

<template>
  <h2>Database Communicator</h2>
  <fieldset>
    <div id="setterOption">
      <input type="radio" v-model="currentFragment" :value="'set'" />
      <label for="setterOption">Update Bio</label>
    </div>
    <div id="getterOption">
      <input type="radio" v-model="currentFragment" id="getterRadio" :value="'get'" />
      <label for="getterOption">View Bio</label>
    </div>
    <div id="responseOption">
      <input type="radio" v-model="currentFragment" :value="'response'" />
      <label for="responseOption">See Server Response</label>
    </div>
  </fieldset>
  <div id="fragment_holder">
    <DatabaseSetterForm v-if="currentFragment === 'set'" id="setter"></DatabaseSetterForm>
    <DatabaseGetterForm v-else-if="currentFragment === 'get'" id="getter"></DatabaseGetterForm>
    <div v-else id="responder">Response from server: {{ serverResponse }}</div>
  </div>
</template>

<style>
input {
  margin: 0.4rem;
}
</style>
