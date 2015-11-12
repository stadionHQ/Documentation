---
currentMenu: Javascript
---

Javascript
============

## Tools
[Browserify](http://browserify.org/) - Javascript bundler. Precompiles javascript written in nodejs require syntax for use in a browser.

## Syntax and module pattern

Syntax and coding standards adhere to guidelines outlined in the [Airbnb style guide](https://github.com/airbnb/javascript#the-javascript-style-guide-guide). This is used as a guide, but take note of how the code looks as your are developing. Note the spacings and tab indentations etc and follow the pattern. For example:
```
var newMethod = function() {
  var new thing = null;
}
```
You can see that there is a tab indentation of two spaces and there is a space between () and the opening '{'. This is consistent throughout the site. Set your editor to use spaces not tabs.
The javascript architecture of the site follows a strict adherance to the [Nodejs require and export module pattern](http://www.sitepoint.com/understanding-module-exports-exports-node-js/). New modules are created and added to the 'client/modules' folder for new modules and components. There are also more generic modules and helpers located in 'clientscripts'. An example of a new module initialisation:
```

'use strict';

//require an instance of another module here. These can be constructors or singletons.
var config = require('../config');

var MyNewModule = function MyNewModule(settings) {
  //Can have initialisation stuff in here...
  this.settings = settings;
};

MyNewModule.prototype.publicMethod = function(param) {
  
};

// Private methods. These should be added at the end of the file. They are added to the prototype to make them available for testing.
MyNewModule.prototype._privateMethod = function(param) {
  
};

//The constructor is exported here
module.exports = MyNewModule;
```

The module can then be required like this:
```
var myNewModule = new MyNewModule({"width" : 500});
```

If a module is added to the 'client/modules folder', then it should have an initialiser file to accompany it. There is a glob pattern in 'clinet/scripts/app.js' to do this:
```
require('../modules/**/*.initialiser.js', {glob: true});
```
What the initialiser will do is check for a trigger on load to see if the module is to be initialised. eg:
```
var $ = window.$;
var Carousel = require('./Carousel');

var CarouselInitialiser = function() {
  console.log('CarouselInitialiser initialised');
  /* Initialise carousels
  ========================================================================== */
  var $carousel = $('.js-carousel');
  if ($carousel.length) {
    $carousel.each(function(index, item){
      var carousel = new Carousel();
      carousel.init($(item));
    });
    
  }
};

module.exports = new CarouselInitialiser();
```


### Introduction and standards

              Inter-module communications done via node mediator following syntax (MODULEORIGINATOR:EVENTNAME) eg (APP:STARTED)
              Private Methods:
              To be appended to modules  with '_' and 'exposed' but not used. This is to allow for api testing.