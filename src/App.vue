<template>
  <Points />
</template>

<script>
import Points from './components/Points.vue';
export default {
  name: 'App',
  components: {
    Points,
  },
}
</script>

<style>
#app{
    height: auto;
    width: 100%;
    
}
body{
  background-image:url("./assets/fondo_oscurecido.jpg");
  background-repeat:no-repeat;
  background-size: cover;
  background-position:center;
  background-attachment: fixed
}
</style>
