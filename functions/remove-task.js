
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');

exports.handler = async function (event, context) {

  const {personId, taskId} = JSON.parse(event.body);
  
  let error = 'not found'
  let success = null

  let data = await base("Complete").select({
    filterByFormula: `AND({Person} = '${personId}', {Task} = '${taskId}')`
  }).all()

  if (Array.isArray(data)){

    async function removeData(){
      return new Promise((done)=>{
        base('Complete').destroy(data[0].id,(error,success)=> done({error,success}))
      })
    }

    let res = await removeData()
    success = res.success 
    error = res.error
    
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success,error }),
  };
}