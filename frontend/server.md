---
currentMenu: Server
---

Server
============

##Tools
[Expressjs](http://expressjs.com/) - Node server framework.
[Express Handlebars](https://www.npmjs.com/package/express-handlebars) - An Express specific handlebars implementation.

## Summary
The front-end site makes use of Expressjs to run the site on a node server instance. The site is rendered serverside from a rest api, [Apiary.io](http://apiary.io/). The data supplied from this rest endpoint matches the data structure that is used in the production Stadion platform. Each module eg: Content Listing module, has it's own data set and is documented. See the api [here](http://docs.stadiondatamodels.apiary.io/) More data about the mock api can be found in the [api docs](/frontend/api.html)

## Running the site
In the root of the front end solution, run:

```
gulp dev
```

This will start the server and watch tasks. More details about the build and gulp tasks can be found in the [build docs](/frontend/build.html)

## Configuration
Expressjs configuration and middleware can be found in 'config/express.js'.

## Set up
The entry point for the server is found at 'app.js'. Here we require the necessary pi globals and configuration and pass them to an instance of Express server:
```
require('./config/express')(app, server, config);
```

The Express engine uses a specific port of handlebars for Expressjs which, at the time of initial setup, proved to be the best option to allow the most flexibility with layouts an partials. The goal is to use handlebars serverside as well as client side so that partials from the modules folder can be shared. The Handlebars initialisation is implemented with the following in 'config/express.js':
```
  var hbs = exphbs.create({
    layoutsDir: config.root + 'app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + 'app/views/shared/', config.root + 'app/views/partials/'],
    helpers: hbsHelpers
  });
``` 
Here the layouts and partials folders are specified along with any handlebars helpers located in 'config/handlebars-helpers.js'. These Handlebars helpers are only serverside. Any clientside helpers need to be added to 'client/scripts/utilities/handlebars-helpers.js'. Details on how handlebars files get added to the layout and partials folders can be found in the [build docs](frontend/build).

## Creating a new page
Any page added to the 'app/viewspages' folder will only be used in this frontend site. The layouts and partials (which are dynamically added to the partials folder in a build step) are the files that are copied to and used by the production site. The idea here is this gives the flexibility to create test pages that include the modules (partials) that will be used in the site. Most of the views in the 'pp/views/pages' folder just contain a reference to a single module. For example, 'article.handlebars' just references the Article module:

```
{{>Article}}
```
There is also a development folder along side the pages folder. This can contain more complex layouts and test pages for laying out modules and as the folder name implies, is just used for development/testbed purposes.

Any new page that is created in the 'app/views/pages' or 'app/views/development' folder needs a controller to drive it. These controllers are all located in app/controllers'. They are all required dynamically at run time by the express engine. Some controllers are stand alone instances for single modules and others, for example 'football.js' have a series of routes defined in the one location. There is no definite pattern required here. It's up to what the developer thinks suits at the time.
