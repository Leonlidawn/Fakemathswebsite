<template>
  <div id='AdminPage' class="container-fluid mt-4" style="padding-bottom: 100px">
    <h1 class="h1">Admin Page</h1>

    <adminPage1></adminPage1>
    <adminPage2></adminPage2>
    <adminPage3></adminPage3>
    <adminPage4></adminPage4>


  </div>

</template>



<script>

  import news from './AdminPage1.vue'
  import results from './AdminPage2.vue'
  import courses from './AdminPage3.vue'
  import workshop from './AdminPage4.vue'

  export default {
    components:{
      'adminPage1':news,
      'adminPage2':results,
      'adminPage3':courses,
      'adminPage4':workshop
    }

  }
</script>

