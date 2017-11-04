# nayak-express-skeleton

This is a very lightweight Node.js Express REST API structure.
(MySQL, MariaDB Base)

## Getting Started

### Installing

```
$ git clone git@github.com:LeeJeongYeop/nayak-express-skeleton.git
$ cd nayak-express-skeleton
$ npm install
```

### Start Server

```
$ npm start
```

## Structure

```
nayak-express-skeleton
nayak-express-skeleton
├─┬ config
│ ├── config.js
│ ├── DBConfig.json
│ ├── logger.js
│ └── ParamValidation.js
├─┬ controllers
│ ├── AuthCtrl.js
│ └── index.js
├─┬ models
│ ├── AuthModel.js
│ └── TransactionWrapper.js
├─┬ routes
│ ├── index.js
│ └── ServiceRouter.js
├── app.js
├── ErrorHandler.js
├── errors.json
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── server.js config
? ??? config.js
? ??? DBConfig.json
? ??? logger.js
? ??? ParamValidation.js
??? controllers
? ??? AuthCtrl.js
? ??? index.js
??? models
? ??? AuthModel.js
? ??? TransactionWrapper.js
??? routes
? ??? index.js
? ??? ServiceRouter.js
??? app.js
??? ErrorHandler.js
??? errors.json
??? LICENSE
??? package.json
??? package-lock.json
??? README.md
??? server.js
```

- **config**: The configuration file management directory required for the project.
   - **config.js**: [Must be gitignore] Fill in the settings required. (example. Crypto, JWT )
   - **DBconfig.json**: [Must be gitignore] MySQL, MariaDB information.
   - **logger.js**: Logging config file. (used [Winston](https://www.npmjs.com/package/winston))
   - **ParamValidation.js**: Validates the request parameters. (used [express-validation](https://www.npmjs.com/package/express-validation))
- **models**: Write a query and associate it with the database.
   - **TransactionWrapper.js**: Transaction management based on promise.
- **controllers**: Manage requests and responses, and process data.
- **ErrorHandler**: Handles the error, and references errors.json.
- **errors.json**: Lists error conditions.

## License

This project is licensed under the [MIT License](https://github.com/LeeJeongYeop/nayak-express-skeleton/blob/master/LICENSE)
