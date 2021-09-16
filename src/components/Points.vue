<template>
    <div class="queque" @click="playQueQue"></div>
    <Nav />
    <div class="body">        
        <div class="header">
            <div class="row factions justify-content-center align-items-center">
                <Faction title="USS" v-bind:points=factionPoints[0] />
                <Faction title="HMS" v-bind:points=factionPoints[1] />
                <Faction title="KMS" v-bind:points=factionPoints[2] />
                <Faction title="IJN" v-bind:points=factionPoints[3] />
            </div>
        </div>
        <div>
            <Table v-bind:pointsData="pointsData" class="players-table"/>
        </div>
       
    </div>
    <footer class="row text-end justify-content-end align-items-end"><div @click="playAmagiChan" class="foot-div">By and for the SpaceDgn community.</div></footer>
</template>

<script>

import Faction from './Header/Faction.vue';
import Table from './Content/Table.vue';
import Nav from './Header/Nav.vue';
import Firebase from 'firebase';
import config from '../config';
import amagiChan from '../assets/amagi-chan-headpad.ogg'
import queque from '../assets/queque.mp3'
let app  = Firebase.initializeApp(config);
let db = app.firestore();
const audioAmagiChan = new Audio(amagiChan);
const audioQueQue= new Audio(queque);
export default {
  name: 'Points',
  components: {
    Faction,
    Table,
    Nav,
  },

  data(){
      return{
          pointsData: []
      }
  },

  created: function() {
    
    db.collection('points').onSnapshot(points => {
      let pointsTmp = [];
      points.docs.forEach(doc =>{
          pointsTmp.push(doc.data());
      })
      this.pointsData = pointsTmp;
    });
    
  },
  
  computed: {
    factionPoints(){

        let allpoints=[0,0,0,0]

        this.pointsData.filter(item => item.faction === "USS").forEach(element => {
            allpoints[0] += Number(element.points);
        });

        this.pointsData.filter(item => item.faction === "HMS").forEach(element => {
            allpoints[1] += Number(element.points);
        });

        this.pointsData.filter(item => item.faction === "KMS").forEach(element => {
            allpoints[2] += Number(element.points);
        });

        this.pointsData.filter(item => item.faction === "IJN").forEach(element => {
            allpoints[3] += Number(element.points);
        });
        return allpoints;
    }
  },

  methods: {
      
    playAmagiChan(){
        if(audioAmagiChan.played)
            audioAmagiChan.play();
    },

    playQueQue(){
        if(audioQueQue.played)
            audioQueQue.play();
    }


  },

  firestore:{
    pointsData: db.collection('points'),
  }

  
}
</script>

<style>
html, body{
    height:100%;
    margin: 0;
}
::-webkit-scrollbar {
    display: none;
}
.factions{
    background: linear-gradient(37deg, rgba(44, 44, 44, 0.3) 0%, rgba(255, 255, 255, 0.3) 26%, rgba(53, 53, 53, 0.3) 100%);
}
.players-table{
    padding: 2%;
}
.header{
    padding: 0 2.75%;
}
footer{
    color: white !important; 
    text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
}
.foot-div{
    float: left;
    width: auto !important;
    margin: 0 2%;
}
.queque{
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
}
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