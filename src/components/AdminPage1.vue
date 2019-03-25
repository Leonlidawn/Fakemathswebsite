
<!-- for news  -->
<template>
  <div id='AdminPage1' class="container-fluid mt-4" style="padding-bottom: 100px">
    <h1 class="h1">News</h1>

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
          <tr v-for="post in sortedPosts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
            <td class="text-nowrap">{{ post.updatedAt.split('T').splice(0,1).toString() }}</td>
            <td class="text-right">
              <a href="#" @click.prevent="populatePostToEdit(post)">Edit</a> -
              <a href="#" @click.prevent="deletePost(post.id)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(pmodel.id ? 'Edit News ID#' + pmodel.id : '')">
          <form @submit.prevent="savePost">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="pmodel.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="pmodel.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>

    <admin-page2></admin-page2>


  </div>

</template>



<script>

  import api from '@/api'

  export default {

    data () {
      return {
        loading: false,
        posts: [],
        pmodel: {},
      }
    },
    async created () {
      this.refreshPosts()
      // this.refreshWebtexts()

    },
    computed:{
      sortedPosts(){
        return this.posts.sort((a, b) => { return b.updatedAt.toString() > a.updatedAt.toString();});
      }
    },
    methods: {
      async refreshPosts () {
        this.loading = true
        this.posts = await api.getPosts()
        this.loading = false
      },
      async populatePostToEdit (post) {
        this.pmodel = Object.assign({}, post)
      },
      async savePost () {
        if (this.pmodel.id) {
          await api.updatePost(this.pmodel.id, this.pmodel)
        } else {
          await api.createPost(this.pmodel)
        }
        this.pmodel = {} // reset form
        await this.refreshPosts()
      },
      async deletePost (id) {
        if (confirm('Are you sure you want to delete this post?')) {
          // if we are editing a post we deleted, remove it from the form
          if (this.pmodel.id === id) {
            this.pmodel = {}
          }
          await api.deletePost(id)
          await this.refreshPosts()
        }
      }
    }
  }
</script>
