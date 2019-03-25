<template>
  <div id="WorkshopPage" class="container" style="padding-bottom: 200px; padding-top: 20px "  >




    <div v-if = "workshop.isShow === 'yes'"   v-for="workshop in workshops" :key="workshop.id">
      <div class="workshopTitle" v-html="workshop.title"></div>
      <div class="niceFont" v-html="workshop.body"></div>
      <br>
      <br>

    </div>

  </div>
</template>




<script>
  import api from '@/api'

  export default {
    data () {
      return {
        workshops:[],
      }
    },
    async created () {
      this.refreshWorkshops()
    },

    methods: {

      async refreshWorkshops() {
        this.loading = true
        this.workshops = await api.getWorkshops()
        this.loading = false
      }
    }

  }
</script>

