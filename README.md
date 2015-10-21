---
currentMenu: home
---

Overview
============

Stadion is a .net platform, which can sit on top of [Umbraco](umbraco/umbraco.html) or [Sitecore](sitecore/sitecore.html), to provide all of the functionality that a sports club will need.

Architechture
============

Stadion is made up of multiple components, as can be seen in the diagram below.

We expose many [services](services.html) which provide all of the key functionality you may need to create a custom widget.


Nuget
============
The stadion platform is distributed as a series of versioned nuget packages, from a private nuget feed.  We operate a Contiuos Delivery release policy, so you can always grab the latest build by using the –IncludePrerelease switch.

```

Update-Package Stadion.Sitecore –IncludePrerelease

```

When we do an update, we always try to overwrite our core files (including views, css, etc), so you should try not to modify our files and duplicate / inherit from them instead.

Dependencies
============
We have dependencies on the following services / software:
* StructureMap
* GlassMapper
* Pubnub
* jQuery
* AWS S3
* MS SQL Server / Azure SQL / AWS RDS SQL

How to Customize
============
You can customize any aspect of Stadion. If you want to provide your own implementation of a service, you should create a StructureMap 'Registry' and tell an interface to to implement your new implementation.


```
	public class FakeDataProviderRegistry : Registry
    {
        public FakeDataProviderRegistry()
        {

            For<ICompetitionService>().Use<FakeCompetitionService>();
            For<IClubService>().Use<FakeClubService>();
            For<IFixtureService>().Use<FakeFixtureService>();
            For<IPlayerProfileService>().Use<FakePlayerProfileService>();
            For<ILiveGameRepository>().Use<FakeLiveGameRepository>();
        }
    } 
```

You can of course just extend our implementations and override specific methods.

## [Frontend](frontend/index.html)

Supported Browsers
============

We support all modern browsers. This basically means IE 10+. A complete matrix is below.


<table class="environments">
    <tbody><tr>
        <th align="left">Internet Explorer</th>
        <td align="center">10.0</td>
        <td align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>

    <tr>
        <th align="left">Chrome †</th>
        <td colspan="6" align="center">Latest stable</td>
    </tr>

    <tr>
        <th align="left">Firefox †</th>
        <td colspan="6" align="center">Latest stable</td>
    </tr>

    <tr>
        <th align="left">iOS Safari</th>
        <td colspan="6" align="center">Latest stable</td>
    </tr>

    <tr>
        <th align="left">Android</th>
        <td align="center">2.3.†</td>
        <td colspan="5" align="center">4.†</td>
    </tr>

</tbody></table>

### Notes:
* The dagger symbol (as in "Android 4.†") indicates that the most-current non-beta version.


### What Does "Support" Mean?

Support does not mean that everybody gets the same thing. Expecting two users using different browser software to have an identical experience fails to embrace or acknowledge the heterogeneous essence of the Web. In fact, requiring the same experience for all users creates an artificial barrier to participation. Availability and accessibility of content should be our key priority.

An appropriate support strategy allows every user to consume as much visual and interactive richness as their environment can support. This approach—commonly referred to as _progressive enhancement_ — builds a rich experience on top of an accessible core, without compromising that core.

We have done some testing in older browsers (IE 8+) and the site will 'work' but they won't have the best possible experience.

## View Engine

All views are created in handlebars, as opposed to razor. We created a View Engine based on the [handlebars.net](https://github.com/rexm/Handlebars.Net) library. We did this as it saves duplication of a FE developer creating his markup and styling once in test suite and then having to re-do it in razor files.

If the view engine can not find a .handlebars view, it will look for one of the same name except .cshtml. So, you don't have to use handlebars, but your FE developer will thank you.

###Example View
```

<div class="mini-league-table">
  <header class="mini-league-table__header">
    <h2>League Table</h2>
  </header>

  <div class="mini-league-table__content js-dynamicContainer js-realtime" 
      data-realtime-channel="{{leagueTableChannel}}" 
      data-render-action="replace"
      data-template="MiniLeagueTable/MiniLeagueTableItems">
      
      {{>MiniLeagueTableItems}}

    <button class="button--fill button--inverse">View Full Table</button>
  </div>
</div>
```

###Example Controller returning a view

You don't have to do anything special to use a handlebars view, just return a View as you normally would inside a controller. The conversion to json is automatically handled. It will also convert it to camel case to keep FE devs happy.

```
 public ActionResult Fixture([UmbracoGlass] FixtureModel model)
        {
            if (model != null)
            {
                _matchViewModelBuilder.ContentId = model.Id;
                _matchViewModelBuilder.MatchDataProviderId = model.DataProviderId;
                _matchViewModelBuilder.TagIdList = CovertTagList(model);
                _matchViewModelBuilder.CurrentTeamId = model.LandingPage.Team.DataProviderId;
                var viewModel = _matchViewModelBuilder.Build();

                return View("~/Views/MatchdayModule/MatchdayLayout", viewModel);
            }

            return Content("Awaiting Content");
        }
```
		
##View Models

If you want to see the properties that are available on a viewmodel, you can seem them on our [Apiary](http://docs.stephenzsolnai.apiary.io/) documentation.