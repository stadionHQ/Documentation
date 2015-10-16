---
currentMenu: UmbracoInstallation
---


Installation
============
Set up an umbraco solution as you normally would. Then install the Stadion.Umbraco nuget package and we will automatically install all our dependencies.

```
Install-Package Stadion.Umbraco
```

Once you have done this, you will need to install some content in your umbraco solution. Manually install the content package found in 'packages\Stadion.Umbraco.1.x.xx'.

You will then need to create a SQL database to store the stats data. The SQL script for creating it can be found in 'packages\Stadion.Umbraco.1.x.xx'.

Once this is done, update the connection string in the web.config.