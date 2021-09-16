<template>
    <header class="fs-4 fw-bolder row"><div class="div-header">Azur Lane x THE IDOLM@STER Collaboration</div></header>
    <nav class="navbar nav-points navbar-expand-lg">
        <div class="container-fluid">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <router-link :to="{ path: '/' }">
                        <a class="nav-link">Lista de puntos</a>
                    </router-link>
                </li>
                <!-- 
                <li class="nav-item" role="presentation">
                    <router-link :to="{ path: 'registrarPuntos' }">
                        <a class="nav-link">Registrar puntos</a>
                    </router-link>
                </li>
                
                <li class="nav-item" role="presentation">
                    <router-link :to="{ path: 'actualizarPuntos' }">
                        <a class="nav-link">Actualizar de puntos</a>
                    </router-link>
                </li>
                -->
            </ul>
        </div>
    </nav>
</template>

<script>
import idol from '../../assets/idol.mp3'
const audioIdol = new Audio(idol);
export default {
    name: 'Nav',
    components: {
      
    },

    methods: {    
    playIdol(){
        if(audioIdol.played)
            audioIdol.play();
    },

  },
}
</script>

<style>
.nav-points{
    margin: 0% 2%;

}
.nav-link{
    color: white !important;
}
.nav-link:hover{
    color: rgb(184, 184, 184) !important;
}
header{
    padding: 1% 2.75% !important;
}
.div-header{
    float:left;
}
</style>