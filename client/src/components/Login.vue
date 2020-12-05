<template>
    <div class="row">
    <div class="col s6 offset-s3">
      <div class="card red accent-1">
        <div class="row s6 offset-s3">
            <form class="row" id="login">
                <div class="input-field">
                <input placeholder="Your email" id="email" type="email" class="validate" name="email" v-model="email">
                 </div>
                <div class="input-field">
                <input  placeholder="password" id="password" type="password" class="validate" name="password" v-model="password">
                </div>
              <a class=" right waves-effect waves-light btn-large" v-on:click="login">Login</a>
              <a class=" left waves-effect waves-light btn-large" v-on:click="register">go to register page</a>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: async function (event) {
      axios.post('http://localhost:5000/users/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        if (response.status === 200) {
          localStorage.token = response.data.token
          this.$router.push(`/${response.data.id}`)
        }
      }).catch(error => {
        alert(error.response.data.message)
      })
    },
    register: async function (event) {
      this.$router.push(`/`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login{
    padding: 50px;
}
</style>
