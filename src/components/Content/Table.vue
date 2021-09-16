<template>
    <div>
        <div class="row justify-content-end g-3">
            <div class="col-4">
                <label>Jugadores registrados: {{ pointsData.length }}</label>
            </div>
        </div>
        <div class="row justify-content-end g-3">
            <div class="col-4">
                <div class=" input-group">
                    <div class="input-group-text search-input"><span class="material-icons">search</span></div>
                    <input type="text" v-model="buscar" class="form-control search-input"/>
                </div>
            </div>
        </div>
        <div class="table-data">
          <table class="table table-borderless">
              <thead>
                  <tr class="row row-table">
                      <th class="col-3" scope="col">Nombre</th>
                      <th class="col-3" scope="col">Facción</th>
                      <th class="col-3" scope="col">Puntos</th>
                      <th class="col-3" scope="col">Imagen de los Puntos</th>
                  </tr>
              </thead>
              <tbody v-for="(item, index) in items"  v-bind="item" v-bind:key="index">
                  <tr class="row row-table align-items-center" v-if="item.player.length>0">
                      <th class="col-3">{{ item.player }}</th>
                      <th class="col-3">{{ item.faction}}</th>
                      <th class="col-3">{{ item.points }}</th>
                      <th class="col-3"><a target="_blank" v-bind:href=item.imagePoints><img class="image-points" v-bind:src=item.imagePoints /></a></th>
                  </tr>
              </tbody>
          </table>
        </div>
    </div>
</template>

<script>


export default {
  name: 'Table',
  props :{
    pointsData: Array,
  },
  components: {

  },

data() {
    return {
      buscar: '',
      active:true,
      
    }
  },
  

  computed: {
    items() {
      return this.pointsData.filter(item => {
        return item.player.toLowerCase().includes(this.buscar.toLowerCase());
      });
    },


  },



}
</script>

<style scoped>
th{
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
    
}
.search-input{
    background-color: transparent !important;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
    border: none !important;
}


.image-points{
  height: 80px;
  cursor: zoom-in;
  
}
.row-table{
  background: rgb(2,0,36);
  background: linear-gradient(37deg, rgba(2,0,36,0.3) 0%, rgba(0,0,0,0.03) 26%, rgba(255,255,255,0.3) 100%);
}
.table-data{
  padding: 0 0.7vw !important;
}
</style>
