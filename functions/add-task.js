
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');

exports.handler = async function (event, context) {

  const {personId, taskId } = JSON.parse(event.body);

  try{

    let error = null
    let success = null
    
    let entry = {
      "Person":personId,
      "Task": taskId,
      "Person ID":[personId],
      "Task ID":[taskId],
      "Timestamp": Date.now()
    }
    
    base('Complete').create(entry,(err,record)=> {
      error = err 
      success = record
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ error,success }),
    };

  } catch(err){
    console.log(err)
    return {
      statusCode: 400,
      body:JSON.stringify({ err })
    };
  }
}