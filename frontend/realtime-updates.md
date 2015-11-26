---
currentMenu: Realtime Updates
---

Realtime Updates
============

## Summary
The site updates content and data in realtime with [Pubnub](https://www.pubnub.com/). Settings and initialisation for Pubnub are handled in a Pubnub adaptor ('/client/scripts/utilities/adaptor-pubnub.js'). Configuration settings themselves are held in 'client/scripts/config.js'. All that is needed is the 'subscribe_key'. Pubnub uses channels to allow the application to subscribe to individual update events. More information can be found on the Pubnub docs. Once you have your account setup and have received your login, you will be given this key as well as a 'publish_key' which is used to push updates to Pubnub from the serverside part of the website. 

## Usage
The pubnub adaptor is initialised by the realtime listener ('/client/scripts/utilities/realtime-listener.js'):

```
var pubnubAdapter = null;

var RealtimeListener = function($elem) {
  var channel = $elem.data('realtime-channel');

  if (channel) {
    if (!pubnubAdapter) {
      pubnubAdapter = require('./adaptor-pubnub');
    }
    pubnubAdapter.connect(channel);
  }
};

module.exports = RealtimeListener;

```

An instance of the realtime listener is then initiated for every instance it is needed and triggered with the presence of the '.js-realtime' css class. This happens in the components.js file. the containing element that will need to be live updated is passed to it:

```
var $realtime = $parent.find('.js-realtime');
if ($realtime.length) {
var RealtimeListener = require('./utilities/realtimelistener');
$realtime.each(function(index, item) {
  var rt = new RealtimeListener($(item));
});
}
```

The pubnub adaptor's connect method will be called by the realtime listener for each container needing realtime updates and the channel id is taken from the 'data-realtime-channel' attribute on the container will be passed to it. The only handling that then needs to be done is to listen for the unique event that will be fired from the pubnub adaptors mediator instance:

```
PubnubAdapter.prototype._recieved = function(data, envelope, channel) {
  console.log('message received on ' + channel);
  mediator.trigger("REALTIME:" + channel, data);
};
``` 

An example of this usage:

```
var MyNewModule = function() {
    mediator.on("REALTIME:" + MyNewModuleChannelId, this.update);
}

MyNewModule.prototype.attach = function() {
    //Update the module here...
}
...

This event driven architecture allows us to abtract the adaptor making it easy to drop in another provider if required. The new provider will just need an adaptor added like the pubnub adaptor. Assuming the new provider uses a similar event based system, the listeners can be attached in the same way.

## Testing data updates.

Testing new and exisitng components are rendering correctly through Pubnub updates is a manual process. Pubnub provides a development console for this purpose. You can drop in test json data structured as the application would be expecting it, and manually push this out to a selected channel to test the wonrkings of your module. There is already some test data in source control for this very purpose in 'assets/reference'.

 

