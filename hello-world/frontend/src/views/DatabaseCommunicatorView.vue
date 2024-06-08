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
    <div>
      <input type="radio" v-model="currentFragment" id="setterOption" :value="'set'" />
      <label for="setterOption">Update Bio</label>
    </div>
    <div>
      <input type="radio" v-model="currentFragment" id="getterOption" :value="'get'" />
      <label for="getterOption">View Bio</label>
    </div>
    <div>
      <input type="radio" v-model="currentFragment" id="responseOption" :value="'response'" />
      <label for="responseOption">See Server Response</label>
    </div>
  </fieldset>
  <div id="fragment">
    <DatabaseSetterForm v-if="currentFragment === 'set'"></DatabaseSetterForm>
    <DatabaseGetterForm v-else-if="currentFragment === 'get'"></DatabaseGetterForm>
    <div v-else>Response from server: {{ serverResponse }}</div>
  </div>
</template>

<style>
input {
  margin: 0.4rem;
}
</style>
