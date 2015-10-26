---
currentMenu: Build
---

Frond-end Build
============

This site uses [gulp](http://gulpjs.com/) as the build tool. There are comments above each task listed in the gulpfile in the root of the site.

All build tasks build to "/public" folder. This includes production tasks as a flag will be set to indicate if the task is production and this will be available in the gulp stream with the variable:
```
var isProd
```
We can then effect things like compression, disabling or source maps etc. The prodution task will then move the assets from "/public" folder to the "/dist" folder.
This method allows us to run dev tasks with a production flag eg:
```
gulp styles --production
```
and we can see the dev site running locally with compressed prodution assets for testing purposes.

## Server start and dev task
```
gulp dev
```
will start a server running at: localhost:3000. 
A [browser sync](https://www.npmjs.com/package/browser-sync) instance will also start and will watch all css and js files for changes and run the appropriate tasks when needed.

## Css build summary using stylus.
### Tools:
Pre-compiler:
[stylus](https://learnboost.github.io/stylus/) with [gulp-stylus](https://www.npmjs.com/package/gulp-stylus)
Postcss: 
[Autoprefixer](https://www.npmjs.com/package/autoprefixer) 
Stylus libraries:
[Jeet grid system](http://jeet.gs/)
[Axis utilities for stylus](http://axis.netlify.com/)

Gulp task:
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
after the styus task has run



## Production asset generation

```
gulp prod
```

Build step to generate:
Base css asset - containing base styles, structure, branding etc.
    - src: /client/styles

Module css assets - Individual assets
    - src: /client/modules/<module_name>/<module_name>.styl

Seperate css and javascript assets for the platform will be sent to dest folder. These can then be copied to the production site. (Located outside of this solution)

### Production assets build
Build step to combine and minify generated assets. This will run on the production site and create single js and css assets.

More detailed build documentation can be found [here](frontend/build/index)
