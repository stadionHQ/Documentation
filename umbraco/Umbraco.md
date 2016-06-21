---
currentMenu: UmbracoOverview
---
Umbraco
============

The minimum version of Umbraco we support is 7.2

## Grid Layouts
We have extend the Grid Layout functionality of Umbraco so that you can easily register new 'widgets' that an editor can drag and drop on a page and change the layout completely.


![Translation Dictionary](/UmbracoGrid.PNG)

To add a Stadion widget to the grid, select 'Insert Control', then 'Macro'. Then Select 'Stadion Widget' from the drop down.

![Translation Dictionary](/UmbracoInsertCOntrol.PNG)

From here, you can use the dropdown to select any avaliable widget to drag on to the page. You can also select a 'Data Source', so that the 'content item' passed to the controller is different from that of the page being rendered.
You will wish to do this on a 'FeaturedPromo', for example.

![Translation Dictionary](/UmbracoChooseRendering.PNG)


## Search
The search is powered by Umbraco's built in Examine search library, which is jsut a wrapper around lucene.

## ORM

We are using a forked version of the Umbraco Glass Mapper library, which has some speed improvements.

## Scheduled Tasks

If you want to have various jobs running periodically, you can set them up in the   umbracoSettings.config file like so:


```
<scheduledTasks>
    <!-- add tasks that should be called with an interval (seconds) -->
    <!--    <task log="true" alias="test60" interval="60" url="http://localhost/umbraco/test.aspx"/>-->
    <task log="true" alias="fixtures" interval="60" url="https://test.local.umbraco.demo.stadion.io/tasKS/FIXTURES"/>
    <task log="true" alias="tweets" interval="60" url="https://test.local.umbraco.demo.stadion.io/tasKS/twitter"/>
    <task log="true" alias="instagram" interval="60" url="https://test.local.umbraco.demo.stadion.io/tasKS/instagram"/>
  </scheduledTasks>
  ```
  
  The Twitter and instagram tasks updates tweets/posts for any defined accounts in the cms.
  The fixtures task creates fixtures in the cms when opta post a new fixture update.
