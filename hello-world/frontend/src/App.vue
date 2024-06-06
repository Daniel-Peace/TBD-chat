<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <h1>Daniel and Skyler's Vue Feature Testing App</h1>
  <p><strong>Current route path:</strong> {{ route.fullPath }}</p>
  <nav>
    <ul>
      <li><RouterLink to="/">Go to Home</RouterLink></li>
      <li><RouterLink to="/list">Go to Skyler's Demo List</RouterLink></li>
      <li>
        <RouterLink to="/database">Go to Skyler's Demo Database Communication Form</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
