---
currentMenu: Datafeeds
---
#Data Feeds


As with any good sport based website, you are going to need to get your hands on some juicy data, to power things like the league table, player and match stats.
There are many data providers out there and out of the box we support the two most common: Opta and the Press Association.

We store all data in a SQL database, that is independent of which dataprovider you use. 

We process the data as it comes in, normalise it and store it in a generic way for fast retrieval. Should you wish to use a different 3rd party data provider, you can do so.

##Architecture overview

Data Feeds should be posed to the ```FeedController```. The action is HandleFeed. By default the route is : /Feed/HandleFeed

If you are passing in a feed that is not Opta, you need to pass in a querystring variable such as: ?provider=PressAssociation

When the feed is posted to the endpoint, we store the feed on a ```IMediaStorageManager``` implementation and push a message to a queue implementation (```IServiceBus```)  for processing by a webjob of some kind.


By Default, ```IMediaStorageManager``` is wired up to ```S3MediaStorageManager```, which implements storing the files on S3. and the bucket name has to be 'stadion-sportdata'

By Default, ```IServiceBus``` is wired up to ```AzureServiceBus```, which implements an Azure Queue.

The S3 credentials are stored in web.config as per normal:
```
	<add key="AWSProfileName" value="production" />
    <add key="AWSProfilesLocation" value="~/App_Data/awscredentials.txt" />
    <add key="AWSAccessKey" value="*" />
    <add key="AWSSecretKey" value="*" />
```
The Queue details are stored in appsettings in the web.config, with a name of ```Microsoft.ServiceBus.ConnectionString```.


Currently, the WebJobs are Azure WebJobs that listen to the queues and process data as they come in.

FootballDataProcessorWebJob - This processes the data posted to the 'footballdata' queue and then stores it in the database. It then pushes messages to the 'footballPushData' message queue, if any realtime updates need to be pushed out.

DataPusherWebJob - This sends out any realtime updates via your IRealtTimeClient ( Default implementation is Pubnub)
