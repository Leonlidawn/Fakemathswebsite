
<template>
  <div id="app">
<div class="container">
    <b-navbar toggleable="md" type="dark" variant="dark" class="fixed-top">

    <div class="col-lg-6">
      <img class="img-responsive"  src="../src/assets/images/logo.png" alt="logo" width="70">ß
      <a class="navbar-brand" href="/"></a>
      <b-navbar-brand to="/">The Maths Institute(fake site for practice)</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle >
    </div>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <ul class="navbar-nav ml-auto ">

            <li class="nav-item " >
              <a class="nav-link " href="/news">News</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#primarytute">Primary School</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#hightute">High School</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#inditute">Individual Sessions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#online">Online Sessions</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/workshops">Workshop</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/#contact">Contact</a>
            </li>

          </ul>
        </b-navbar-nav>
      </b-collapse>
      <!--<b-navbar-brand  to="#" @click.prevent="logout" v-if="activeUser">Log out</b-navbar-brand>-->
      <b-navbar-brand  to="#" @click.prevent="logout" v-if="activeUser">Log out</b-navbar-brand>

    </b-navbar>
</div>
    <b-navbar toggleable="md" >
      <br>
      <br>

    </b-navbar>





    <!-- routes will be rendered here -->

    <router-view />


    <!-- Footer -->
    <footer class="py-5 bg-dark " id="contact" name="contact" >
      <a class="anchor" id="find us" name="Find us"></a>

      <div class="row " style="padding-left:3%; padding-right:3% " >

            <div class="col-lg-4 " >
              <a class="btn btn-lg btn-danger btn-block" target="_blank" href="https://www.google.com.au/maps/place/The+Mahts+Institute/@-33.9881899,150.9209694,10.27z/data=!4m18!1m12!4m11!1m3!2m2!1d151.1039207!2d-34.034443!1m6!1m2!1s0x6b12c7851b8d291f:0x138c1ad39cb46b8f!2sLonghurst+Mathematics+Coaching,+561+Kingsway,+Miranda+NSW+2228!2m2!1d151.102893!2d-34.0340361!3m4!1s0x6b12c7851b8d291f:0x138c1ad39cb46b8f!8m2!3d-34.0340361!4d151.102893
">Find us on the map</a>
              <div id='map' name = 'map' > </div>

            </div>


            <div class="col-lg-3">
              <p class="m-0 text-left text-white">
            Address: <br> 561 Kingsway Miranda <br>
            Mobile: <br> 0417 266 996 <br>
            Email:  <br> longhurstster@gmail.com
               </p>
            </div>

            <div class="col-lg-5 align-content-end text-white font-italic">

              <h5>
              <p class="text-left">
                <br>
           The Maths Institute, formerly known as Longhurst Mathematics Coaching College was established in 1988 and has been successfully tutoring Sutherland Shire student in mathematics since.
              </p>
              </h5>
            </div>
      </div>
      <p class="m-0 text-center text-white"> <br><br> &copy; The Maths Institute 2018</p>

      <!-- /.container -->
    </footer>

  </div>
</template>


<style>


  .nav-item{
    text-align: center;
  }
  /* Set the size of the div element that contains the map */
  #map {
    height: 200px;  /* The height is 400 pixels */
    width: 100%;  /* The width is the width of the web page */
  }
</style>

<script>
  export default {
    name: 'app',
    data () {
      return {
        posts: [],
        activeUser: null,
        url:'',
        id:''
      }
    },
    async created () {
      await this.refreshActiveUser()

    },
    watch: {
      // everytime a route is changed refresh the activeUser
      '$route': 'refreshActiveUser',

    },
    methods: {

      // login () {
      //   this.$auth.loginRedirect()
      // },
      async refreshActiveUser () {
        this.activeUser = await this.$auth.getUser()
      },

      async logout () {
        await this.$auth.logout()
        await this.refreshActiveUser()
        this.$router.push('/')
      }




    }
  }





</script>


