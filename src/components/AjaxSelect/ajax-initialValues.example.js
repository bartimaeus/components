export const api = {
  getContacts: async value => {
    const moreData = [
      { name: 'josh', email: 'josh@gmail.com' },
      { name: 'jordan', email: 'jordan@gmail.com' },
      { name: 'vanessa', email: 'vanessa@gmail.com' },
      { name: 'ashley', email: 'ashley@gmail.com' },
      { name: 'ace', email: 'ace@gmail.com' },
      { name: 'rusty', email: 'rusty@gmail.com' },
    ]
    let response = {
      data: [
        { name: 'bobby', email: 'bobby@gmail.com' },
        { name: 'brad', email: 'brad@gmail.com' },
        { name: 'eric', email: 'eric@gmail.com' },
        { name: 'joe', email: 'joe@gmail.com' },
        { name: 'sam', email: 'sam@gmail.com' },
        { name: 'tom', email: 'tom@gmail.com' },
        { name: 'example', email: 'example@gmail.com' },
        { name: 'hello', email: 'hello@gmail.com' },
        { name: 'kevin', email: 'kevin@gmail.com' },
      ],
      status: 200,
    }
    if (value && value.page > 1) {
      response.data = response.data.concat(moreData)
    }
    if (value && value.s) {
      response.data = response.data.filter(val => val.name.includes(value.s))
    }
    return response
  },
}

export const initialValues = {
  onChange: () => {},
  value: '',
}
