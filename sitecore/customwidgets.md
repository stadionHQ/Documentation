---
currentMenu: Sitecore Custom Widgets
---
Custom Widgets
============


Below is an example of a simple rendering. The ```[Glass] BaseSitecoreItem model ``` in the action parameters will be automatically binded from the current page or datasource, if one is set.

```
		
		
	public class SamplePageController : Controller
    {
        public ActionResult PageA([Glass] BaseSitecoreItem model)
        {
            var viewModel = model;
            return View("~/Views/SampleModule/PageA", viewModel);
        }
    }

```