<template>
  <div id='AdminPage4' class="container-fluid mt-4" style="padding-bottom: 100px">
    <h1 class="h1">Workshop</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>isShow</th>
            <th>Updated At</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="workshop in workshops" :key="workshop.id">
            <td>{{workshop.id }}</td>
            <td>{{workshop.title }}</td>
            <td>{{workshop.body }}</td>
            <td>{{workshop.isShow }}</td>
            <td class="text-nowrap">{{workshop.updatedAt.split('T').splice(0,1).toString() }}</td>

            <td class="text-right">
              <a href="#" @click.prevent="populateWorkshopToEdit(workshop)">Edit</a>
               - <a href="#" @click.prevent="deleteWorkshop(workshop.id)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(cmodel.id ? 'Edit Workshop ID#' + cmodel.id : '')">
          <form @submit.prevent="saveWorkshop">
            <b-form-group label="Title">
              <b-form-textarea  rows='6' v-model="cmodel.title"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="6" v-model="cmodel.body"></b-form-textarea>
            </b-form-group>


            <b-form-group >
              Show: <input type="checkbox" id="checkbox" v-model="cmodel.isShow" true-value="yes"
                           false-value="no">
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
        workshops:[],
        cmodel: {},
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
      },
      async populateWorkshopToEdit(post) {
        this.cmodel = Object.assign({}, post)
      },

      async saveWorkshop() {
        if (this.cmodel.id) {
          await api.updateWorkshop(this.cmodel.id, this.cmodel)
          this.cmodel = {} // reset form
          await this.refreshWorkshops()
        } else {
          // alert('Please select a student result to edit')
          await api.createWorkshop(this.cmodel)
          await this.refreshWorkshops()
        }
      },

      async deleteWorkshop(id) {
        if (confirm('Are you sure you want to delete this workshop?')) {
          // if we are editing webtext we deleted, remove it from the form
          if (this.cmodel.id === id) {
            this.cmodel = {}
          }
          await api.deleteWorkshop(id)
          await this.refreshWorkshops()
        }
      }
    }

  }
</script>
