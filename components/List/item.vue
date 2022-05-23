<template>
  <div 
  class="rounded shadow px-5 mb-1 border border-shade-200 flex items-center min-h-4 cursor-pointer relative" 
  :class="{'bg-fuchsia-50 border-fuchsia-300 text-fuchsia-800':data.completed}">

    <button class="absolute inset-0 z-10" @click="handleClick"/>

      <div class="mr-3 w-10 p-0 flex items-center justify-center relative">

        <Loading spin v-if="busy"/>

        <svg v-else-if="data.completed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="fill-fuchsia block w-full">
          <path d="M226.3,97.3c-3.9-3.9-7.1-11.6-7.1-17.2V56.9c0-11.1-9-20.1-20.1-20.1h-23.3c-5.5,0-13.3-3.2-17.2-7.1l-16.5-16.5   c-7.8-7.8-20.6-7.8-28.4,0L97.3,29.7c-3.9,3.9-11.6,7.1-17.2,7.1H56.9c-11.1,0-20.1,9-20.1,20.1v23.3c0,5.5-3.2,13.3-7.1,17.2   l-16.5,16.5c-7.8,7.8-7.8,20.6,0,28.4l16.5,16.5c3.9,3.9,7.1,11.6,7.1,17.2v23.3c0,11.1,9.1,20.1,20.1,20.1h23.3   c5.5,0,13.3,3.2,17.2,7.1l16.5,16.5c7.8,7.8,20.6,7.8,28.4,0l16.5-16.5c3.9-3.9,11.6-7.1,17.2-7.1h23.3c11.1,0,20.1-9.1,20.1-20.1   v-23.3c0-5.5,3.2-13.3,7.1-17.2l16.5-16.5c7.8-7.8,7.8-20.6,0-28.4L226.3,97.3z M189.9,98.5l-81.2,81.2c-0.3,0.3-0.7,0.4-1.1,0.4   c0,0,0,0,0,0c-0.4,0-0.8-0.2-1.1-0.4L66.1,139c-0.3-0.3-0.4-0.7-0.4-1.1c0-0.4,0.2-0.8,0.4-1.1l20.3-20c0.6-0.6,1.5-0.6,2.1,0   l19.4,18.1l59.7-58.6c0.6-0.6,1.5-0.6,2.1,0l20.3,20c0.3,0.3,0.4,0.7,0.4,1.1S190.2,98.2,189.9,98.5z"/>
        </svg>

        <div v-else class="h-8 w-8 border-2 border-shade-300 rounded"/>

      </div>

      <h5 class="text-lg" v-html="data.Task" />

      <a 
      v-if="!data.completed" 
      :href="data.Link" 
      target="_blank" 
      class="relative z-20 ml-auto button bg-pink text-white" 
      v-html="'Link'"/>

  </div>
</template>

<script>

  export default {
    props:{
      data:{type:Object,default:()=>({})}
    },
    data:()=>({
      busy: false
    }),
    methods:{
      async handleClick(){
        if (this.busy) return
        this.busy = true

        let next = !this.data.completed
        let start = Date.now()
        let delay = 250
        let res = await this.$store.dispatch('TOGGLE_TASK',{id:this.data.id,add:next})
        let end = Date.now()

        if(res){

            setTimeout(()=>{
              this.$store.commit('UPDATE_TASK',[this.data.index,next])
              this.busy = false
            },Math.max(delay - (end - start),0))

        } else {
          this.$nuxt.error({ statusCode: 404 })
        }

      }
    }
  }
</script>

<style>

</style>