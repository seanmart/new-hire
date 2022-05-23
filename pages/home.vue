<template>
  <Container class="bg-white">
    <div class="max-w-3xl mx-auto p-10">

      <h1 class="text-4xl">
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
    middleware({store,redirect}){
      if (!store.state.user) return redirect('/')
    },
    async asyncData({store}){
      await store.dispatch('GET_TASKS')
    },
    computed:{ 
      ...mapState({
        user: state => state.user || {},
        tasks: state => state.tasks || []
      }),
      groupedTasks(){
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