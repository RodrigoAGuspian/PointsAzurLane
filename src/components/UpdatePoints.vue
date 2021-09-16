<template>
    <Nav />
    <div class="row justify-content-center">
        <form @submit.prevent="checkForm()" class="col-12 col-sm-10 col-md-8 color-form">
            <p v-if="errors.length">
                <b>Por favor revise los siguientes campos que son necesarios para la actualización :</b>
                <ul>
                <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
                </ul>
            </p>
            <div class="form-group">
                <label for="gameID">UID del juego:</label>
                <input type="number" class="form-control" v-model="updatePoints.gameUID" id="gameID">
            </div>

            <div class="form-group">
                <label for="gotPoints">Puntos obtenidos en el evento:</label>
                <input type="number" class="form-control" v-model="updatePoints.points" id="gotPoints">
            </div>
            <div class="form-group row">
                <label for="imagePoints">Imagen de los puntos obtenidos: </label>
                <input type="file" class="form-control-file col" id="imagePoints" ref="imagePoints">
            </div>
            <div class="volver">
                <button class="btn btn-outline-light registerButton col-6 col-sm-4 col-md-3 offset-6 offset-sm-9 offset-10" type="submit" :disabled="setData">Actualizar puntos</button>
            </div>
            <div class="d-flex justify-content-center" v-if="setData">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
import Firebase from 'firebase';
import 'firebase/firestore'
import config from '../config';
import router from '../router/index';
import Nav from './Header/Nav.vue';
let app;
if(Firebase.apps.length>0)
    app  = Firebase.app()
else
    app = Firebase.initializeApp(config)
let db = app.firestore();
let pointsCollection = db.collection('points');

export default {
  name: 'RegisterPoints',
  components: {
      Nav,
  },
 data() {
    return {
      updatePoints: {
          gameUID: null,
          points: null,
          imagePoints: null,

      },
      errors: [],
      setData: false,
    }
  },


  
  methods: {
    checkForm () {
      this.setData= true;
      if (this.updatePoints.gameUID && this.updatePoints.points) {
        this.sendPoints();
        return true;
      }
      this.errors = []    
      if(!this.updatePoints.gameUID)
        this.errors.push('UID del juego.');

      if (!this.updatePoints.points)
        this.errors.push('Puntos obtenidos en el evento.');

      if(this.errors.length>0){
        this.setData = false;
      }
    
    },


    async sendPoints (){
      if((await pointsCollection.doc("data"+this.updatePoints.gameUID).get()).exists){
        await this.subirImagenes(this.updatePoints.gameUID);
        this.updatePoints.faction = this.selectFaction;
        await pointsCollection.doc("data"+this.updatePoints.gameUID).update({
            points: this.updatePoints.points,
            imagePoints: this.updatePoints.imagePoints,
        });
      }else{
        alert('El usuario que quieres actualizar los puntos no existe.');
        this.setData = false;
      }
    },

    async subirImagenes(uidPlayer) {
      try {
        const fileImagePoints = this.$refs.imagePoints.files[0];
        this.errors = []

        if(!fileImagePoints){
            this.errors.push('Imagen de los puntos obtenidos.');
        }
        if(this.errors>0){
            this.setData = false;
        }else{
            const responsePoints = await Firebase
              .storage()
              .ref(`imagesPoints/${uidPlayer}`)
              .put(fileImagePoints)
        
            const urlPoints = await responsePoints.ref.getDownloadURL();
            this.updatePoints.imagePoints = urlPoints;
            
            router.push('/');
        }
            
      } catch (error) {
        this.setData = false;
      }
    },
    

  },
  
    
}
</script>

<style>

</style>