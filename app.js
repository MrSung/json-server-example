const fetch = require('node-fetch')
const debug = require('debug')('json-server')

const getMoviesNames = movies => movies.map(movie => movie.name)
const getFruitsNames = fruits => fruits.map(fruit => fruit.name)

// With callbacks
function getMovies (callback) {
  return fetch('http://localhost:3000/movies')
    .then(res => res.json())
    .then(json => {
      const movieNames = getMoviesNames(json.movies)
      debug('Movie names with callback:', movieNames)
      callback()
    })
    .catch(error => {
      debug(error)
    })
}

function getFruits () {
  return fetch('http://localhost:3000/fruits')
    .then(res => res.json())
    .then(json => {
      const fruitNames = getFruitsNames(json.fruits)
      debug('Fruit names with callback:', fruitNames)
    })
    .catch(error => {
      debug(error)
    })
}

getMovies(() => {
  getFruits()
})

// With promises
function getMoviesPromise () {
  return new Promise((resolve, reject) => {
    return fetch('http://localhost:3000/movies')
      .then(res => res.json())
      .then(json => {
        const movieNames = getMoviesNames(json.movies)
        resolve(movieNames)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function getFruits2 () {
  return fetch('http://localhost:3000/fruits')
    .then(res => res.json())
    .then(json => {
      const fruitNames = getFruitsNames(json.fruits)
      return fruitNames
    })
    .catch(error => {
      debug(error)
    })
}

getMoviesPromise()
  .then(movies => debug('Movie names with promises:', movies))
  .then(getFruits2)
  .then(fruits => debug('Fruit names with promises:', fruits))

// With `Promise.all()`
function getFruitsPromise () {
  return new Promise((resolve, reject) => {
    return fetch('http://localhost:3000/fruits')
      .then(res => res.json())
      .then(json => {
        const fruitNames = getFruitsNames(json.fruits)
        resolve(fruitNames)
      })
      .catch(error => {
        debug(error)
      })
  })
}

const promises = [
  getMoviesPromise(),
  getFruitsPromise()
]
const combinedPromises = Promise.all(promises)

combinedPromises.then(outcomes => {
  debug('1st out come with Promise.all():', outcomes[0])
  debug('2nd out come with Promise.all():', outcomes[1])
})

// With async/await
async function getEverything () {
  const moviesJson = await fetch('http://localhost:3000/movies')
    .then(res => res.json())
  const fruitsJson = await fetch('http://localhost:3000/fruits')
    .then(res => res.json())

  debug('Movie names with async/await:', getMoviesNames(moviesJson.movies))
  debug('Fruit names with async/await:', getFruitsNames(fruitsJson.fruits))
}

getEverything()
