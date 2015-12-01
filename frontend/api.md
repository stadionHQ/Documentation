---
currentMenu: API
---

API (Apiary mock)
============

## Summary

The Expressjs site is driven by mock data located at: 
[http://private-003c2-stadion1.apiary-mock.com](http://private-003c2-stadion1.apiary-mock.com)

This behaves like a production REST API and should always mock what exists in the production .NET version. The production site is ultimately driven by the same sets of data as the templates are shared between the Expressjs and production sites. But it's important to note that they are seperate entities and exist independantly. They are both also purely backend apis (Expressjs site and Production).

This mock location can change to something more appropriate with a new instance of the Stadion demo site. But for the current demo site, this is used. To have a custom named location for data for a new instance will need assistance from Stadion developers to retrieve a snapshot of the current data set that can be added to a fresh [Apiary](http://apiary.io/) instance. The data and docs can then be accessed via the Apiry docs location url.

A find and replace then needs to be done on the Apiary end point address (described below) in the front-end project as well as the test suite for the production site. 

### Steps to find and replace the end-point address:

- Log into your new Apiary instance.
- Click the "Inspector" Link in the top level navigation. You will be redirected to your docs location which will be something like: http://docs.yourProjectName.apiary.io/traffic
- Underneath the menu bar you should see something like: Listening at "http://private-xxx000-yourProjectName.apiary-mock.com".
- Use this end-point in the project and change the existing config located at: "config/config.js". Change 
```
apiRoot: 'http://private-003c2-stadion1.apiary-mock.com/' 
```
to your new end-point: "http://private-xxx000-yourProjectName.apiary-mock.com"

### Managing the API data

When the server first starts and runs the application with
```
gulp dev
```
the entire data set will be fetched from the API and added to a global object variable at run time. This will then be referenced throughout the application on subsequent page requests while this instance of the server is running. 

All this logic to handle data is held in "app/api/globals.js". How it works is on first load the method "updateGlobalDataConfig" is called. This first checks to see if a local version of the dataset exists at "api/data/globalData.json" and uses this data if the file exists. It then attempts to fetch the entire API dataset and if it successfully fetches it, updates the config variable "globalData" again and writes the file "api/data/globalData.json" with the latest data. This effectively allows us to be able to work offline if needed as the error from the non-existant API in offline mode will be handled.

The "app/api/globals.js" also runs through all the pages folder to get the names of files and adds then to the globalData config variable too. this allows us to have a list of all pages on the homepage. 

*Important note*
If you encounter an error like:
```
[10:06:17] Development server has error.
undefined:1

SyntaxError: Unexpected end of input
```
when running
```
gulp dev
```
It probably means that something has gone wrong with the local "globalData.json" file and it may be corrupt of have no data. DELETE this file and then start the server again.

### Adding a new end-point to the API dataset
If a new feature or module is added to the site then a new data end-point in the API will need to be added. Steps to acheive this:
- Log into apiary.io and navigate to the "editor" tab.
- You'll see the list of all the current end-points. They should be roughly alphabetical.
- Scroll down to where you would like to add the new end-point and enter:
```
## New Module Name [/new-module-end-point]
### New module description [GET]
+ Response 200 (application/json)

        {
            //data in here
        }
```
- Once you are done adding the data you should test the status and health of the data but accessing the "inspector" tab. Your new end-point should be green.
- Now you need to add this new value to config so that the application knows to add it the global data object. Open "config/config.js" and look for the following:
```

/* A list of all endpoints for the mock API.
========================================================================== */
var endPoints = [
  'article',
  'carousel',
  'content-listing',
  'featuredArticleModule',
  'featuredVideoModule',
  'featured-videos',
  'fixtures',
  ...
];
```
add your new end-point to this list:
```
    'new-module-end-point'
```
and restart the server. Your new data will now be available in the application.





