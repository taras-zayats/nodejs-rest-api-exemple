<template>
  <div>
    <div class="row">
    <div class="col s6 offset-s3">
      <div class="card red accent-1">
        <div class="row s6 offset-s3">
            <form class="row" id="login">
                <div class="input-field">
                <input placeholder="Your email" id="email" type="email" class="validate" name="email" v-model="email">
                 </div>
                <div class="input-field">
                <input placeholder="Your username" id="username" type="text" class="validate" name="username" v-model="username">
                 </div>
                 <div class="input-field">
                <input placeholder="Your bio" id="bio" type="text" class="validate" name="bio" v-model="bio">
                 </div>
                <div class="input-field">
                <input  placeholder="password" id="password" type="password" class="validate" name="password" v-model="password">
                </div>
                <div class="input-field">
                <input  placeholder="password" id="password_two" type="password" class="validate" name="password_two" v-model="password_two">
                </div>
             <a class=" right waves-effect waves-light btn-large" v-on:click="singup">SingUp</a>
             <a class=" left waves-effect waves-light btn-large" v-on:click="login">Go to login page</a>
            </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Singup',
  data () {
    return {
      email: '',
      username: ' ',
      bio: ' ',
      password: '',
      password_two: ''
    }
  },
  methods: {
    singup: async function (event) {
      if (this.password !== this.password_two) {
        alert('Passwords are not the same')
        return 0
      }
      axios.post('http://localhost:5000/users/signup', {
        email: this.email,
        username: this.username,
        bio: this.bio,
        password: this.password
      }).then(response => {
        if (response.status === 201) {
          localStorage.token = response.data.token
          this.$router.push(`/${response.data.id}`)
        }
      }).catch(error => {
        alert(error.response.data.message)
      })
    },
    login: async function (event) {
      this.$router.push(`/login`)
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
