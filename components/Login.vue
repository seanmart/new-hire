<template lang="html">
  <div class="max-w-xs">

    <div class="text-center mb-10">
      <h1 class="text-5xl mb-3">Welcome!</h1>
      <p>Please login to begin.</p>
    </div>

    <div class="min-h-3">

      <div v-if="busy" class="flex items-center justify-center" >
        <Loading spin/>
      </div>

      <form v-else class="login-form flex flex-col items-center" autocomplete="false" @submit="handleSubmit" :class="{error}">
        <input class="w-72 max-w-full" type="email" name="email" v-model="email" placeholder="Email">
        <input class="w-72 max-w-full mt-1" type="password" name="password" required v-model="password" placeholder="Password">
        <button class="bg-pink text-white mt-5" type="submit">Submit</button>
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
    password:null,
    pattern: `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$`
  }),
  methods:{
    async handleSubmit(e){
      e.preventDefault()
      this.busy = true
      this.error = false
      let user = await this.$store.dispatch('GET_USER',{email:this.email,password:this.password})
      
      if(user){
        this.$router.push('/home')
      } else {
        this.busy = false
        this.password = null
        this.error = true
      }
    }
  }
}
</script>

<style lang="css">
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
