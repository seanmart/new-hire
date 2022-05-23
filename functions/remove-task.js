
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');

exports.handler = async function (event, context) {

  const {personId, taskId} = JSON.parse(event.body);

  try{

    let error = null
    let success = null

    let data = await base("Complete").select({
      filterByFormula: `AND({Person} = '${personId}', {Task} = '${taskId}')`
    }).all()

    if (Array.isArray(data)){
      await base('Complete').destroy(data[0].id,(err,record)=> {
        error = err;
        success = record
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ error,success }),
    };

  } catch(err){
    console.log(err)
    return {
      statusCode: 400, 
      body: JSON.stringify({ err })
    };
  }
}