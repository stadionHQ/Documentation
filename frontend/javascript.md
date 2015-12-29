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

If a module is added to the 'client/modules folder', then it needs an initialiser file to accompany it. There is a glob pattern in 'client/scripts/app.js' to do this:
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

#### reusable components (uiComponents.js)
'client/scripts/uiComponents.js' contains initialisation for all globale and reusable components not deemed to be bespoke modules (which would be added to the 'modules' folder). That can be generally be initiated and used anywhere in the site. 

The uiComponents module's init() method checks for css class existance in child elements of the passed parent Dom node. On page load this will be the 'body' but it can be something more dynamic if content has been added after page load with ajax. In these instances uiComponents.init($newParentNode); can be called to run all the checks again and initialise and new instances only contained in the scope of the new wrapper element ($newParentNode).

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
 
#### Config (config.js)
Config and settings for the site.

#### Icons (icons.js)
This file manages the rendering of svg assets in the site. More information can be found in the [icons docs](frontend/icons.html).







### Utilities
The are various utilities available for use in the site. Theye are all located in the 'lient/scripts/utilities' folder.

<a name="dynamicContainer"></a>
#### Dynamic container (utilities/dynamicContainer.js)
A utility to handle all dynamic content throughout the application. The idea is the ajax endpoints, settings and templates are driven from data-attributes in the markup, rather that individual javascript views for each component. This more generic approach means we can keep the js bundle lighter. It was also the better approach to handling dynamic ajax content in the absence of a javascript framework. This works together with the render ('utilities/renderer.js'). More details on this [here](#renderer)

##### Options :
- *$elem* : The target wrapper that will have it's content be dynamic. The module will be initialised with this passed element (js-dynamicContainer).

- *$triggerLinks* : The container may have links inside it that trigger the render action. Pagination for instance. These will be targeted with (js-triggerLinks). There can also be an external trigger link. The can be referenced by adding the target class of the external link to the 'data-trigger-link' attribute. An example of this is the link ('js-reveal-login') to reveal the login container (which is a dynamic container)

- *renderAction* : How the new markup comin in is treated. Options are 'append', 'prepend', 'replace' (default). Set with data-render-action="append". Defaults to replace if not used.

- *template* : The template to render content with. This can be replaced if a new template is required. But is normally the same one throughout it's life cycle. Starts with what is set in data-template attribute. This will be passed as a string to the template mapper and will assign the correct pre-compiled hanadlebars template.

- *endPoint* : An ajax endpoint can be specified and the dynamic container will immediately fetch the data from this endpoint and render it to the template. Mocks for this can be created in Apiary. More information on the mock end points [here](frontend/api.html)

- *isHiddenWithContent* : This should be set to true if the dynamic container has content but is hidden from view on the page. An example of this would be the login dropdown. It provides a way of allowing external trigger links to reveal a container rather than updating the content.

- *updateWarning* : Warn the user that an update is about to happen with overlay. This will be sent to the renderer which will handle the delay.

##### Details
Render actions can be trigger by pagination links in the element or by events with realtime data fired by oubnub channels.

Render actions could also be triggered by a button external to the container referenced by data-trigger-link="triggerLinkClass"

If the DynamicContainer is has data to be revealed and no ajax call needs to be made then the  data-is-hidden-with-content="true" will be present

The utility will use the [renderer](#renderer) utility to fetch the data and handle the rendering of dom elements.

When pagination is used, the next links should be updated in the data passed from the backend and rendered into the template.

Example markup for a dynamic container:
```
<section class="list js-dynamicContainer" data-template="ContentListing" data-render-action="append" >
  <h1 class="list__header">Other News</h1>
  <ul class="list__wrapper">
    <li class="list__item">
      Some listed content in here....
    </li>
    <li class="list__item">
      Some listed content in here....
    </li>
  </ul>
  <div class="pagination js-triggerLinks">
    <ul class="pagination__list">
        <li class="previous"><a href="http://private-003c2-stephenzsolnai.apiary-mock.com/content-listing?page=1" rel="previous" data-load-previous="">
            Previous
          </a>
        </li>
          <li class="next"><a href="http://private-003c2-stephenzsolnai.apiary-mock.com/content-listing?page=3" rel="next" data-load-next="">
            Next
          </a>
        </li>
    </ul>
  </div>
</section>
```

<a name="renderer"></a>
#### Renderer ('utilities/renderer.js')
This utility gives a central place for ajax and realtime renderings to be handled. It is used in conjunction with the [Dynamic Container utility](#dynamicContainer).

##### Options

- *template* : The pre compiled handlebars template that has been passed to the instance.
- *renderAction* : The render action passed. Options are 'append', 'prepend', 'replace' (default).
- *$target* : The target element that the resulting html will be rendered inside.

##### Public methods
- *load()* : takes an ajax end point and template and calls the internal _loadData(). This is the ajax call. An event is triggered when the result is returned. This then calls the _renderToTarget() method to render the resultant html.

- *renderData(0* : If we have the data already and just need to render it without an ajax call. Calls the _renderToTarget() method immediately.

- *empty()* : Empties the parent container of all content. 


