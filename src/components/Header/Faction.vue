<template>
    
    <div class="col-6 col-sm-6 col-md-3 faction fw-bold fs-4">
      <img class="image-icon" src="../../assets/uss.png" v-if="title=='USS'"/>
      <img class="image-icon" src="../../assets/kms.png" v-if="title=='KMS'"/>
      <img class="image-icon" src="../../assets/hms.png" v-if="title=='HMS'"/>
      <img class="image-icon" src="../../assets/ijn.png" v-if="title=='IJN'"/>
      <div>{{ title }}: {{ points }} PTS</div>
    </div>
    
    
</template>

<script>
export default {
  name: 'Faction',
  props: {
    title: String,
    points: String,
  }

 }
</script>

<style>
.faction{
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
    padding: 0.5% !important;
    text-align: center !important;
}

.image-icon{
  height: 80px;
}


</style>