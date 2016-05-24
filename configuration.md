---
currentMenu: Configuration
---

#Configuration

Everything that needs to be configured can, naturally, be done via a configuration file. All config files are stored in the App_Config folder in the root of the site.

##Stadion.config


This is the main config file. It contains settings for the following things:

* Social Network Settings
* Google Analytics Settings
* Instagram Settings
* Cdn Settings
* Twitter Settings
* API Settings
* MatchDay Centre Settings

```
<?xml version="1.0" encoding="utf-8"?>
<dsp>
  <generalSettings host="secure.umbraco.demo.stadion.io" facebookAppId="x"  isContentDeliveryServer="false"  emailAddressEmailsAreFrom="lee@dsp.com" googleTrackingCode="xxx" googleTrackingCookieDomain="none" googleTagManagerId="GTM-xxx" fixturesUrl="/fixtures" searchUrl="/search" socialSharingNetworks="facebook,twitter,google,linkedIn" />

  <instagramSettings ClientSecret="secret" ClientId="1" ApiUri="https://api.instagram.com/v1" AccessToken="xxx" />
  
      <cdnSettings host="cdn.dsp.local" enabled="false" mediaHost="xx.cloudfront.net"  />
  <twitterSettings consumerSecret="xx"
                  consumerKey="xx"
                  accessToken="xx-xx"
                  accessTokenSecret="xx">
  </twitterSettings>

  <apiSettings loginEndpoint="https://umbraco.dsp.local/Authenticate/Email?apiKey=1111">
    
  </apiSettings>

  <liveSettings clubIds="t31">
  </liveSettings>
</dsp>
```

##Stadion.images.config

This file contains what size images should be for each different type of module.

```
<?xml version="1.0" encoding="utf-8"?>
<images>

  <Default ExtraLargeWidth="400"  ExtraLargeHeight="400"
              LargeWidth="400"  LargeHeight="400"
              MediumWidth="300"  MediumHeight="300"
              SmallWidth="250" SmallHeight="250">
  </Default>

  <HeroModule ExtraLargeWidth="2400"  ExtraLargeHeight="1350"
              LargeWidth="1200"  LargeHeight="675"
              MediumWidth="900"  MediumHeight="506"
              SmallWidth="450" SmallHeight="253">
  </HeroModule>

  <NewsModule  ExtraLargeWidth="2400"  ExtraLargeHeight="1350"
              LargeWidth="1200"  LargeHeight="675"
              MediumWidth="900"  MediumHeight="506"
              SmallWidth="450" SmallHeight="253">
  </NewsModule>

  <PromoBox ExtraLargeWidth="2400"  ExtraLargeHeight="1350"
              LargeWidth="1200"  LargeHeight="675"
              MediumWidth="900"  MediumHeight="506"
              SmallWidth="450" SmallHeight="253">
  </PromoBox>
</images>
```

###Football.config

This file contains the queries needed to bring back content from the cms so that we can merge with data provided by opta/ PA. SHould you rename your main nodes, you will need to update these queries.

```
<?xml version="1.0" encoding="utf-8"?>
<football>
  <clubQuerySettings clubXpathQuery="/sitecore/content/Meta/Clubs//*" fixturesXpathQuery="/sitecore/content/Home/Fixtures/*/*/*" seasonXpathQuery="/sitecore/content/Home/Fixtures/{0}/*" playerProfileXpathQuery="/sitecore/content/Home/teams//{0}/*" competitionXpathQuery="/sitecore/content/Meta/Competitions/*" teamsXpathQuery="/sitecore/content/Home/teams/*"/>
</football>
```

##Membership.config

This file contains urls needed to perform various actions related to login. In theory, these URLS should not change.

```
<?xml version="1.0" encoding="utf-8"?>
<membershipProvider>
  <membershipProviderSettings
  loginUrl="http://local.sitecore.demo.stadion.io/login"  registrationUrl="/registration" socialRegistrationUrl="/socialregistration" />

</membershipProvider>
```

##SearchModule.config

This file contains queries for getting the editor defined most popular search terms.

```
<?xml version="1.0" encoding="utf-8"?>
<searchModule>
  <searchModuleQuerySettings popularTermsPath="/sitecore/content/Meta/Popular Search Terms" />
</searchModule>
```

##SocialModule.config

In the Cms you can define what social content we should aggregate. 
This file contains queries for getting tweets based on what usernames/lists/hastags on twitter. 
You can also define instagram user names to automaticly pull in a player(s) / teams images.

```
<?xml version="1.0" encoding="utf-8"?>
<socialModule>
  <soicalModuleQuerySettings twitterPollJobFolder="/sitecore/content/Meta/Social/Twitter//*" instagramPollJobFolder="/sitecore/content/Meta/Social/Instagram//*"/>
</socialModule>
```