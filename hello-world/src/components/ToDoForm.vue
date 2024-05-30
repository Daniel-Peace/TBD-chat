<script setup lang="ts">
const label = defineModel({ default: '' })
const emit = defineEmits(['todo-added'])

function onSubmit() {
  if (label.value === '') {
    return
  }
  emit('todo-added', label.value)
  label.value = ''
}
</script>

<template>
  <!-- ".prevent" means that the default form-submission action (page refresh) will be suppressed, and only our custom function will run -->
  <form @submit.prevent="onSubmit">
    <label for="new-todo-input"> What needs to be done? </label>
    <!-- Trim means leading and ending whitespace will be removed. (I tried the property .lazy based on an MDN recommendation, but that didn't work right with Composition API) -->
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.trim="label"
    />
    <button type="submit">Add</button>
  </form>
</template>
