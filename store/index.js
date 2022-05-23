export default{
  state:()=>({
    user:null,
    tasks:[]
  }),
  mutations:{
    USER:(state,user)=> state.user = user,
    TASKS:(state,tasks)=> state.tasks = tasks
  },
  actions:{
    async GET_USER({dispatch},email){
      
      let res = await fetch('/.netlify/functions/get-user',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      if(res && res.ok){
        let data = await res.json()
        dispatch('SET_USER',data.user)
      }

    },
    async GET_TASKS({state,commit}){ 

      if (!state.user) return
      
      let res = await fetch(`${this.$config.baseUrl}/.netlify/functions/get-tasks`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: state.user.id })
      })

      if (res){
        let data = await res.json()
        commit('TASKS',data.data)
      }

    },
    async TOGGLE_TASK({state,commit},{id,add}){

      if (!state.user) return false

      let path = add ? 'add-task' : 'remove-task'

      let res = await fetch(`/.netlify/functions/${path}`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          personId: state.user.id, 
          taskId: id
        })
      })

      let {success,error} = await res.json()

      return {success,error}

    },
    SET_USER({commit},user){
      this.$cookiz.set('user',JSON.stringify(user))
      commit('USER',user)
    },
    REMOVE_USER({commit}){
      this.$cookiz.remove('user')
      commit('USER',null)
    },
    nuxtServerInit({commit}){
      let user = this.$cookiz.get('user')
      user && commit('USER',user)
    }
  }
}