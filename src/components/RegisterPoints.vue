<template>
  <Nav />
  <div class="row justify-content-center">
    <form @submit.prevent="checkForm()" class="col-12 col-sm-10 col-md-8 color-form">
      <p v-if="errors.length">
          <b>Por favor revise los siguientes campos que son necesarios para el registro:</b>
          <ul>
          <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
          </ul>
      </p>

      <div class="form-group">
          <label for="playerName">Nombre del jugador:</label>
          <input type="text" class="form-control" id="playerName" v-model="newPoints.player">
      </div>

      <div class="form-group">
          <label for="gameID">UID del juego:</label>
          <input type="number" class="form-control" v-model="newPoints.gameUID" id="gameID">
      </div>

      <div class="form-group row">
          <label for="imageUID">Imagen de su UID: </label>
          <input type="file" class="form-control-file col" id="imageUID" ref="imageUID">
      </div>

      <div class="form-group">
          <label >Facción a la que pertenece:</label>
          <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="USSRadio" value="USS" v-model="selectFaction">
              <label class="form-check-label" for="USSRadio">
              Eagle Union (USS)
              </label>
          </div>

          <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="HMSRadio" value="HMS" v-model="selectFaction">
              <label class="form-check-label" for="HMSRadio">
              Royal Navy (HMS)
              </label>
          </div>


          <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="IJNRadio" value="IJN" v-model="selectFaction">
              <label class="form-check-label" for="IJNRadio">
              Sakura Empire (IJN)
              </label>
          </div>

          <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="KMSRadio" value="KMS" v-model="selectFaction">
              <label class="form-check-label" for="KMSRadio">
              Iron Blood (KMS)
              </label>
          </div>
      </div>
      <div class="form-group">
          <label for="gotPoints">Puntos obtenidos en el evento:</label>
          <input type="number" class="form-control" v-model="newPoints.points" id="gotPoints">
      </div>
      <div class="form-group row">
          <label for="imagePoints">Imagen de los puntos obtenidos: </label>
          <input type="file" class="form-control-file col" id="imagePoints" ref="imagePoints">
      </div>
      
      <div class="volver">
          <button class="btn btn-outline-light registerButton col-6 col-sm-4 col-md-3 offset-6 offset-sm-9 offset-10" type="submit" :disabled="setData">Registrar puntos</button>
      </div>

      <div class="d-flex volver justify-content-center" v-if="setData">
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
import router from '../router/index'
import config from '../config';
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
      newPoints: {
          player: null,
          gameUID: null,
          imageGameUID: null,
          faction: null,
          points: null,
          imagePoints: null,

      },
      errors: [],
      setData: false,
      selectFaction: '',
      volver: '<-',
    }
  },


  
  methods: {
    checkForm () {
      this.setData= true;
      if (this.newPoints.player && this.newPoints.gameUID && this.newPoints.points) {
        this.sendPoints();
        return true;
      }
      this.errors = []    
      if (!this.newPoints.player)
        this.errors.push('Nombre del jugador');

      if(!this.newPoints.gameUID)
        this.errors.push('UID del juego.');


      if (!this.selectFaction)
        this.errors.push('Facción.');

      if (!this.newPoints.points)
        this.errors.push('Puntos obtenidos en el evento.');

      if(this.errors.length>0){
        this.setData = false;
      }
    
    },


    async sendPoints (){
      let exist =  (await pointsCollection.doc("data"+this.newPoints.gameUID).get()).exists
      if(!exist){
        await this.subirImagenes(this.newPoints.gameUID);
        this.newPoints.faction = this.selectFaction;
        await pointsCollection.doc("data"+this.newPoints.gameUID).set({
            player: this.newPoints.player,
            gameUID: this.newPoints.gameUID,
            imageGameUID: this.newPoints.imageGameUID,
            faction: this.newPoints.faction,
            points: this.newPoints.points,
            imagePoints: this.newPoints.imagePoints,
            
        });
      }else{
        alert('El usuario que quieres registrar ya existe.');
        this.setData = false;
      }
    },

    async subirImagenes(uidPlayer) {
      try {
        const fileImageUID = this.$refs.imageUID.files[0];
        const fileImagePoints = this.$refs.imagePoints.files[0];
        this.errors = []
        if(!fileImageUID){
            this.errors.push('Imagen de su UID.');
        }

        if(!fileImagePoints){
            this.errors.push('Imagen de los puntos obtenidos.');
        }

        if(this.errors.length>0){
            this.setData = false;
        }else{
          const responseUID = await Firebase
              .storage()
              .ref(`imagesUID/${uidPlayer}`)
              .put(fileImageUID);
          const urlUID = await responseUID.ref.getDownloadURL();
          this.newPoints.imageGameUID = urlUID;
              

          const responsePoints = await Firebase
                .storage()
                .ref(`imagesPoints/${uidPlayer}`)
                .put(fileImagePoints)
          
          const urlPoints = await responsePoints.ref.getDownloadURL();
          this.newPoints.imagePoints = urlPoints;
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
div, input, select, option{
    background-color: transparent !important;
    color: white !important; 
    text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
    border: none;
}

.form-group{
    padding: 0.7% 0 ;
}
.registerButton{
    color: white !important; 
    text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
    border: 1px solid white !important;
    
}
.volver{
    color: white !important; 
    padding: 0.5% 0 !important;
}

.color-form{
  background: rgb(2,0,36);
  background: linear-gradient(37deg, rgba(2,0,36,0.3) 0%, rgba(0,0,0,0.03) 26%, rgba(255,255,255,0.3) 100%);
}

input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: white;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: black;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

</style>

