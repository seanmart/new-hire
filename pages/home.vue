<template>
  <Container class="bg-white" :loaded="!!tasks">
    <div class="max-w-3xl mx-auto p-10">

      <h1 class="text-4xl" v-if="name">
        <span>Hello,</span>
        <span class="whitespace-nowrap"> {{name}}</span>
      </h1>
      <div>
          <ListGroup 
          v-for="(group,a) in tasks" 
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

  export default {
    async created(){
      if (process.server) return 

      let user = this.$cookiz.get('user')
      if (user){
        await this.$store.dispatch('GET_TASKS')
      } else {
        this.$router.push('/')
      }
    },
    computed:{ 
      tasks(){
        let tasks = this.$store.state.tasks
        if (!tasks) return null

        let groups = {}
  
        tasks.forEach(task => {
          if(!groups[task.Group]) groups[task.Group] = []
          groups[task.Group].push(task)
        })

        return Object.keys(groups).map(key => {
          return {label:key,tasks: groups[key]}
        })
      },
      name(){
        let user = this.$cookiz.get('user')
        if (user) return user['First Name']
        return null
      }
    }
  }
</script>

<style>

</style>