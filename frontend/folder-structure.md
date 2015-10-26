---
currentMenu: Folder Structure
---

Frond-end Folder Structure
============


## app
All server side components for the ExpressJs app. None of this is used in the production site.
### api
Initialisation and REST tasks for the Apiary api end point in here.

### controllers
Each page in the static Expressjs site needs a controller. They are all stored here.

### data
The REST data set from Apiary is statically stored and referenced here to save constanly calling the api. Periodic backups of the api can also be stored here. This is a manual copy and paste job from Apiary directly.

### views
All views used in the static site. The views can be added here directly to the child folders except for the modules folder. This contents of this are dynamically added in a gulp build step from the /clients/modules folders and are not to be edited directly.

## assets
A place to store assets for the site. Nothing in here is used directly in the site. Just a resource fo small psds, font files svgs etc that need to be in source control.

## client
All css,js,images,icons before processing.
### bower_components
```
Bower install
```
Adds bower components to here.

### development
Contains css and js used ONLY in this static site. Nothing in here is used in production. Eg: Prism css is referenced statically for the style guide in (/style-guide) and gridpak is referenced for the grid (/grid)

### fonts
All fonts used in the site. These are copied out to various locations on gulp build steps

### icons
All grunticon (gulp version - gulp-iconify) assets stored here. The grunticons.js file is referenced directly from here.

### img
Image assets kept here and copied out to various locations on gulp build steps

### modules
All modules for the site are stored here. Thius included views, styl, js and spec.js files. Various gulp tasks build out css and js bundles and copy them to public locations in dev and prod. The views are copied to the dist location too and are used in the production site.

### public-assets
Extra assets like favicons that are used in dev and production.

### scripts
All js and entry point for the javascript application. Any javascript that is not related to a module is added here. The bundle for dev and prod is generated from this js and all the js in the modules folder.

### spec
Entry point for the test runner. All spec files relating to each module are contained in the modules folder.

### sprite-src
All files used in the image sprit file added here. The site uses gulp sprite-smith to build a sprite from these images.

### styles
All styl files that are note related to modules. Css asset is built out from these and the files in the modules folder.

### svg
All svg assets that are converted to icons with gulp-iconify are added here.

## cms
Files specific to cms systems. will mainly be css files to overide editor styling.

## config
All serverside configuration for the static Expressjs site. Not used in production. 

## dist
Production location for all assets to be used in the production site. This will be populated when running:
```
gulp prod
```

## node_modules
npm modules location

## public
The assets location for all assets built for the static Expressjs site. This is populated when running:
```
gulp dev
```

## tests
All setup for the Karma test suite in here.
