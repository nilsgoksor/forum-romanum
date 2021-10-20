# Forum Romanum

## Steps to run

1. In the project directory, run:

```
json-server --watch db.json --port 1337
```

Starts a json database server, needed for CRUD of posts

2. In a separate terminal, run:

```
yarn start
```

Runs the app in the development mode.

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

Launch the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
yarn test
```

To see the test coverage, run

```
yarn test --coverage
```
