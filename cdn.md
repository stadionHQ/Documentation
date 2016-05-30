---
currentMenu: cdn
---
Content Delivery Networks
============

Obviously all static assets (images, css, js) can be served by a CDN, but you can also serve the whole site via a CDN, if you are not doing personalisation. 
Serving your whole site via the CDN will make the site very fast and will significantly reduce your hosting costs.

CDN Configuration.
------------

In the App_Config\dsp.config file, there is a CDN settings node:

`<cdnSettings host="exampleclub.com" enabled="true" mediaHost="images.exampleclub.com"  />`

You can enable or disable the cdn by using the 'enable' attribute.

The 'host' attribute is used when rendering fully qualified links.

The 'mediaHost' attribute is used when rendering images. ( It uses a different CDN as it has to pull images form the S3 bucket.)

Logged In Users
------------

When a user logs in, we redirect them to the version of your site served by your webserver(s). We would recommend a domain name such as secure.exampleclub.com

Cache Headers
------------
As you CDN will obey your cache headers (usually), you should keep the cache time relatively short. We would suggest around 1 hour.

Invalidating the CDN
------------
There is an interface called `ICdnInvalidator` that is called when a publish operation happens. 
There is a default implementation that works with AWS couldfront called `CloudfrontInvalidator`.