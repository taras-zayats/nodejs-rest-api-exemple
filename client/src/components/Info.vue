<template>
    <div class="row">
    <div class="col s6 offset-s3">
      <div class="card red accent-1 info">
        <div class="row s6 offset-s3">
        <span>email: {{email}}</span><br/>
        <span>username: {{username}}</span><br/>
        <span>bio: {{bio}}</span><br/>
        <a class=" right waves-effect waves-light btn-large exit" v-on:click="exit">Exit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Info',
  data () {
    return {
      email: '',
      username: '',
      bio: ''
    }
  },
  mounted: function () {
    this.info()
  },
  methods: {
    info: async function (event) {
      console.log(localStorage.token)
      const AuthStr = 'Bearer '.concat(localStorage.token)
      axios.get(`http://localhost:5000/users/${this.$route.params.id}`, { headers: { Authorization: AuthStr } }).then(response => {
        this.email = response.data.email
        this.username = response.data.username
        this.bio = response.data.bio
      }).catch(error => {
        alert(error.response.data.message)
        this.$router.push('/login')
      })
    },
    exit: async function (event) {
      localStorage.token = null
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info{
    padding: 50px;
}
.exit{
  margin: 20px;
}
</style>
