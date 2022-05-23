<template lang="html">
  <Container class="bg-orange" screen>
    <div class="h-full flex items-center justify-center">
      <Login/>
    </div>
  </Container>
</template>

<script>
export default {
  middleware({store,redirect}){
    if (store.state.user) store.dispatch('REMOVE_USER')
  }
}
</script>
