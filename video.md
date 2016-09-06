---
currentMenu: Videotech
---
Video
============

We support multiple video providers out of the box.

* StreamUK (PlayerHD)
* Brightcove
* YouTube
* OOyala

##Sitecore
We utilize the Sitecore Media Framework for all  video providers, so we have seemless integration with all partners.

![sitecore media framework](/sitecoremediaframework.PNG)


##Umbraco

In Umbraco, there is a separate note, outside of the root, where videos can be stored.

![umbraco video](/umbracovideo.PNG)

If you are using StreamUK's Kaltura platform on with Umbraco, we have created a property editor that is conencted to the StreamUK API.

![umbracostream](/umbracostream.PNG)

  
You need to specifiy some settings in the Stadion.Video.config file in the App_Config folder.

```	
<?xml version="1.0" encoding="utf-8"?>
<video>
  <videoSettings RootVideoNodeId="2363" kaltura.AdminSecret="x" kaltura.UserId="x" kaltura.PartnerId="x" kaltura.ServiceUrl="https://mp.streamamg.com/"  />
</video> 
```	