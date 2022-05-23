
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');

exports.handler = async function (event, context) {

  const {personId, taskId } = JSON.parse(event.body);

  let entry = {
    "Person":personId,
    "Task": taskId,
    "Person ID":[personId],
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

  let {error,success} = await addData()

  return {
    statusCode: 200,
    body: JSON.stringify({ error,success }),
  };

}