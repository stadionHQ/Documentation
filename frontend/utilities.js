---
currentMenu: Javascript Utilities
---

Javascript Utilities
============

All globally available utilities included in /scripts/utilities folder.

### Utilities list:
- [Pubnub Adaptor](#pubnubadaptor)
- [Realtime Listener](#realtimelistener)
- [Detection](#detection)
- [Dynamic Container](#dynamicContainer)
- [Forms](#forms)
- [Global Dom elements](#globaldom)
- [HandleBars Helpers](#handlebarshelpers)
- [Handlebars Partials](#handlebarspartials)
- [Infinit Scroll](#infinitescroll)
- [Insert By Paragraph](#insertbypara)
- [Loader](#loader)

<a name="detection"></a>
### Device Detection
Detect devices, features etc
Script to drive this is included 'views/Shared/Header.handlebars'.
See here for usage info: [https://github.com/kaimallea/isMobile](https://github.com/kaimallea/isMobile)
Require this as singleton wherever needed.

<a name="dynamicContainer"></a>
### Dynamic Container
A utility to handle all dynamic content throughout the application. The idea is the ajax endpoints, settings and templates are driven from data-attributes in the markup, rather that individual javascript views for each component. This more generic approach means we can keep the js bundle lighter. It was also the better approach to handling dynamic ajax content in the absence of a javascript framework. This works together with the [render]('#renderer'). Functionality is driven from markup classes and data attributes.

#### Options :
- *$elem* : The target wrapper that will have it's content be dynamic. The module will be initialised with this passed element (js-dynamicContainer).

- *$triggerLinks* : The container may have links inside it that trigger the render action. Pagination for instance. These will be targeted with (js-triggerLinks). There can also be an external trigger link. The can be referenced by adding the target class of the external link to the 'data-trigger-link' attribute. An example of this is the link ('js-reveal-login') to reveal the login container (which is a dynamic container)

- *renderAction* : How the new markup comin in is treated. Options are 'append', 'prepend', 'replace' (default). Set with data-render-action="append". Defaults to replace if not used.

- *template* : The template to render content with. This can be replaced if a new template is required. But is normally the same one throughout it's life cycle. Starts with what is set in data-template attribute. This will be passed as a string to the template mapper and will assign the correct pre-compiled hanadlebars template.

- *endPoint* : An ajax endpoint can be specified and the dynamic container will immediately fetch the data from this endpoint and render it to the template. Mocks for this can be created in Apiary. More information on the mock end points [here](frontend/api.html)

- *isHiddenWithContent* : This should be set to true if the dynamic container has content but is hidden from view on the page. An example of this would be the login dropdown. It provides a way of allowing external trigger links to reveal a container rather than updating the content.

- *updateWarning* : Warn the user that an update is about to happen with overlay. This will be sent to the renderer which will handle the delay.

#### Details
Render actions can be triggered by pagination links in the element or by events with realtime data fired by realtime channels.

Render actions could also be triggered by a button external to the container referenced by data-trigger-link="triggerLinkClass"

If the DynamicContainer has data to be revealed and no ajax call needs to be made then the  data-is-hidden-with-content="true" needs to be added

The utility will use the [renderer](#renderer) utility to fetch the data and handle the rendering of dom elements.

When pagination is used, the next links should be updated in the data passed from the backend and rendered into the template.

Some examples:

##### Dynamic container with endpoint and template. Auto loads. Used for lazy loading content.</h2>
      
In the real world the end-point should be passed in the model for the dynamic container on page load. This will be the ajax end-point supplying the data.


```
<div class="js-dynamicContainer" 
  data-end-point="aend-point-passed-from-server-model" 
  data-template="NameOfModule/ModuleTemplate" >
  <div class="loading"></div>

</div>

```

##### Dynamic container with template and realtime handler.</h2>
Used in combination with the [realtime listener](#realtimelistener).

###### Replace version:
This replaces the existing content.

```
<div class="js-dynamicContainer js-realtime" 
    data-realtime-channel="NameOfTheChannel" 
    data-render-action="replace"
    data-template="NameOfModule/NameOfHandlebarsFile">
      <p><strong>The content in here will be <i>replaced</i> and rendered with the data-template supplied. The data passed on the event raised on the data-realtime-channel will be used.</strong></p>
</div>
```
###### Append version

```
<div class="js-dynamicContainer js-realtime" 
    data-realtime-channel="NameOfTheChannel" 
    data-render-action="append"
    data-template="NameOfModule/NameOfHandlebarsFile">
      <p><strong>The content in here will be have new content <i>appended</i> and rendered with the data-template supplied. The data passed on the event raised on the data-realtime-channel will be used.</strong></p>
</div>
```

        
###### Prepend version

```
<div class="js-dynamicContainer js-realtime" 
    data-realtime-channel="NameOfTheChannel" 
    data-render-action="prepend"
    data-template="NameOfModule/NameOfHandlebarsFile">
      <p><strong>The content in here will be have new content <i>prepended</i> and rendered with the data-template supplied. The data passed on the event raised on the data-realtime-channel will be used.</strong></p>
</div>
```

##### Pushdown with content

Will have content hidden. External trigger link will show hide based on a class on the link or button. Ensure this is unique to avoid conflicts

```
<button type="button" class="button js-show-item">Click to reveal hidden content</button>
<div class="pushdown js-dynamicContainer" data-trigger-link="js-show-item" data-is-hidden-with-content="true" >
  <p>Content to be releaved on toggle</p>
</div>
```

<a name="forms"></a>
### Forms

Each individual form initialised based on .js-form class
#### Options :
$form - Each individual form initialised based on .js-form class
$errorsHtml - Container for returned erros to be displayed
ajaxEndPoint - Specified in data-end-point. If it exists, will ajax post the form.
isToValidate - Hook for Parsley Validator to validate the form. Triggered with data-parsley-validate

There are no public methods for this utility. It's all driven from data attribute config.
              
Initialised and required in utilitiesinitialiser.js


<a name="globaldom"></a>
### Global Dom Elements
A place to cache dom elements which are used repeatedly throughout the app.
Small perf gains with this approach.

Require this as singleton wherever needed.


<a name="handlebarshelpers"></a>
### Handlebars Helpers
Helpers for handle bars.

Required once in app.js

<a href="handlebarspartials"></a>
### Handlebars Partials
Attach handlebars partials which are used in client side templates.
Only add partials that are needed as client side views here. Need to keep the bundle light.

All Handlebars partials in the 'modules/' folder are copiled into the 'app/views/partials' folder to be used server side in the Static Frontend site. If the templates need to be dynamic to be used with ajax content, they manually need to be added to this file in order to be compiled along with all the other javascript.

Required once in app.js


<a name="infinitescroll"></a>
### Infinite Scroll
Checks when base in in view and loads content from supplied endpoint in a pagination based approach.
This works together with the [renderer](#renderer.js). 

Current page and item count is passed to the ajax call and iterated each time.

<a href="insertbypara"></a>
### Insert By Paragraph
Takes some content rendered at the end of an article and inserts it after the specified paragraph index supplied in data-target-index attribute

<a href="loader"></a>
### Loader
Simple loader shown and hidden through the public methods based on a passed parent

Require this as singleton wherever needed.

<a name="pubnubadaptor"></a>
### Pubnub adaptor
Initialises and connects to pubnub.
Listens on channels broadcasts data.
Initiliased and required in: [realtimelistener.js](#realtimelistener)


<a name="realtimelistener"></a>
### Realtime Listener



```
  var $infiniteScroll = $parent.find('.js-infinitescroll');
  if ($infiniteScroll.length) {
    var InfiniteScroll = require('./utilities/infiniteScroll');
    $infiniteScroll.each(function(index, item){
      var infiniteScroll = new InfiniteScroll($(item));
    });
  }

```
