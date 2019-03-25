<template>
  <div class="container" style="padding-bottom: 200px; padding-top: 20px ">

    <h1 class="h1">News</h1>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>Title</th>
        <th>Content</th>
        <th>Date</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="post in sortedPosts" :key="post.id" >
        <td>{{ post.title }}</td>
        <td>{{ post.body }}</td>
        <!--2018-08-03 T 04:04:26.943Z-->
        <td class="text-nowrap">{{ post.updatedAt.split('T').splice(0,1).toString()}}</td>
        <td class="text-right">
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>


<script>
  import api from '@/api'

  export default {
    data () {
      return {
        posts: [],
      }
    },
    async created () {
      this.refreshPosts()
    },
    methods: {
      async refreshPosts () {
        this.loading = true
        this.posts = await api.getPosts()
        this.loading = false
      }

    },
    computed:{
      sortedPosts(){
        return this.posts.sort((a, b) => { return b.updatedAt.toString() > a.updatedAt.toString();});
      }
    }
  }
</script>
