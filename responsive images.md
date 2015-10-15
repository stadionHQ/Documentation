Responsive Images
============

To help solve the 'problem' of responsive images, we use a 3rd party service called [Blitline](www.blitline.com). 
This enables the editor to upload one image and we automatically crop and resize the image into multiple different formats.

When an image is uploaded, we  push to image to an S3 bucket. We can pass the url of the image to blitline who process it into the multiple formats and put them back on the S3 bucket.
We then serve the images via a [CDN](cdn.html) such as Cloudfront, to enable fast and cheap delivery to users around the world.