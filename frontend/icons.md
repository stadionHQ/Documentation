---
currentMenu: Icons
---

Icons
============


All iconography is svg based. Data uris are inlined in css files and fall back to inlined pngs. Plain pngs are also provided for older browsers.
The Grunticon css loader is used but since we are using gulp, gulp-iconify has been used in the build process
### > /client/icons folder
    
**grunticon.loader.js** - The original css loader from grunticon left in place as it works well as a loader with gulp-iconify

**output.mustache** - A template for writing the css classes. Current outputs:
    
    .icon-iconname {
        background-repeat: no-repeat;
        background-image: url(''data:image/svg+xml;charset=US-ASCII,blah-here');
    }
***.css** - The generated css files

### > /client/svg folder
Source folder for svg files

### Usage
run `gulp icons` to generate the css files from assets in the */client/svg* folder.
The site will load icons in using the js module: */client/script/icons.js* on page load using the global grunticons object that will be available. This file will be required as a module an initialised.
