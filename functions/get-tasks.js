
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');

exports.handler = async function (event, context) {

  let data = []
  const { id } = JSON.parse(event.body);

  try{

    const tasks = await base('Tasks').select().all()
    const completed = await base('Complete').select({filterByFormula: `({Person} = '${id}')`}).all()

    tasks.forEach(task => {
      isCompleted = completed.find(c => {
        return c.fields['Task'] == task.id
      })
      data.push({...task.fields, id: task.id, completed: !!isCompleted })
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };

  } catch(err){
    console.log(err)
    return {statusCode: 400};
  }
}