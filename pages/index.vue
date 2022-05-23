<template lang="html">
  <Container class="bg-orange" screen>
    <div class="h-full flex items-center justify-center">
      <Login/>
    </div>
  </Container>
</template>

<script>
export default {
  created(){
    if (process.server) return 
    if (this.$store.state.user) this.$store.dispatch('REMOVE_USER')
  }
}
</script>
