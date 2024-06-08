<script setup lang="ts"></script>

<template>
  <form action="/api/form-handler/get" method="post">
    <p>User this form to retrieve a user's bio:</p>
    <ul>
      <li>
        <label for="name">Name:</label>
        <input type="text" id="name" name="person_name" />
      </li>
      <li class="button">
        <button type="submit">Get this user</button>
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
