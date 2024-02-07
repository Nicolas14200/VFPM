# 🚀 Vehicles Fleet Park Management

## 📦 Installation

Clone the repository and install the dependencies:

    git clone https://github.com/Nicolas14200/VFPM.git

    cd VFPM

    npm install

## 🏃‍♂️ Execution

To init the application:

`make db-start`
`make init-app`

## 🧪 Testing

To run the tests:

`npm run cucumber`
`npm run jest`

## 🐳 Db

Build and execute mongoDb using Docker:

`make db-start`
`make db-kill`

## 🏛️ Architecture

This program adheres as closely as possible to the principles of clean architecture. It is composed of three main layers:

- **domain**: The heart of the application containing the business logic. This layer includes entities, use-cases, and interfaces.
- **infra**: This layer integrates all external tools, independent from the application, such as databases and service providers. A mapper for standardizing raw data input is also present.
- **app**: Acts as a bridge between the core and the adapters.CLI and the implementation of use-cases by the adapters are defined here.

## 🌍 CLI

- `make create-user USER_NAME=<Username>` => return user id
- `make create-fleet USER_ID=<UserId>` => return fleet id
- `make register-vehicle FLEET_ID=<fleetId> PLATE_NUMBER=<vehiclePlateNumber>`
- `make localize-vehicle FLEET_ID=<fleetId> PLATE_NUMBER=<vehiclePlateNumber> LAT=<lat> LNG=<lng> ALT=<alt>`

## 🧐 Testing Details

The program's layers are tested with Jest and cucumber. You will find:

- DDD test in features folder.
- Unit Tests in the domain.
- Integration Tests in the infra.
- 100% test coverage : ![Coverage](./coverage-test-jest.png)

## 🔚 Conclusion

The program is structured for easy maintenance and scalability. 
For potential improvment, add end to end tests for the CLI.
