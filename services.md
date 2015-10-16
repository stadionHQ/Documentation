---
currentMenu: Services
---
Exposed Services
============
You can inject any of these services into your controllers using StructureMap and they will provide some very usefull functionality.

##IFixtureService

```
	IFixture GetFixtureByOptaId(string optaId);
	IFixture GetNextFixture(DateTime currentTime, string clubId);
	IEnumerable<IFixture> GetOrderedFixturesPaged(int pageSize, int page, out int total, string clubId, int? seasonId = null);
	IEnumerable<IFixture> FixtureSearch(string search);
	IFixture GetLastOrCurrentFixture(DateTime currentTime, string clubId);
	IEnumerable<IFixture> GetLastFixtureAndNextTwo(DateTime currentTime, string clubId);
	IEnumerable<IFixture> GetUpcomingFixtures(DateTime currentTime, string clubId);
	IEnumerable<IFixture> GetFixturesForSeason(int seasonId, string clubId);
	LeagueTableViewModel GetLeagueTable(int competitionId, int seasonId, string clubId);
	IEnumerable<RecentFormSummary> GetHeadToHeadForm(string teamId, string secondTeamId);
	IEnumerable<RecentFormSummary> GetRecentForm(string teamId);
	TeamViewModel GetLineup(string gameId, SideEnum side);
	OtherScoresViewModel GetLiveScores(int competitionId, int matchDay, int matchMonth, int matchYear);
	GameOverviewModel GetGameOverview(string gameId);
	dynamic GetTeamStats(IFixture fixture);
	dynamic GetPlayerStats(IFixture fixture);
	int GetCurrentSeasonId(string dataProviderId);
```		

##IPlayerProfileService
```	
	PlayerProfileViewModel GetPlayerProfile(int dataProviderId, dynamic contentId = null);
	dynamic GetPlayerStatsForSeason(string playerReference, int seasonId, FixtureType fixtureType);
	FootballPlayerStats GetPlayerStatsForEverySeason(string playerReference);
	List<PlayerProfileViewModel> GetPlayers(int teamDataProviderId, dynamic teamContentId, int seasonId);
```		
##IPlayerRatingService
```	
    double GetSeasonRating(string optaId);
    double GetMatchRating(string optaId, string matchId);
```		
##IClubService
```	
	string GetClubCrestUrl(string dataProviderId);
	ClubSummary GetClubSummary(string dataProviderId);
	List<ClubSummary> GetAllClubs();
	void SaveClub(ClubSummary club);
	List<ClubSummary> GetMultipleClubs(List<string> dataProviderIds);
```	
##ISearchService
```	
	SearchResults<Result> SearchContent(SearchFilter filter);
```	
##ICompetitionService
```	
    ICompetition GetCompetitionById(string dataProviderId);
	void Save(ICompetition competition);
	List<Competition> GetAllCompetitions();
```	
##IInstagramService
```	
	long GetFollowedByCount(string userName);
	InstagramUser GetUserDetails(int userId, int recentMediaCount = 0);
	InstagramUser UpdateUserDetails(InstagramUser user, int recentMediaCount = 0);
	InstagramUser GetUserDetails(string userName, int recentMediaCount = 0);
```	
##ITwitterService
```	
	IEnumerable<Tweet> GetStatusesForSearch(ulong? sinceId, string searchText, string channel);
	IEnumerable<Tweet> GetStatusesForList(ulong? sinceId, string screenName, string listName, string channel);
	IEnumerable<Tweet> GetStatusesForUser(ulong? sinceId, string screenName, string channel);
```	

##ISiteService
```	
	List<SiteViewModel> GetAvaliableSites();
	SiteViewModel GetCurrentSite();
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