<template lang="html">
  <main class="flex flex-col pt-24" :class="screen ? 'h-full' : 'min-h-full' ">
    <div v-if="loaded" class="flex-auto" :class="{'flex items-center justify-center': center}">
      <slot/>
    </div>
    <div v-else class="flex-auto flex items-center justify-center">
      <Loading/>
    </div>
    <SiteFooter/>
  </main>
</template>

<script>
export default {
  props:{
    screen: {type:Boolean,default: false},
    center: {type:Boolean,default: false},
    loaded: {type:Boolean,default: true}
  },
  async created(){
    if (process.server) return 
    console.log(this.$route.query.token)
  }
}
</script>
