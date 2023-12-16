# Memory Game

This API supports a simple game to test a player’s memory.

## Quickstart

1. Ensure the latest version of Docker Desktop is installed on your machine.
1. Clone this repository
1. Run `docker compose -f compose.dev.yaml watch` from the root of the repository.
2. The API will be available at http://localhost:3000/api. To verify the API is running, visit http://localhost:3000/api/swagger.

## Debugging

The best option for development is to use Visual Studio Code. The repository contains a launch.json file which will allow you to debug the API using the "Debug" configuration.

Note: The debugging process attaches to the running container, so make sure it's running first by following the quickstart above.

## Migrations

Migrations are run automatically when using `docker compose` (see the quickstart). If you need to run them manually whilst containers are running, you can use the following command:

```bash
$ docker compose -f compose.dev.yaml run server yarn migrations:run
```

## Running Tests

Tests are run using docker compose. To run the tests, use the following command:

```bash
$ docker compose -f compose.tests.yaml -p tests up
```

NOTE: The -p flag names the test containers as "tests", which is not strictly necessary, but ensures test runs don't conflict with the dev containers if they are running at the same time.

## Other
Useful git aliases are part of the .gitconfig file in the root of the repository. To use them, run the following command from the root of the repository:

`git config --local include.path ../.gitconfig`
