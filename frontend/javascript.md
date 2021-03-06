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
The javascript architecture of the site follows a strict adherance to the [Nodejs require and export module pattern](http://www.sitepoint.com/understanding-module-exports-exports-node-js/). New modules are created and added to the 'client/modules' folder for new modules. There are also more generic modules and helpers located in 'client/scripts'. An example of a new module initialisation:
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

// Private methods. These should be added at the end of the file. They are underscored and added to the prototype to make them available for testing.
MyNewModule.prototype._privateMethod = function(param) {
  
};

//The constructor is exported here
module.exports = MyNewModule;
```

The module can then be required like this:
```
var myNewModule = new MyNewModule({"width" : 500});
```

If a module is added to the 'client/modules folder', then it needs an initialiser file to accompany it. There is a glob pattern in 'client/scripts/app.js' to do this.

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
It can also have it's initialisation added to '/scripts/modulesInitialiser.js' with others if easier. This can change going forward to have all the initialisations in '/scripts/modulesInitialiser.js' same as the utilities in '/scripts/utilitiesInitialisation.js'


## Introduction and standards

### Event architechture
Inter-module communications are handled via the node mediator following syntax (MODULEORIGINATOR:EVENTNAME) eg (UI:BREAKPOINT_CHANGED). All events should be added to the 'client/scripts/config.js' file. An example trigger and listener:

```
var config.events = require('../config')
var mediator = require('mediatorjs');

//To listen to the mediator event:
mediator.on(events.ui.breakPointChanged, upDateUiMethod);

//To trigger mediator event:
mediator.trigger(events.ui.breakPointChanged, {passed: 'parameters'});


```

### Root javascript Initialisation

#### Entry point  (app.js)
The entry point to the application is in 'client/scripts/app.js'. This is called from 'client/scripts/main.js'which will be the name of the bundled file in production. This allows us the flexibility to add other entry points to secondary applications if needed.

#### Ui initialisation (ui.js)
'client/scripts/ui.js' initialises UI state for the application. Things like mediator, global listeners and breakpoints watchers.

#### reusable global utilities (utilitiesInitialiser.js)
'client/scripts/utilitiesInitialiser.js' contains initialisation for all global and reusable components not deemed to be bespoke modules (which would be added to the 'modules' folder). They can be generally be initiated and used anywhere in the site and are mostly trigger with 'js-componentname' classes.  

The utilitiesInitialiser module's init() method checks for css class existance in child elements of the passed parent Dom node. On page load this will be the 'body' but it can be something more dynamic if content has been added after page load with ajax. In these instances utilitiesInitialiser.init($newParentNode); can be called to run all the checks again and initialise and new instances only contained in the scope of the new wrapper element ($newParentNode).

An example initialisation:

```
  var $infiniteScroll = $parent.find('.js-infinitescroll');
  if ($infiniteScroll.length) {
    var InfiniteScroll = require('./utilities/infiniteScroll');
    $infiniteScroll.each(function(index, item){
      var infiniteScroll = new InfiniteScroll($(item));
    });
  }

```
The 'modulesInitialiser' works in the same way, but only targets modules in the '/Modules' folder.
 
#### Config (config.js)
Config and settings for the site.

#### Icons (icons.js)
This file manages the rendering of svg assets in the site. More information can be found in the [icons docs](frontend/icons.html).








