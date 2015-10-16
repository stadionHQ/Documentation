---
currentMenu: Umbraco Custom Widgets
---
Custom Widgets
============

To get umbraco to use your controllers, you need to register your routes, like below.

```
 public class ModuleRouting : IModuleRouteRegister
    {
        public void RegisterRoutes()
        {
            RouteTable.Routes.MapRoute(
                                   "SampleModuleRoute",
                                   "SampleModule/{action}",
                                   new
                                   {
                                       controller = "SampleModule",
                                       action = "{action}"
                                   });

        }
    }
	
```
	
To get 	your custom widgets to appear as a 'Stadion Widget' in the grid layout, you need to attach the ```[UmbracoWidget]``` attribute to your actions and then add a class like below which will pick up any available actions.
	
```
	
	public class WidgetRegistration : IWidgetRegister
    {
        public ActionDescriptor[] GetWidgets()
        {
            return new ReflectedControllerDescriptor(typeof (SampleModuleController)).GetCanonicalActions();
    
        }
    }
	
	
	
```
Below is an example of a simple widget.
	
```
		
		
	public class SampleModuleController : UmbracoController
    {
        [UmbracoWidget]
        public ActionResult WidgetA()
        {
            return Content("Hello world");
        }
    }

```

Below is an example of a simple page. The ```[UmbracoGlass] BaseUmbracoItem model ``` in the action parameters will be automatically binded from the current page or datasource, if one is set.

```
		
		
	public class SamplePageController : UmbracoController
    {
		//Controller name = document type (template in sitecore speak) & Template = Action Name
        public ActionResult PageA([UmbracoGlass] BaseUmbracoItem model)
        {
            var viewModel = model;
            return UmbracoView("~/Views/SampleModule/PageA", viewModel);
        }
    }

```