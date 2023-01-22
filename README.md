# MyFlix, a Netflix-ish personal project
This project was created as a way to sharpen my React/Typescript skills. The goal here is to mimic the Netflix experience, with a few minor differences which are determined by the free API that I'm using: https://www.themoviedb.org/

## TMDB Gotchas
Some of the decisions I've made based on tmdb's API:
- by default will return 20 movie titles per category
- To gather all the metadata to match what is displayed in Netflix (when a title is hovered) would require multiple API calls PER TITLE. To do so for each title in the visible window per carousel in MyFlix would affect performance, so I've decided to make it so the user needs to click for more details, reducing the number of calls
- TMDB's `poster_path` for each title is high resolution, and for now images will load a bit slower for the initial purposes of this project
- Netflix uses an infinite carousel, this will be saved for a future improvement/feature

## Basic Info
- React in Typescript
- SASS
- BEM naming convention for styles

## TODO
- UI styling
- remove unused components
- improve React Hooks usage

## Leftovers from Create React App
There are a few items that were included in the `create-react-app` boilerplate that are not part of this project and will eventually be removed, so please ignore:
- /src/feature/counter/*
- Redux

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
