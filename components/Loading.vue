<template>
  <div v-if="spin" class="loader-spin w-10">
    <div v-for="i in 4" :key="i"/>
  </div>
  <div v-else class="loader-dots">
    <div v-for="i in 4" :key="i"/>
  </div>
</template>

<script>
  export default {
    props:{
      spin: Boolean
    }
  }
</script>

<style>
.loader-spin {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  opacity: .5;
}
.loader-spin div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid theme('colors.pink');
  border-radius: 50%;
  animation: loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: theme('colors.pink') transparent transparent transparent;
}
.loader-spin div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader-spin div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader-spin div:nth-child(3) {
  animation-delay: -0.15s;
}


.loader-dots {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader-dots div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: theme('colors.pink');
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-dots div:nth-child(1) {
  left: 8px;
  animation: loader-dots1 0.6s infinite;
}
.loader-dots div:nth-child(2) {
  left: 8px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(3) {
  left: 32px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(4) {
  left: 56px;
  animation: loader-dots3 0.6s infinite;
}
@keyframes loader-dots1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader-dots3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader-dots2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>