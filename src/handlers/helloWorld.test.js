import { handler } from './helloWorld'
import event from '../../events/event-hello.json'

test('add day to greeting message', async () => {
  const response = await handler(event)
  expect(response.body.message).toEqual('Good day, Andy of London. Happy Tuesday!')
})
