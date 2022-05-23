<template lang="html">
  <Container class="bg-orange" screen center>
      <Login/>
  </Container>
</template>

<script>
export default {
  created(){
    if (process.server) return
    let user = this.$cookiz.get('user') 
    if (user) this.$store.dispatch('REMOVE_USER')
  }
}
</script>
