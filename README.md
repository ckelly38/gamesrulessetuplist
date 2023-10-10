# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Setup of this Program before use:
You must have JSON-SERVER RUNNING and connect to it on the same computer.
You must have JSON-SERVER installed and have NODE.JS installed on the same computer to run this application.

To run JSON-SERVER use: json-server --watch db.json

To run the program run: npm start

## Using This Program
DEAR USER my progam is informative. It tells you rules and requirements about a list of games.

As an admin, you can add a game, and also edit games. You can save your changes to the server or not. Despite it appearing to have multiple tabs/pages this is a(n) SPA (Single Page Application) that uses React Router.

### Home Page
Starting at the Home page, you see a list of games. If you click on one of the links below the name of each game, then it will take you to the page and only show that game's information for the page you requested.

### Stats Page
The Stats page, shows basic requirements of the game. As well as normal playing length.

### Rules And Strategies Page
The Rules And Strategies page, show the rules and strategies for the game. By default, it does not show them. It does have a dropdown that lets you see what you want.

### Game Setup Page
The Setup page lets you view how the game is supposed to look like when it is played to give you an idea.

### NAVBAR Usage
If you click the links above, in the NavBar, then it will load information for ALL of the games.

### THE EDITOR
The editor is there to fix problems like type-os and to add styling information to the rules and the image description if you so choose.

The editor itself looks similar to WORD... in that you can choose the FONT NAME, FONT SIZE, FONT COLOR, if something is BOLD, UNDERLINED, OR ITALICS.

The editor does not have all possible known fonts or colors. As a result, you are allowed to temporarily add colors to the list. To do this /style color: value /style in the raw text. The style tag is inline only.
Meaning that it must be used inside of another tag: /span or /p /b ///b /i /u.
The style tag works like the inline style attribute does to add CSS to the website.

To display something that you don't want a tag like: print/post you need to escape it: print//post.

To indicate that something is not a line break and that it needs to be bold when the next character is r: ///brealy///breally. The ///b is equivilant to the /b except it tells the computer to ignore the r.
Otherwise with just the one / it is: /breally. which makes it:
eally.

THE ONLY TAGS SUPPORTED ARE: /, /b, /br, ///b, /p, /i, /u, /span, /style. Where the first / is an escape character.
THE ONLY ATTRIBUTES RECOGNIZED BY THE PROGRAM INSIDE THE STYLE ARE: color, font-family, and font-size.

TO save all of your changes, you must hit the save button.
TO discard all of your changes, you must hit the cancel button.
NOTE: changes are not actually saved or gotten rid of until edit mode exits for that game on that page.

### A KNOWN ISSUE:
It is currently not possible to tell if multiple editors are open on a page. But:

RULE: YOU ARE SUPPOSSED TO EDIT ONLY ONE GAME AT AT TIME ON A PAGE.

KNOWN ISSUE: THE RULE ABOVE IS NOT ENFORCED. However, you can open multiple editors on the page. Then you can change things. But once edit mode is exited either by saving or canceling the changes, if another editor is open, all changes made in that editor will be lost.
