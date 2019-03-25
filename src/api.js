import Vue from 'vue'
import axios from 'axios'
const client = axios.create({
  baseURL: '/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request

    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
  //到了这一步data已经储存了post list
      return req.data
    })
  },
  getPosts () {
    return this.execute('get', '/api/posts')
  },
  // getPost (id) {
  //   return this.execute('get', `/api/posts/${id}`)
  // },
  createPost (data) {
    return this.execute('post', '/api/posts', data)
  },
  updatePost (id, data) {
    return this.execute('put', `/api/posts/${id}`, data)
  },
  deletePost (id) {
    return this.execute('delete', `/api/posts/${id}`)
  },


  getStudentResults() {
    return this.execute('get', '/api/webtexts')
  },
  updateStudentResult(id, data) {
    return this.execute('put', `/api/webtexts/${id}`, data)
  },
  // getWebStudentResult (id) {
  //   return this.execute('get', `/api/webtexts/${id}`)
  // },
  // createStudentResult (data) {
  //   return this.execute('post', '/api/webtexts', data)
  // },
  // deleteStudentResult (id) {
  //   return this.execute('delete', `/api/webtexts/${id}`)
  // },


  getCourses () {
    return this.execute('get', '/api/webtexts1')
  },
  updateCourse (id, data) {
    return this.execute('put', `/api/webtexts1/${id}`, data)
  },
  // getCourse (id) {
  //   return this.execute('get', `/api/webtexts1/${id}`)
  // },
  createCourse (data) {
    return this.execute('post', '/api/webtexts1', data)
  },

  // deleteCrouse (id) {
  //   return this.execute('delete', `/api/webtexts1/${id}`)
  // },


  getWorkshops(){
    return this.execute('get', '/api/workshops')
  },
  updateWorkshop(id, data) {
    return this.execute('put', `/api/workshops/${id}`, data)
  },
  getWorkshop(id) {
    return this.execute('get', `/api/workshops/${id}`)
  },
  createWorkshop (data) {
    return this.execute('post', '/api/workshops', data)
  },
  deleteWorkshop (id) {
    return this.execute('delete', `/api/workshops/${id}`)
  }

}
