<!--Group session  -->
<template>
<div id='CoursesPage'>
<div class="container  " >

  <div>
    <h1 class="my-4">Group Sessions
      <b-btn class="btn btn-info" v-b-toggle.groupsession v-on:click="changeName1()"> {{cText1}}</b-btn>
    </h1>


    <p class="niceFont">We offer group tutorial sessions allow students to work independently or in groups with the aid of a tutor.<br><br> </p>
    <b-collapse visible ref="groupsession" id="groupsession" name = "groupsession" class="mt-2">

      <a class="anchor" ref="primarytute" name = 'primarytute' id ='primarytute'></a>
      <div class="row">
        <div class="col-lg-8 mb-4">
          <div class="card h-100">
            <div class="card-header">
              <div v-html="primarySchool.title"></div>
            </div>
            <div class="card-body ">
              <div v-html="primarySchool.body"></div>

            </div>
            <div class="card-footer niceFont">
              <div v-html="primarySchool.detail"></div>
            </div>
          </div>
        </div>

        <div class="col-lg-2 mb-4">
          <img class="img-responsive"  src="../assets/images/groupSession.jpg" alt="groupsession" width="330">
        </div>
      </div>


      <a class="anchor" ref="hightute" name = 'hightute' id ='hightute'></a>
      <div class="row">
        <div class="col-lg-8 mb-4">
          <div class="card h-100">

            <div class="card-header">
              <div v-html="highSchool.title"></div>
            </div>
            <div class="card-body niceFont">
              <div class="card-text">
                <div v-html="highSchool.body"></div>
              </div>
            </div>
            <div class="card-footer niceFont">
              <div v-html="highSchool.detail"></div>
            </div>
          </div>
        </div> <!--close card-->

        <div class="col-lg-4 mb-5">
          <img class="img-responsive"  src="../assets/images/groupSession1.jpg" alt="groupsession1" width="350">
        </div>
      </div>

    </b-collapse>

  </div>
</div>

<!--individual session -->

<div class="container">
  <a class="anchor"  ref="inditute" id = "inditute" name = "inditute" ></a>

  <h1 class="my-4">Individual Tutoring – The Super Tutor
    <b-btn class="btn btn-info" v-b-toggle.supertutor v-on:click="changeName2()"> {{cText2}}</b-btn>
  </h1>
  <p class="niceFont"> One-on-one instruction, same tutor every meeting. Comprehensive, specific，and effective！You set the goals and I will achieve them with a specialized service second to none.
    <br><br>
  </p>

  <b-collapse visible id="supertutor" class="mt-2" >

    <div class="row">
      <div class="col-lg-7 mb-4">
        <div class="card h-100">
          <div class="card-header">
            <div v-html="individual.title"></div>
          </div>
          <div class="card-body">
            <div class="card-text niceFont">
              <div v-html="individual.body"></div>
            </div>
          </div>
          <div class="card-footer niceFont">
            <div v-html="individual.detail"></div>
          </div>
        </div>
      </div>

      <div class="col-lg-5 mb-5">
        <img class="img-responsive"  src="../assets/images/individualTutor.png" alt="individual sessions" width="450">
      </div>
    </div>
  </b-collapse>
</div>


<!--online session -->
<div class="container">
  <a class="anchor"  ref="online" id = 'online' name = 'online'></a>
  <div class="niceFont">
    <h1>Online Tutoring
      <b-btn class="btn btn-info" v-b-toggle.zoom v-on:click="changeName3()"> {{cText3}}</b-btn>
    </h1>
    <p> Zoom online one-to-one sessions for exam prep and tutoring.
    </p>
  </div>
  <b-collapse  visible ref="zoom" id="zoom" name="zoom" class="mt-2" >

    <div class="row">
      <div class="col-lg-6 mb-5">
        <img class="img-responsive"  src="../assets/images/zoom.jpg" alt="zoom" width="450">
      </div>

      <div class="col-lg-6 mb-5">
        <div class="card h-100 niceFont">
          <div class="card-body">
            <div class="card-text">
              <div v-html="online.body"></div>
            </div>
          </div>
          <div class="card-footer">
            <div v-html="online.detail"></div>
            <a href="https://www.zoom.us/" target="_blank">Learn more about Zoom</a>
          </div>
        </div>
      </div>
    </div>

  </b-collapse>
</div>

</div>
</template>


<script>

  import api from '@/api'

  export default {
    data() {
      return {
        collapseT:'Show',
        expandT:'Hide',
        cText1: '',
        cText2: '',
        cText3: '',


        loading: false,
        courses: [],
        primarySchool:{},
        highSchool:{},
        individual:{},
        online:{},

        test:null
      }
    },
    async created() {
        this.cText1 = this.expandT
        this.cText2 = this.expandT
        this.cText3 = this.expandT
        this.refreshCourses()



    },

    async mounted(){
      this.url = window.location.toString();//进这个页面的url
      this.id = this.url.split("#")[1];
      this.url = window.location.toString();//进这个页面的url
      this.id = this.url.split("#")[1];

      this.goToAnchor(this.id)

    },

    methods: {
      //TODO:these can be refactored into a component, a button template with a changeName method
      changeName1(){
        if(this.cText1==this.expandT) {
          this.cText1 = this.collapseT
        }else{
          this.cText1 = this.expandT
        }
      },
      changeName2(){
        if(this.cText2==this.expandT) {
          this.cText2 = this.collapseT
        }else{
          this.cText2 = this.expandT
        }
      },
      changeName3(){
        if(this.cText3==this.expandT) {
          this.cText3 = this.collapseT
        }else{
          this.cText3 = this.expandT
        }
      },
      async goToAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) {
          anchorElement.scrollIntoView(true)

          window.scrollBy(0,window.innerHeight/5 ); // Adjust scrolling with a negative value here

        }
      },


      async refreshCourses() {

        this.courses = await api.getCourses()
        this.primarySchool = this.courses[0];
        this.highSchool = this.courses[1];
        this.individual = this.courses[2];
        this.online = this.courses[3];

      }
    }
  }
</script>
