export const initialValues = {
  color: '096dd9',
  daysOfEatingKeto: 25,
  phoneNumber: '(828) 281-8121',
  name: 'Eric Shelley',
  message: 'Ham and cheese sounds good right now.',
  getContacts: async value => {
    let response = {
      data: [
        { id: 1, name: 'bobby', email: 'bobby@gmail.com' },
        { id: 2, name: 'brad', email: 'brad@gmail.com' },
        { id: 3, name: 'eric', email: 'eric@gmail.com' },
        { id: 4, name: 'joe', email: 'joe@gmail.com' },
        { id: 5, name: 'sam', email: 'sam@gmail.com' },
        { id: 6, name: 'tom', email: 'tom@gmail.com' },
        { id: 6, name: 'example', email: 'example@gmail.com' },
        { id: 6, name: 'hello', email: 'hello@gmail.com' },
        { id: 6, name: 'kevin', email: 'kevin@gmail.com' },
        { id: 6, name: 'josh', email: 'josh@gmail.com' },
        { id: 6, name: 'jordan', email: 'jordan@gmail.com' },
        { id: 6, name: 'vanessa', email: 'vanessa@gmail.com' },
        { id: 6, name: 'ashley', email: 'ashley@gmail.com' },
        { id: 6, name: 'ace', email: 'ace@gmail.com' },
        { id: 6, name: 'rusty', email: 'rusty@gmail.com' },
      ],
      status: 200,
    }
    if (value) {
      response.data = response.data.filter(val => val.name.includes(value.s))
    }
    return response
  },
}
