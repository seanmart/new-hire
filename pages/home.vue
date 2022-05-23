<template>
  <Container class="bg-white" :loaded="!!user && !!tasks">
    <div class="max-w-3xl mx-auto p-10">

      <h1 class="text-4xl" v-if="user">
        <span>Hello,</span>
        <span class="whitespace-nowrap">{{user['First Name']}}</span>
      </h1>
      <div>
          <ListGroup 
          v-for="(group,a) in groupedTasks" 
          :key="a" :label="group.label">

              <ListItem 
              v-for="(task,b) in group.tasks" 
              :key="b" :data="task"/>

          </ListGroup>
      </div>

    </div>
  </Container>
</template>

<script>
  import { timingSafeEqual } from 'crypto'
import {mapState} from 'vuex'
  export default {
    async created(){
      if (process.server) return 

      if (this.$store.state.user){
        await this.$store.dispatch('GET_TASKS')
      } else {
        this.$router.push('/')
      }
    },
    computed:{ 
      ...mapState({
        user: state => state.user,
        tasks: state => state.tasks
      }),
      groupedTasks(){
        if (!this.tasks) return 
        
        let groups = {}
        let sorted = [...this.tasks].sort((a,b)=> (a.Group > b.Group) ? 1 : -1)
  
        sorted.forEach(task => {
          if(!groups[task.Group]) groups[task.Group] = []
          groups[task.Group].push(task)
        })

        return Object.keys(groups).map(key => {
          return {label:key,tasks: groups[key]}
        })
      }
    }
  }
</script>

<style>

</style>