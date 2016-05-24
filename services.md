---
currentMenu: Services
---
Exposed Services
============

Full .net documentation of all classes and services can be found [here](http://stadiondocs.azurewebsites.net/index.aspx).

Below is a list of key services you may find useful. You can inject any of these services into your controllers using StructureMap and they will provide some very usefull functionality.

```
IFixtureService
```	

```	
IPlayerProfileService
```
	
```
IPlayerRatingService
```	

```	
IClubService
```	

```	
ISearchService
```	

```	
CompetitionService
```	

```	
IInstagramService
```	

```	
ITwitterService
```
```	
ISiteService
```	
	
Content Decorators
============
Content decorators are used to combine data from a a 'dataprovider' such as Opta or PA and content from the CMS.

##IPlayerProfileContentDecorator
```	
	IPlayerProfileContent GetProfileContent(dynamic contentId);
	IPlayerProfileContent GetProfileContentByDataProviderId(string dataProviderId, dynamic teamContentId);
```		
##IFixtureContentDecorator
```	
    IEnumerable<IFixture> EnrichWithMetaData(IEnumerable<IFixture> fixtures);
	IFixture EnrichWithMetaData(IFixture fixtures);
	MatchReportViewModel GetArticleContent(dynamic contentId);
```	
##ICompetitionContentDecorator
```	
	ICompetition GetCompetitonMetaData(int dataProviderId);
	IEnumerable<IFixture> EnrichWithMetaData(IEnumerable<IFixture> fixtures);
	IFixture EnrichWithMetaData(IFixture fixtures);
```	

View Model Builders
============
View model builders are often used to keep controllers simple. 

* IMatchViewModelBuilder
* IFixtureLandingPageViewModelBuilder
* ILatestAndUpcomingFixturesViewModelBuilder
* IPlayerListingViewModelBuilder
* IPlayerProfileViewModelBuilder
* IPlayerStatsViewModelBuilder