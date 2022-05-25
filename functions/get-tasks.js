
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');
var cookie = require('cookie')

exports.handler = async function (event, context) {

  const cookies = cookie.parse(event.headers.cookie)
  const user = cookies.user ? JSON.parse(cookies.user) : null

  let data = []
  let error = true

  if (user){

    const tasks = await base('Tasks').select().all()
    const completed = await base('Complete').select({filterByFormula: `({Person} = '${user.id}')`}).all()

    if (Array.isArray(tasks)){

      error = false

      tasks.forEach(task => {
        isCompleted = completed.find(c => {
          return c.fields['Task'] == task.id
        })
        data.push({...task.fields, id: task.id, completed: !!isCompleted })
      })

    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data, error }),
  };

}