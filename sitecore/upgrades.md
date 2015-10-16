---
currentMenu: SitecoreUpgrades
---

Upgrades
============

To update an Sitecore installation of stadion, you can run the following command in nuget package manager console.

> Note: You should run this on a local installation first and perform any necessary backups.

```
Update-Package Stadion.Sitecore
```

Once you have done this, you will need to re-install some tempaltes and document types in your Sitecore solution. Manually install the content package found in 'packages\Stadion.Sitecore.1.x.xx'.
