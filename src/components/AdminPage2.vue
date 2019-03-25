<!-- for student results -->
<template>
  <div id='AdminPage2' class="container-fluid mt-4" style="padding-bottom: 100px">
    <h1 class="h1">Recent student results</h1>

    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Updated At</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="webtext in studentResults" :key="webtext.id">
            <td>{{webtext.id }}</td>
            <td>{{webtext.title }}</td>
            <td>{{webtext.body }}</td>
            <td class="text-nowrap">{{webtext.updatedAt.split('T').splice(0,1).toString() }}</td>
            <td class="text-right">
              <a href="#" @click.prevent="populateStudentResultToEdit(webtext)">Edit</a>
           <!--  - <a href="#" @click.prevent="deleteWebtext(webtext.id)">Delete</a> -->
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>

      <b-col lg="3">
        <b-card :title="(wmodel.id ? 'Edit Result ID#' + wmodel.id : '')">
          <form @submit.prevent="saveStudentResult">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="wmodel.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="wmodel.body"></b-form-textarea>
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
        studentResults:[],
        wmodel: {},
      }
    },
    async created () {
       this.refreshStudentResults()

    },
    methods: {
      async refreshStudentResults() {
        this.loading = true
        this.studentResults = await api.getStudentResults()
        this.loading = false
      },
      async populateStudentResultToEdit(post) {
        this.wmodel = Object.assign({}, post)
      }
      ,
      async saveStudentResult() {
        if (this.wmodel.id) {
          await api.updateStudentResult(this.wmodel.id, this.wmodel)
          this.wmodel = {} // reset form
          await this.refreshStudentResults()

        } else {
          alert('Please select a student result to edit')
          // await api.createWebtext(this.wmodel)
        }

      }
      //,
      // async deleteWebtext(id) {
      //   if (confirm('Are you sure you want to delete thiwebtext?')) {
      //     // if we are editing webtext we deleted, remove it from the form
      //     if (this.wmodel.id === id) {
      //       this.wmodel = {}
      //     }
      //     await api.deleteWebtext(id)
      //     await this.refreshWebtexts()
      //   }
      // }
    }

  }
</script>
