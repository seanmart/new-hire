<template lang="html">
  <div id="__main" class="text-gray">
    <SiteHeader/>
    <Nuxt/>
  </div>
</template>

<script>
export default {
 
}
</script>

<style lang="css">

  html{
    font-size: 16px;
  }

  @media screen and (min-width:600px){
    html{
      font-size: calc(16px + ((100vw - 600px) * .005));
    }
  }

  html,
  body,
  #__nuxt,
  #__layout,
  #__main{
    height:100%;
    font-family: 'Nunito', sans-serif;
  }

  button,
  input{
    margin:0px;
  }

  .button,
  button,
  input{
    border-radius: 3px;
    padding:10px;
    display: inline-block;
  }

  .button,
  button{
    padding-left:20px;
    padding-right: 20px;
  }
  
</style>
