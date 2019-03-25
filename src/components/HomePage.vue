<template>
  <div class="scrol">
    <div style="background: #0074D9">
      <!--carousels                           -------------     -->

      <b-carousel
        id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        controls
        indicators
        :interval="3000"
        class="carousel-fade"
        data-ride="carousel"
      >
        <!-- Text slides with image -->
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100 h-100" src="../assets/images/1.png">
          <h1>Confidence</h1>
          <h2>+</h2>
          <h1>Result</h1>
          <h2>=</h2>
          <h1>Success</h1>
        </b-carousel-slide>

        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100 h-100" src="../assets/images/3.png">
          <h2>Innovative tuition programs from Years 4 to 12</h2>
        </b-carousel-slide>

        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100 h-100" src="../assets/images/4.png">
          <h3>Maths tuition that delivers confidence and great results</h3>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <!--lastNews                           -------------     -->
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>
              Latest News:
              <a href="/news">(click here to read all announcements)</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ lastPost.body }}</td>
            <!--2018-08-03 T 04:04:26.943Z-->
            <td class="text-nowrap">{{ lastPost.updatedAt.split('T').splice(0,1).toString()}}</td>
            <td class="text-right"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--        -------------------------------------------              -->

    <div class="container" id="Recent results">
      <h4>Recent student results:</h4>

      <div class="row">
        <div class="col-lg-4" v-for="msg in studentResults">
          <studentResult v-bind:message="msg.body"></studentResult>
        </div>
      </div>
    </div>

    <a class="anchor" ref="courses" name="courses" id="courses"></a>

    <coursesPage></coursesPage>

    <br>
    <br>

    <!--=================================Founder==================================-->
    <div class="container">
      <h2>Founder</h2>

      <div class="row">
        <div class="col-lg-4 col-sm-10 portfolio-item">
          <div class="card h-100">
            <img class="card-img-top" src="../assets/images/founder.jpeg" alt>
            <div class="card-body">
              <h4 class="card-title">Director: Dr. Christopher Longhurst</h4>
            </div>
          </div>
        </div>

        <div class="col-sm">
          <div
            class="wpb_column vc_column_container vc_col-sm-10 vc_col-lg-6 vc_col-md-6 vc_col-has-fill"
          >
            <div class="vc_column-inner vc_custom_1522004935044">
              <div class="wpb_wrapper">
                <h5>
                  <p>Chris is the founder of “The Maths Institute”.</p>
                  <p>The mastermind behind the highly successful tutoring methods used by the institute.</p>
                  <P>The only PHD in Maths tutoring in Sydney.</P>
                  <p>Has been tutoring in the Shire since 1978, has also taught at all levels of High School and University.</p>
                  <p>Patient, Adaptable and Loves Teaching students and helping them achieve and discover their full potential.</p>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- /.row -->
    </div>

    <!-- /.container -->
  </div>
</template>



<style >
.anchor {
  display: block;
  position: relative;
  top: -250px;
  visibility: hidden;
}

.carousel-item {
  height: 70vh;
  min-height: 300px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.portfolio-item {
  margin-bottom: 30px;
}

.niceFont {
  color: #383d41;
  font-size: 18px;
  line-height: 1.5rem;
  word-wrap: break-word;
}
</style>







<script scoped>
import coursesPage from "./CoursesPage.vue";
import studentResult from "./StudentResult.vue";
import api from "@/api";

export default {
  components: {
    studentResult: studentResult,
    coursesPage: coursesPage
  },

  data() {
    return {
      posts: [],
      lastPost: {},
      studentResults: {}
    };
  },

  //this created method will be executed when website is loaded.
  async created() {
    this.refreshData();
  },
  computed: {
    sortedPosts() {
      return this.posts.sort((a, b) => {
        return b.updatedAt.toString() > a.updatedAt.toString();
      });
    }
  },

  methods: {
    async refreshData() {
      this.posts = await api.getPosts();
      this.lastPost = this.sortedPosts[0];
      this.studentResults = await api.getStudentResults();
    }
  }
};
</script>
