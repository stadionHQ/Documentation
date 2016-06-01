---
currentMenu: Front end
---

Front End
============


Front-end site for Stadion Digital Sports platform

### Summary
This is a standalone site running on a Node Express server. It's acts a static site to allow fast prototyping and development of modules without being slowed down by real data from a CMS. All assets to be used in the related Stadion platform repository are generated and minified io an output folder [dist](/dist) which can then be copied over to the platform. This includes handlebars templates which are transformed in the platform using [Nustache](https://github.com/jdiamond/Nustache)

#### Terms used in docs for Front-end
"Production site" - This refers to the csm drived production site that is outside of the static front end site. It is a completely seperate entity and only uses built views and css, js, image assets.

"Static site" or "ExpressJs app" - This refers to the static Expressjs and mock api driven front-end website described in these front-end docs.

#### Backend:
Using Expressjs, the site is rendered from a rest api, [Apiary.io](http://apiary.io/). The data supplied from this rest endpoint matches the data structure that is used in the actual Stadion platform. Each module eg: Content Listing module, has it's own data set and is documented. See the api [here](http://docs.stadiondatamodels.apiary.io/)

#### Frontend:
The site is completely modularised and each component has it's own assets and handlebars template. This allows us to easily add and remove components as needed.

Css is built using [stylus](http://learnboost.github.io/stylus/) and follows BEM syntax and OOCSS patterns similar to those outlined [here](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) as well as loosly following [Google's html and css style guide](https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml#ID_and_Class_Naming). More details can be found in the styles folder[icons](/client/styles) folder

Javascript is built using [Browserify](http://browserify.org/). This allows to to write concise, modularised, Nodejs style javascript following commonjs practices. A vendor.js file is built out seperately and any third party libraries that have issues running inside Browserify can be built into this file and added to the Gulp commmand.

Icons are generated inline in css files from svg files using a mix of Filament Group's [Grunticon tool](https://github.com/filamentgroup/grunticon) and it's [Gulp version](https://www.npmjs.com/package/gulp-iconify) More details can be found in the icons folder[icons](/client/icons) folder.

All images, icons, and built css and javascript files are output to the [dist](/dist) folder with the ''Gulp prod'' command.



##  Folder structure
All details of the folder structure for the site [here](frontend/folder-structure.html).


## Build
All build tasks handled with Gulp. All steps and information can be found [here](frontend/build.html).

## Setup
Run 'npm install' and then 'gulp dev'. 



## Modules

You can find a list of modules [here](frontend/modules/index.html).

### Icons
Built using [gulp-iconify](https://github.com/gavro/gulp-iconify)
See [/client/icons/README.md](/client/icons/README.md) for more info.