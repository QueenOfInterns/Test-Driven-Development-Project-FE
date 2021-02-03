# Test Driven Development Project - FE

Welcome! This is an optional project that you can complete prior to the start of the Summer Internship Program to help you learn our tech stack. Feel free to leave comments with your questions, however please try to complete this on your own!

This application is built to help teach Angular 8, one of the technologies you might be using this summer.
The way this application was built was by writing unit tests, and your job is to go into the application and develop the features.
Focus on a simple principle: writing code that passes your unit tests, not writing unit tests that passes your code!

## The project

This project is an application that allows a user to manage books. As the developer of this project, you will need to create a table to display the books returned from the backend, add a book preview, and add a form to update books by sending a request to the backend.

---

### Set Up and Dependencies
If you are new to Angular, you'll probably need to install the following dependencies:
- [Node.js](https://nodejs.org/en/)- confirm you have install npm along with Node.js by running the following command: `npm -v`
- Angular Command Line Interface(CLI)- Assuming you have successfully installed Node.js/npm, run the following command: `npm install -g @angular/cli`
- [PrimeNG Components](https://primefaces.org/primeng/showcase/#/setup)- Assuming you successfully cloned the repo to your local machine, navigate to your local project's directory and run the following commands: `npm install primeng --save` and `npm install primeicons --save`

### To begin:

To start, first run the command to install the dependencies:
`yarn` or `npm install`

---

### To develop:

To see what your code currently does, run the start command by running either `ng serve --open` or `yarn start`.
To see if your project matches the functionality expected, run the tests: `npm test` or `yarn test`.

---

### Don't know where to begin?

- If this is your first time using Angular, you should start by doing the [Angular Tour of Heroes application](https://angular.io/tutorial), created by the Angular team.

- After you have completed the tour of heroes, start looking at the test files (`*.spec.ts`) of a specific component and focus on implementing them one at a time based on what the tests demand.

- Note: You shouldn't have to create any more components, services, models, etc in order to complete the assigned task.


### Testing

- To only run tests on one component, prefix the `describe` in each test file (`*.spec.ts`) with an `f` so it turns into `fdescribe`.

- This trick can also work for each individual test, replacing `it` with `fit`.

- You can also prefix `describe` and `it` with an `x` (`xdescribe` or `xit`) to tell the test runner to skip those tests.
