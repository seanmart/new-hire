<template lang="html">
  <main class="flex flex-col pt-24" :class="screen ? 'h-full' : 'min-h-full' ">
    <div v-if="loaded" class="flex-auto">
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
    screen: Boolean,
    loaded: {type:Boolean,default: true}
  }
}
</script>
