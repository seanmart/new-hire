
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appgG93eKy9cmhnzw');
const authKey = process.env.AUTH_KEY
const saltRounds = 9;
const bcrypt = require('bcryptjs')


exports.handler = async function (event, context) {

  const { email, password } = JSON.parse(event.body);
  let user = null
  let error = true

  if (password && email){

    console.log(password,email)

    const records = await base('People').select({
      filterByFormula: `AND({Email} = '${email}',{Active})`,
      maxRecords:1
    }).all()

    console.log(records)

    if(records.length > 0){

      let fields = records[0].fields
      let hash = fields['Password']

      let result = await bcrypt.compare(password,hash)

      if(result){
        let key = await bcrypt.hashSync(authKey, saltRounds)
        error = false
        user = {
          authKey: key,
          email: fields.Email,
          id: records[0].id,
          firstName: fields['First Name'],
          lastName: fields['Last Name'],
        }
      }
    }

  }

  return {
    statusCode: 200,
    body: JSON.stringify({ user,error }),
  };



}