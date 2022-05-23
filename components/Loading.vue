<template>
  <div class="lds-ring w-10">
    <div v-for="i in 4" :key="i"/>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  opacity: .5;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid theme('colors.gray');
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: theme('colors.gray') transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>