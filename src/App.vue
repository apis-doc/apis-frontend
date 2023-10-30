<template>
  <div id="app">
    <router-view/>
    <nav>
      <router-link to="/vue">Vue</router-link>
      |
      <router-link to="/main/user">User</router-link>
      |
      <router-link to="/main">Main</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</template>
<!--覆盖所有样式,全局范围出现-->
<style lang="less">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup>
</script>
