### Pinblog is a simple app for saving/pinning blogs you like and creating your blog collection.
The app consists of a node express server that resides at the root of the repository and a frontend React app in the client folder. Pinblog is deployed on Heroku with a deployment pipeline defined in the .github folder.
The app is available here: [https://pinblog42.herokuapp.com](https://pinblog42.herokuapp.com)

### Commands

Start the app by running `npm install` inside the project folder.

inside the root folder (server part), you can: <br>
`npm start` to run the server in production mode <br>
`npm run dev` to run the server in development, nodemon mode <br>
`npm run test` to run the server in the test environment <br>
`npm run eslint` to run linter <br>
`npm run start:unit` to run unit tests in server <br>
`npm run start:e2e` to run cypress tests <br>

inside client folder: <br>
`npm start` to run the app in the development mode <br>
`npm run build` to make a production build <br>
`npm test` to run tests <br>
`npm run eslint` to run linter <br>
`npm run cypress:open` to run cypress tests in a browser <br>
`npm run cypress:run` to run cypress tests in console <br>
`npm run eject` to eject predefined build tool and configuration choices by create-react-app **(one-way operation, you can't go back!)** <br>
