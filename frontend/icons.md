---
currentMenu: Icons
---

Icons
============


All iconography is svg based. Data uris are inlined in a css file. Plain pngs are also provided for older browsers. The css file to include these is added in conditionals [if lte IE 9] for < ie9 in the Header after the rest of the css references
### > /client/icons folder

**output.mustache** - A template for writing the css classes. Current outputs:
    
    .icon-iconname {
        background-repeat: no-repeat;
        background-image: url(''data:image/svg+xml;charset=US-ASCII,blah-here');
    }
***.css** - The generated css files

### > /client/svg folder
Source folder for svg files

### Usage
run `gulp icons` to generate the css files from */client/svg* folder.
The css.svg file will be css imported from the core.styl file