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

@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,300;1,400&display=swap');

  html{
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
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
    font-weight: bold;
  }
  
</style>
