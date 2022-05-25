<template lang="html">
  <header class="absolute sm:fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div class="flex items-center sm:justify-center px-7 h-20">

        <div class="">
          <!-- <SiteLogo class="w-48"/> -->
          <h3 class="text-lg font-bold">Client Logo</h3>
        </div>

        <div class="absolute top-0 right-0 bottom-0 pr-7 flex items-center">
          <nuxt-link class="button hover:bg-fuchsia-100 hover:text-fuchsia-600" to="/">Logout</nuxt-link>
        </div>
        
      </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  
}
</script>
