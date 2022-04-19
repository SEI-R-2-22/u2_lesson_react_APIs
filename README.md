# React and APIs

![](https://madooei.github.io/cs421_sp20_homepage/assets/client-server-1.png)

## Overview

In this lesson, we'll be learning how to utilize 3rd party RESTful APIs within our react apps. We'll cover everything from installing necessary dependencies, setting up secret variables/environment variables and setting up files to better manage shared code.

## What We'll Be Building

![preview](images/preview.png)

## Getting Started

- `Fork` and `Clone`
- `cd` into this lab and `npm install`
- `npm start` to verify your setup steps

## Refresher

What is an API? An API is an application programming interface. APIs allow us to interact with 3rd party libraries and data sources in order to build applications. There are various kinds of APIs. The API we'll be using today is an example of a **RESTful** API. In other words, we request some kind of information from this external data source and it provides us, the `client` with some information as a response.

## Getting Credentials For Our API

The API we'll be using today is the `TMDB` API. It's an online movie database that gives us information about movies and tv shows.

This is API is a secured API, meaning that we need some kind of authorization token in order to request information from it.

Head over to this **[LINK](https://www.themoviedb.org/)** and sign up for an account.

Once you've signed up, log in to your account and select your profile on the top right and select settings. Navigate to the `API` section on the left hand side and follow the instructions provided.

Once you've successfully followed these steps, locate the `API Read Access Token`. We'll be using this token to interact with the API.

## Preparing Our App

Now that we have an access token, we can get started with setting up our app.

### Installing Axios

We'll need axios to perform our API requests. To install axios, run `npm install axios` in this directory.

### Setting Global Variables

We'll now set up some global variables for axios. The base url for the API will always be the same. The only thing that will change is the final endpoint for resources.

In the `src` directory, create a file called `globals.js`.

Add the following code to the file:

```js
export const BASE_URL = 'https://api.themoviedb.org/3'

export const POSTER_PATH = 'https://image.tmdb.org/t/p/original'
```

Our APIs base URL will never change so we'll store it in the `BASE_URL` variable. And finally, in order to view the provided images, we'll need the URL stored in the `POSTER_PATH` variable in order to complete the image URLs.

### Setting Up Our Environment Variables

Environment variables are pieces of information stored in a file that **SHOULD NOT** get pushed to GitHub. We store sensitive information like credentials or production app information here.

To set this up, create a `.env` file in the root directory of this lab. Once created, it should be on the same folder level as your `package.json`.

We'll now add an environment variable in the `.env` file. Add the following:

```sh
REACT_APP_TMDB_KEY=<Your secret token>
```

**Note: All react environment variables must be prepended with `REACT_APP`**

**Whenever you make a change to your `.env` file, you must restart your react server.**

Finally let's make sure our `.env` file stays a secret. Add `.env` to your `.gitignore`.

## Implementing Our API Calls

In your `App.js`, let's import axios:

```js
import axios from 'axios'
```

We'll use `axios` to make our API request.

Which hook should we use to invoke our request?

<details closed>
  <summary>Hint</summary>
   <code>useEffect()</code>
</details>

API requests should always be performed in the `componentDidMount()`. If we think back to the lifecycle of components, we know that `componentDidMount` fires once the component loads. Typically with external datasources, we'll want to load them when we reach a certain point in our application. In this case, we're going to set up our app to display a list of new movies on initial load.

In your `App.js` add and import `useEffect` to your component.

Next we'll import our global axios variables. Add the following to your `App.js`:

```js
import { BASE_URL } from './globals'
```

Notice the syntax here. We're using destructuring because when we exported these variables, they get exported as an object via `export const`. This is an ES6 feature, but only supported in babel environments.

Let's set up our `useEffect` to support `async` operations. Modify your `useEffect` to the following:

```js
useEffect(() => {
  async function getMovies() {}
  getMovies()
}, [])
```

Finally, let's add in our request:

```js
useEffect(() => {
  async function getMovies() {
    const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}`)
    console.log(res)
  }
  getMovies()
}, [])
```

The above code will make a request to the TMDB APIs `discover/movies` endpoint. This endpoint will return a list of new/popular movies.

Open your browser dev tools and take a look at the console message.

In which object does the movie data exist?

<details closed>
  <summary>Hint</summary>
   <code>res.data.results</code>
</details>

We'll take the results from our axios request and now store them in state. Add the following to your `useEffect`:

```js
useEffect(() => {
  async function getMovies() {
    const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}`)
    setMovies(res.data.results)
  }
  getMovies()
}, [])
```

This will store the results in our `movies` state.

Once the state get's updated, we can utilize that item in state to display our movies!

## Displaying Movies

Let's create a component to display our movies.

Create a `components` folder in the `src` directory.

In the newly created folder, create a `MovieList` component.

Set up your boilerplate for the component:

```js
const MovieList = (props) => {
  return (
    <div className="grid"></div>
  )
}
```

Import the `POSTER_PATH` variable into your `MovieList` component:

```js
import { POSTER_PATH } from '../globals'
```

Now we need a way to send some movies to this component.

How can we pass information from one component to another?

<details closed>
  <summary>Hint</summary>
   <code>props</code>
</details>

<br>
We'll pass our `movies` state to the `MovieList` component via `props`.

Head back to your `App.js` and import your `MovieList` component:

```js
import MovieList from './components/MovieList'
```

Finally display your `MovieList` in the `return` statement of `App.js`:

```jsx
  return (
    <div>
      <MovieList />
    </div>
  )
}
```

Let's pass our movies state to our `MovieList` component:

```jsx
<MovieList movies={movies} />
```

We're now set up to show off our movies!

Head over to your `MovieList` component.

How can we access the `movies` passed in as props?

<details closed>
  <summary>Hint</summary>
   <code>props.movies</code>
</details>
<br>

Which array method will allow us to display of the movie data?

<details closed>
  <summary>Hint</summary>
   <code>.map()</code>
</details>
<br>

Let's iterate through each movie to display some information. Add the following to your `MovieList` component:

```js
{
  props.movies.map((movie) => (
    <div key={movie.id} className="card">
      <img src={`${POSTER_PATH}${movie.backdrop_path}`} alt="poster" />
      <h3>{movie.title}</h3>
      <button>View Movie</button>
    </div>
  ))
}
```

Take a look at your browser, you should now have a grid displaying some movies!

![topgun](https://c.tenor.com/I-0Zyo9JDgkAAAAC/top-gun-tom-cruise.gif)

## You Do

Seeing some movies is all fine and good, however seeing details is much more valuable!

[TMDB API Docs](https://developers.themoviedb.org/3/getting-started/introduction)

- Create a `MovieDetails` component
- In that component, create some state for `movieDetails`
- Still in `MovieDetails`, utilizing `axios`, make a request to the following endpoint: `${BASE_URL}/movie/<the selected movies ID>`
- In your `App.js`, create a function that accepts a `movieId` as a parameter and sets that `movieId` to the `selectedMovie` state.
- Pass the above function to your `MovieList` component as a prop and have the `button` invoke this function `onClick`. You'll want to pass the movie id to this function. **Hint: Use the callback syntax!**
- Pass the `selectedMovie` state to the `MovieDetails` component and watch it in a `useEffect`. Remember you can watch `props` in the dependency array!
- Finally display the details for the selected movie in your `MovieDetails`.

## Bonus

Build functionality to toggle which component is being displayed based on whether the `selectedMovie` state is `null` or populated.

**Hint**: Use `conditional rendering`!

Add some pagination!

## Recap

In this lesson, we covered the basics of integrating React and 3rd party APIs. We learned how to keep our code reusable and maintainable by using globals.

## Resources

- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Axios](https://github.com/axios/axios)
- [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
