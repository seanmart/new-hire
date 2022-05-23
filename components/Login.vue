<template lang="html">
  <div class="max-w-xs">

    <div class="text-center mb-10">
      <h1 class="text-5xl mb-3">Welcome!</h1>
      <p>Please enter your email address to begin or continue your new hire experience</p>
    </div>

    <div class="min-h-3">

      <div v-if="busy" class="flex items-center justify-center" >
        <Loading spin/>
      </div>

      <form v-else class="login-form flex items-center justify-center" @submit="handleSubmit" :class="{error}">
        <button class="bg-pink text-white" type="submit">Submit</button>
        <input class="w-60 max-w-full" type="text" name="email" required v-model="email" :pattern="pattern" placeholder="Email">
      </form>

    </div>

  </div>
</template>

<script>
export default {
  data:()=>({
    busy:false,
    error:false,
    email:null,
    pattern: "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
  }),
  methods:{
    async handleSubmit(e){
      e.preventDefault()
      this.busy = true
      this.error = false
      let user = await this.$store.dispatch('GET_USER',this.email)
      
      if(user){
        this.$router.push('/home')
      } else {
        this.email = null
        this.busy = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="css">
.login-form button{
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.login-form input{
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.login-form.error{
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes shake {
  0%, 100% {
    transform: translate3d(0px, 0, 0);
  }
  40%, 80% {
    transform: translate3d(-4px, 0, 0);
  }
  20%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
