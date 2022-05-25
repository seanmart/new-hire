<template>
  <Container class="bg-white" :loaded="render && !!tasks">
    <div class="max-w-3xl mx-auto py-10 sm:px-5">

      <h1 class="text-4xl text-center" v-if="name">
        <span>Welcome,</span>
        <span class="whitespace-nowrap"> {{name}}!</span>
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
        this.render = true
      } else {
        this.$router.push('/')
      }
    },
    data:()=>({
      render: false
    }),
    computed:{ 
      tasks(){
        let tasks = this.$store.state.tasks
        let groups = {}

        if (!tasks) return null

        let sorted = [...tasks].sort((a,b)=> {
          return a.Group < b.Group ? -1 : 1
          })
  
        sorted.forEach(task => {
          if(!groups[task.Group]) groups[task.Group] = []
          groups[task.Group].push(task)
        })

        return Object.keys(groups).map(key => {
          return {label:key,tasks: groups[key]}
        })
      },
      name(){
        let user = this.$cookiz.get('user')
        if (user) return user.firstName
        return null
      }
    }
  }
</script>

<style>

</style>