# My 2nd React project

![touhutassut_screenshot_060519](https://user-images.githubusercontent.com/19979333/57236251-4c73af80-702d-11e9-9b2e-e09c9c3a9f81.jpg)

## About this project

This is a single-page app developed with React. The app is a site for an imaginary dog club that is going to organize an agility competition. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Features

- The app contains two "pages": a home page and a page for entering the competition ("Ilmoittautuminen").
- On smaller screens there is a hamburger menu.
- The app scales to any size screen.

#### Home page
- On top of the page there is a large hero image with a text.
- The user can determine the right competition class.

#### Ilmoittautuminen
- The user can add a new participant via the signup form. Only participants with a valid handler name, dog name and e-mail address are added.
- There are two lists of participants. Each list contains 5 random participants. Handler names, e-mail addresses and dog names are fetched from two different APIs, and IDs are generated with a library.
- The user can edit any list row by clicking on an icon.
- The user can delete any list row by clicking on an icon.
- The user can sort the lists by clicking on any column header.

### Structure
index.js  
- App.js  
  - Header.js  
  - Home.js  
    - DetermineClass.js  
      - DisplayAnswer.js  
  - Participants.js  
    - AddNewItem.js    
    - List.js  
      - ListItem.js  
        - ListItemDesktop.js  
        - ListItemMobile.js  
  - Footer.js  

### The developer

Sini Pauliina Kolehmainen  
kolehmainen.sini@outlook.com  
https://www.sinipauliina.com (only in Finnish)  

I developed this app because I wanted to become a better React developer.

## Installation and running the app

1. Make sure you have Node 8.10.0 or later on your local development machine.
2. Download this app from GitHub.
3. On command line go to the project directory.
4. Run the app: `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [Create React App: Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Create React App: Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Create React App: Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Create React App: Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Create React App: Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Create React App: `npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
