
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');

exports.handler = async function (event, context) {

  let user = null
  const { email } = JSON.parse(event.body);

  try{

    const records = await base('People').select({
      filterByFormula: `AND({Email} = '${email}',{Active})`,
      maxRecords:1
    }).all()
  
    if(records.length > 0){
      user = {...records[0].fields,id: records[0].id}
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify({ user }),
    };

  } catch(err){
    return {statusCode: 400, body:JSON.stringify({ err })};
  }

}