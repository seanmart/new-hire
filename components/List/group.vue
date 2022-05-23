<template>
  <div class="mt-10">
    <h3 class="text-2xl mb-2 font-bold" v-html="label"/>
    <slot/>
  </div>
</template>

<script>
  export default {
    props:{
      label:String
    }
  }
</script>

<style>

</style>