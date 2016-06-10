---
currentMenu: FrontEndAPI
---

API (Apiary mock)
============

## Summary

The Expressjs site is driven by mock data located at: 
[http://private-003c2-stadiondatamodels.apiary-mock.com](http://private-003c2-stadiondatamodels.apiary-mock.com)

You will not be able to edit the example above but you can create your own versions of each endpoint in your own Apiary instance and then get the json from the each of the endpoints listed as starting points for your own mocks. Though the easiest approach is probably to get in contact with us and we can supply a full dump of the entire api from you to drop into your new instance.

This behaves like a production REST API and should always mock what exists in the production .NET version. The production site is ultimately driven by the same sets of data as the templates are shared between the Expressjs and production sites. But it's important to note that they are seperate entities and exist independantly. They are both also purely back-end apis (Expressjs site and Production).

This mock location can change to something more appropriate with a new instance of the Stadion demo site. But for the current demo site, this is used. To have a custom named location for data for a new instance will need assistance from Stadion developers to retrieve a snapshot of the current data set that can be added to a fresh [Apiary](http://apiary.io/) instance. The data and docs can then be accessed via the Apiry docs location url.

A find and replace then needs to be done on the Apiary end point address (described below) in the front-end project as well as the test suite for the production site. 

The client side ajax mocks are driven by a seperate mock api instance at:
[private-88862-stadiondatamodelsajax.apiary-mock.com](private-88862-stadiondatamodelsajax.apiary-mock.com)

So any end points that need to be mocked can be passed as parameters in models located in 'private-003c2-stadiondatamodels.apiary-mock.com' that can then reference the mock end-point located in 'private-88862-stadiondatamodelsajax.apiary-mock.com'

This means we can keep real ajax mocks and the serverside data seprate. Back-end can then supply their own replacement endpoints for the production site.

### Steps to find and replace the end-point address:

- Log into your new Apiary instance.
- Click the "Inspector" Link in the top level navigation. You will be redirected to your docs location which will be something like: http://docs.yourProjectName.apiary.io/traffic
- Underneath the menu bar you should see something like: Listening at "http://private-xxx000-yourProjectName.apiary-mock.com".
- Use this end-point in the project and change the existing config located at: "config/config.js". Change 
```
apiRoot: 'http://private-003c2-stadiondatamodels.apiary-mock.com/' 
```
to your new end-point: "http://private-xxx000-yourProjectName.apiary-mock.com"

### Managing the API data

Before running the site for the first time, or to run it after any api mock changes, you need to fetch a fresh version of the entire mock. This is achieved with the gulp command:
```
gulp fetchapi
```
This takes a snapshot of the api as it stands and adds it to 'api/data/globalData.json'. You can then start the site with:
```
gulp dev
```

The application will read this mock file and add the contents to a master global variable defined in 'app/config/config.js' called 'globalData'. This will then be referenced throughout the application on subsequent page requests while this instance of the server is running.


All new endpoints in Apiary need to be added to 'app/config/config'. They need to be added to the variable:
```
  var endPoints = [
    'article',
    'carousel',
    'carouselSingle',
    'contentListing'
    'etc...'
  ]
```

*IMPORTANT* 
The local mock file 'api/data/globalData.json' will take the NAMES of each of the end-points defined above and use these to describe each NAMED INSTANCE of the data. For example:

The 'article' model in Apiary is structured like this:

```
  {
    "id" : "1",
    "publishedDate" : {
        "date": "2015-05-15 19:00",
        "dateFormatted": "15th May 2015"
    },
    "category" : "Team News",
    "title" : "Article one title to go over a few lines",
    "author"  : {
            "name" : "Uncle bob",
            "twitterHandle" : "twitter_handle"
    },
    "authorLabelText" : "Written by",
    "summary" : "Article one summary",
    "content" : "<p>The content</p>
  }
```

When you run 'gulp fetchapi', this data get added to the local mock but named and nested with the end-point name 'article'. So the 'globalData' model will be structured like this:

```
   {
      globalData : {
        article : {
          {
            "id" : "1",
            "publishedDate" : {
                "date": "2015-05-15 19:00",
                "dateFormatted": "15th May 2015"
            },
            "category" : "Team News",
            "title" : "Article one title to go over a few lines",
            "author"  : {
                    "name" : "Uncle bob",
                    "twitterHandle" : "twitter_handle"
            },
            "authorLabelText" : "Written by",
            "summary" : "Article one summary",
            "content" : "<p>The content</p>
          }
        }
      }
   } 
```

We can then pass in the correct model to the partial 'Article.handlebars' like so:

```
{{>Article article}}
```

as 'article' will be available globally since it will have been passed into the front-end serverside page 'pages/article,handlebars' by a controller:

```
  router.get('/article', function (req, res, next) {
    res.render('pages/article', extend(true, {}, config.globalData));
  });
```

This replicates how data will be passed from back-end in production.


All this logic to handle data is held in "app/api/globals.js". You will not need to make changes to this file. All you need to know is that any models you reference will be in this global data object. 

So a working example with nested models...

A model can contain child objects that may be replications of other base models. For example, the 'matchDay' model contains a child model called 'lineup'. Yet there is also a base model in the api called 'lineup'. The reason for this duplication is because back-end need a more rigid and complete mocked base model to test against and use in production. In other words, back-end needs to supply a full 'matchDay' model for the matchday page containing all the tabs, news articles, lineup etc. It makes things a bit cumbersome for the front-end developer to manage Apiary, but without this rigid nesting back-end will not know how to structure the model if the front-end developer used many individual models on the same page.

So the important thing to note for this is described in this example:

To create a new page to consume the matchDay model (this example already exists but for brevity we can pretend it doesn't):

- First create a new server page in the 'app/views/pages' folder called matchday.handlebars. This is purely a front-end serverside page (node) and WILL NOT be used in the production site. It is just a way of having a starting point to pass the matchday model. This is true for any new page and any number of these can be created. This page will then contain:

```
  {{>MatchdayLayout matchDay}}
```

'MatchdayLayout' is the layout for the matchday page (this is the production entry point for matchday and will be shared with the production site) and will be found in 'client/modules/MatchdayModule/' folder. This view will have the entire 'matchDay' model passed to it and then will contain:

```
  {{>Lineup lineup}}
```

So the child model 'lineup' will be passed to the Lineup.handlebars partial. If we had to remove the nested 'lineup' model in the 'matchDay' model in Apiary, the express handlebars engine would then use the globally defined 'lineup' model that exists at the route. A cleaner solution for front-end mocks yes, but as we have found, it leads to too much back and forth between back-end and front-end developers to structure the final production model correctly. So it is best to have the root 'lineup' model there as a reference, and this is then replicated at the correct level in 'matchday'. 

The "app/api/globals.js" also runs through all the pages folder to get the names of files and adds then to the globalData config variable too. this allows us to have a list of all pages on the homepage. 

*IMPORTANT NOTE*
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

It probably means that something has gone wrong with the local "globalData.json" file and it may be corrupt of have no data. DELETE this file and then run 'gulp fetchapi' again.

### Adding a new end-point to the API dataset
If a new feature or module is added to the site then a new data end-point in the API will need to be added. Steps to acheive this:
- Log into apiary.io and navigate to the "editor" tab.
- You'll see the list of all the current end-points. They should be roughly alphabetical.
- Scroll down to where you would like to add the new end-point and enter:

```
## New Module Name [/newModuleEndPoint]
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
    'newModuleEndPoint'
```

Run:

```
  gulp fetchapi
```

```
  gulp dev
```

Your new data will now be available in the application.





