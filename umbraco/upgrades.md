---
currentMenu: UmbracoUpgrades
---

Upgrades
============

To update an umbraco installation of stadion, you can run the following command in nuget package manager console.

> Note: You should run this on a local installation first and perform any necessary backups.

```
Update-Package Stadion.Umbraco
```

Once you have done this, you will need to re-install some tempaltes and document types in your umbraco solution. Manually install the content package found in 'packages\Stadion.Umbraco.1.x.xx'.
