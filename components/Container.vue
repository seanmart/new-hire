<template lang="html">
  <main class="flex flex-col pt-24" :class="screen ? 'h-full' : 'min-h-full' ">
    <div class="flex-auto">
      <slot/>
    </div>
    <SiteFooter/>
  </main>
</template>

<script>
export default {
  props:{
    screen: Boolean
  }
}
</script>
