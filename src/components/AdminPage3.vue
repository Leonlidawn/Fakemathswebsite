<template>
  <div id='AdminPage3' class="container-fluid mt-4" style="padding-bottom: 100px">
    <h1 class="h1">Courses</h1>

    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Detail</th>
            <th>Updated At</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="webtext in courses" :key="webtext.id">
            <td>{{webtext.id }}</td>
            <td>{{webtext.title }}</td>
            <td>{{webtext.body }}</td>
            <td>{{webtext.detail }}</td>
            <td class="text-nowrap">{{webtext.updatedAt.split('T').splice(0,1).toString() }}</td>

            <td class="text-right">
              <a href="#" @click.prevent="populateCourseToEdit(webtext)">Edit</a>
                 - <a href="#" @click.prevent="deleteCourse(webtext.id)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(cmodel.id ? 'Edit Course description ID#' + cmodel.id : '')">
          <form @submit.prevent="saveCourse">
            <b-form-group label="Title">
              <b-form-textarea  rows='6' v-model="cmodel.title"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="6" v-model="cmodel.body"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Detail">
            <b-form-textarea rows="6" v-model="cmodel.detail"></b-form-textarea>
          </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>



<script>

  import api from '@/api'

  export default {
    data () {
      return {
        loading: false,
        courses:[],
        cmodel: {},
      }
    },
    async created () {
      this.refreshCourses()

    },
    methods: {
      async refreshCourses() {
        this.loading = true
        this.courses = await api.getCourses()
        this.loading = false
      }
      ,
      async populateCourseToEdit(post) {
        this.cmodel = Object.assign({}, post)
      }
      ,
      async saveCourse() {
        if (this.cmodel.id) {
          await api.updateCourse(this.cmodel.id, this.cmodel)
          this.cmodel = {} // reset form
          await this.refreshCourses()
        } else {
         // alert('Please select a student result to edit')
          await api.createCourse(this.cmodel)
          await this.refreshCourses()

        }

      }
      ,
      async deleteCourse(id) {
        if (confirm('Are you sure you want to delete this course content?')) {
          // if we are editing webtext we deleted, remove it from the form
          if (this.cmodel.id === id) {
            this.cmodel = {}
          }
          await api.deleteCourse(id)
          await this.refreshCourses()
        }
      }
    }

  }
</script>
