<script setup lang="ts">
defineProps({
  label: { required: true, type: String },
  done: { default: false, type: Boolean },
  id: { required: true, type: String }
})
</script>

<template>
  <div>
    <input type="checkbox" :id="id" :checked="done" />
    <label :for="id">{{ label }}</label>
  </div>
</template>
