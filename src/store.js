const uuid = require('uuid/v4')

const bookmarks = [
  { id: uuid(),
    title: 'Testing 1',
    url: 'https://www.testtest.com',
    description: 'Testing...',
    rating: 5 },
  { id: uuid(),
    title: 'Testing 2',
    url: 'https://www.test.com',
    description: 'Everything is testing...',
    rating: 4 },
]

module.exports = { bookmarks }