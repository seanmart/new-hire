
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');
var cookie = require('cookie')

exports.handler = async function (event, context) {

  const {taskId} = JSON.parse(event.body);
  const cookies = cookie.parse(event.headers.cookie)
  const user = cookies.user ? JSON.parse(cookies.user) : null

  let success = null 
  let error = true

  if (user){
    
    let entry = {
      "Person":user.id,
      "Task": taskId,
      "Person ID":[user.id],
      "Task ID":[taskId],
      "Timestamp": Date.now()
    }
  
    async function addData(){
      return new Promise((done)=>{
        base('Complete').create(entry,(error,success)=> {
          done({error,success})
        })
      })
    }
  
    let res = await addData()
    success = res.success 
    error = !!res.error

  }
  
    return {
      statusCode: 200,
      body: JSON.stringify({ error,success }),
    };



}