
let Airtable = require('airtable');
let base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');


exports.handler = async function (event, context) {

  const { email } = JSON.parse(event.body);
  
  let user = null
  let error = true

  const records = await base('People').select({
    filterByFormula: `AND({Email} = '${email}',{Active})`,
    maxRecords:1
  }).all()

  if(records.length > 0){
    user = {...records[0].fields,id: records[0].id}
    error = false
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ user,error }),
  };



}