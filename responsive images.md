---
currentMenu: Responsive images
---
Responsive Images
============

To help solve the 'problem' of responsive images, we use a 3rd party service called [Blitline](www.blitline.com). 
This enables the editor to upload one image and we automatically crop and resize the image into multiple different formats.

When an image is uploaded, we push the image to an S3 bucket. We can pass the url of the image to blitline who process it into the multiple formats and put them back on the S3 bucket.
We then serve the images via a [CDN](cdn.html) such as Cloudfront, to enable fast and cheap delivery to users around the world.


##Example image rendering

```
  <figure class="figure">
    <img class="image" src="http://d3pvj9jqdk4caj.cloudfront.net/responsiveImage_/~/media/images/players/heroes/jedinak.ashx_HeroMoudle_Small.jpg"
      srcset="http://d3pvj9jqdk4caj.cloudfront.net/responsiveImage_/~/media/images/players/heroes/jedinak.ashx_HeroMoudle_Small.jpg 450w,
              http://d3pvj9jqdk4caj.cloudfront.net/responsiveImage_/~/media/images/players/heroes/jedinak.ashx_HeroMoudle_Medium.jpg 900w,
              http://d3pvj9jqdk4caj.cloudfront.net/responsiveImage_/~/media/images/players/heroes/jedinak.ashx_HeroMoudle_Large.jpg 1200w,
               "
      
      sizes="100vw"
      
      alt="test" />
    
  </figure>
```