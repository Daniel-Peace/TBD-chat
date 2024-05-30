<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { nanoid } from 'nanoid'
import { ref } from 'vue'
import ToDoItem from './components/ToDoItem.vue'
import ToDoForm from './components/ToDoForm.vue'

// must be a "ref" since we will be changing it with addToDo
const ToDoItems = ref([
  { id: 'todo-' + nanoid(), label: 'Learn Vue', done: false },
  { id: 'todo-' + nanoid(), label: 'Create a Vue project with create-vue', done: true },
  { id: 'todo-' + nanoid(), label: 'Have fun', done: true },
  { id: 'todo-' + nanoid(), label: 'Create a to-do list', done: false }
])

function addToDo(toDoLabel: string) {
  console.log(`Adding todo ${toDoLabel}`)
  ToDoItems.value.push({ id: `todo-${nanoid()}`, label: toDoLabel, done: false })
}
</script>

<template>
  <div id="app">
    <h1>To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <ul>
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
      </li>
    </ul>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
