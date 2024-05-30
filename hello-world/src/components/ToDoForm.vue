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
    <h2 class="label-wrapper">
      <label for="new-todo-input" class="label__lg"> What needs to be done? </label>
    </h2>
    <!-- Trim means leading and ending whitespace will be removed. (I tried the property .lazy based on an MDN recommendation, but that didn't work right with Composition API) -->
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.trim="label"
      class="input__lg"
    />
    <button type="submit" class="btn btn__primary btn__lg">Add</button>
  </form>
</template>
