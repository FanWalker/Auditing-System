<template>
  <div id="app">
    <h4 id="title">{{ title }}</h4>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: '骑手审核',
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
#title {
  margin-top: 2px;
  vertical-align: middle;
  height: 3rem;
  width: 100%;
  line-height: 3rem;  
  background: #fff;
}
</style>
