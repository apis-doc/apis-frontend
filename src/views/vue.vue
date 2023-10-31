<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!--todo delete-->
    <h3>Project Links</h3>
    <ul>
      <li>
        <router-link to="/api-manage/users">User</router-link>
      </li>
      <li>
        <router-link to="/api-manage/project">Project</router-link>
      </li>
      <li>
        <router-link to="/api-manage/log">Log</router-link>
      </li>
      <li>
        <router-link to="/api">Api</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'VueHelloWorld',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
