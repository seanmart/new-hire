
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');
var cookie = require('cookie')

exports.handler = async function (event, context) {

  const {taskId} = JSON.parse(event.body);
  const cookies = cookie.parse(event.headers.cookie)
  const user = cookies.user ? JSON.parse(cookies.user) : null

  let error = true
  let success = null

  if (user){

    let data = await base("Complete").select({
      filterByFormula: `AND({Person} = '${user.id}', {Task} = '${taskId}')`
    }).all()

    if (Array.isArray(data)){

      async function removeData(){
        return new Promise((done)=>{
          base('Complete').destroy(data[0].id,(error,success)=> done({error,success}))
        })
      }

      let res = await removeData()
      success = res.success 
      error = !!res.error
      
    }

  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success,error}),
  };
}