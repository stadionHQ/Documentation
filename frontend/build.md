---
currentMenu: Build
---

Frond-end Build
============

This site uses [gulp](http://gulpjs.com/) as the build tool. There are comments above each task listed in the gulpfile in the root of the site.

## Gulp task summary:

```
gulp dev
```
complies css,js and copies all assets to the '/public' folder which is
used for the Expressjs site to serve the assets. Loads the static mock api from: '/app/data/globalData.json'. this can be refreshed by running 'gulp fetchapi'


```
gulp fetchapi
```
This gets all the data from the apiary endpoint (currently: [https://app.apiary.io/stadiondatamodels](https://app.apiary.io/stadiondatamodels)) and populates the '/app/data/globalData.json'. 

This needs to be run when any changes have been made to the data models in the api.


```
gulp dev --production
```
sets prod flag to test site with minified assets. Otherwise exactly the same as normal 'gulp dev' just allows running of the site locally with compressed prodution assets for testing purposes.


```
gulp prod
```
Production build to minify assets. Normal dev task runs but with prod flag set.
Copies all assets needed for production to dist folder.


```
gulp default
```
The same as gulp dev, but without the server and browser sync.


All build tasks build to "/public" folder. This includes production tasks as a flag will be set to indicate if the task is production and this will be available in the gulp stream with the variable:
```
var isProd
```
We can then effect things like compression, disabling or source maps etc. The prodution task will then move the assets from "/public" folder to the "/dist" folder.

gulp dev


## Server start and dev task
```
gulp dev
```
will start a server running at: localhost:3000. 
A [browser sync](https://www.npmjs.com/package/browser-sync) instance will also start and will watch all css and js files for changes and run the appropriate tasks when needed.



## Css build using stylus.
### Tools:
Pre-compiler:
[stylus](https://learnboost.github.io/stylus/) with [gulp-stylus](https://www.npmjs.com/package/gulp-stylus)
Postcss: 
[Autoprefixer](https://www.npmjs.com/package/autoprefixer) 
Stylus libraries:
[Jeet grid system](http://jeet.gs/)
[Axis utilities for stylus](http://axis.netlify.com/)

### Gulp tasks:
```
gulp styles
```
This is initially run along with 
```
gulp dev
```
and will also be triggered via browser sync on .styl file changes.

The task has an entry point at "/client/styles/core.styl". This file imports all styl files including files from a temp folder "styl" in "/client/styles/modules". This folder gets created with the
```
copy-stylus-tmp
```
and removed again with
```
remove-stylus-tmp
```
after the styus task has run. This allows globbing of all .styl files from the temp location /client/styles/modules/core.styl.



## Javascript build
### Tools:
Bundler:
[Browserify: NEED LINK](http://needlink) - Allows for bundling in the browser using Node require syntax.
[Bower: NEED LINK](http://needlink) - Vendor managment tool.

### Gulp tasks:
```
gulp vendor
```
Simple task to generate vendor.js file. this ic concatenated from Bower dependencies as well as other third party scripts added manually to '/scripts/vendor'

```
gulp scripts
```
Runs browserify using 'client/'/scripts/main.js' as the entry point. The process takes care of pre-defining all npm dependencies and ordering from all require() statements in each of the js files referenced internally as well as handlebars template pre-compiling, so that we are left with a bundle that is browser ready.


## Production build and asset generation.

### Gulp tasks:
```
gulp prod
```
Runs the gulp dev task as described earlier, but with the added addition of a production flag to remove comments and minify etc. All js, css, icons, fonts and images are copied from /public folder to /dist. 
Views are sourced for the production site from /app/Views/ayouts and /app/Views/shared and alos copied to /dist.
Individual module views are also added from /Modules/**.handlebars.

### IMPORTANT!!!

The views contained in the */app/Views/partials* folder are dynamically built from the .handlebars templates contained in each module in:

*/client/modules/<module-name>/<module-name.handlebars>*

The reason for this is so to avoid duplicating module templates as these are used as handlebars partials in the Expressjs site and need to be located here. But we need to keep the views together with their othe modules assets inside /modules folder for consistency. Modules/*.handlebars views can also be required client side if needed.

.handlebars views in the app/views/ folder are rendered server side on page load for the FE site. 

.handlebars templates in the client/modules/ folder will be copied to the /dist folder. They will then be copied accross by a production build task (not covered here as this is a backend task) to the relevant folder in the production site to be packaged into Nuget. 

###The shared, layouts and pages folder however are not dynamic. 
The Views folder contains shared and layout views like header and footer which are used around the site but NOT as front-end views on the client site. These are needed server side here as well as in the production site.


## Other Build Tasks
Other tasks as well as thos described here are also documented in details inside: gulpfile.js

