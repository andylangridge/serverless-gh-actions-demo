
export const  handler = async (event) => {
  let name = 'Andy'
  let city = 'London'
  let time = 'day'
  let day = ''

  console.log('request: ' + JSON.stringify(event))
  
  if (event.body) {
    const body = JSON.parse(event.body)

    if (body.name) {
      name = body.name
      console.log('Received name: ' + name)
    }
  
    if (body.city) {
        city = body.city
        console.log('Received city: ' + city)
    }
  
    if (body.day) {
        day = body.day
        console.log('Received day: ' + day)
    }

    if (body.time) {
      time = body.time
      console.log('Received time: ' + time)
    }
  }

  let greeting = `Good ${time}, ${name} of ${city}.`
  if (day) greeting += ` Happy ${day}!`

  let responseBody = {
      message: greeting,
      input: event
  }
  
  let response = {
      statusCode: 200,
      body: responseBody
  }

  console.log('response: ' + JSON.stringify(response))

  return response
}
