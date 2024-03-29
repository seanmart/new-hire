export default{
  state:()=>({
    user:null,
    tasks:null
  }),
  mutations:{
    USER:(state,user)=> state.user = user,
    TASKS:(state,tasks)=> state.tasks = tasks,
    UPDATE_TASK:(state,[index, value]) => state.tasks[index].completed = value
  },
  actions:{
    async GET_USER({dispatch,commit},credentials){
      
      let res = await fetch('/.netlify/functions/get-user',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      })

      if(res.ok){
        let {user,error} = await res.json()
        if (!error){
          dispatch('SET_USER',user)
          return user
        }
      }

      return null

    },
    async GET_TASKS({state,commit}){ 
      
      let res = await fetch(`${this.$config.baseUrl}/.netlify/functions/get-tasks`)

      if(res.ok){
        let {data,error} = await res.json()
        if (!error){
          commit('TASKS',data.map((task,i) => ({...task,index: i})))
          return
        }
      }

      this.$nuxt.error({ statusCode: 404 })

    },
    async TOGGLE_TASK({state,commit},{id,add}){

      let path = add ? 'add-task' : 'remove-task'

      let res = await fetch(`/.netlify/functions/${path}`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: id})
      })

      if (res.ok){
        let {success,error} = await res.json()
        if(!error) return success
      }

      this.$nuxt.error({ statusCode: 404 })

    },
    SET_USER({commit},user){
      this.$cookiz.set('user',user)
    },
    REMOVE_USER({commit}){
      this.$cookiz.remove('user')
    }
  }
}