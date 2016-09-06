---
currentMenu: Datafeeds
---
#Data Feeds


As with any good sport based website, you are going to need to get your hands on some juicy data, to power things like the league table, player and match stats.
There are many data providers out there and out of the box we support the two most common: Opta and the Press Association.

We store all data in a SQL database, that is independent of which dataprovider you use. 

We process the data as it comes in, normalise it and store it in a generic way for fast retrieval. Should you wish to use a different 3rd party data provider, you can do so.

##Summary
You post Opta files at the "/feed" endpoint.

This then uploads the file to S3 for permanent storage. Once uploaded, it posts a message in a message queue with a reference to the file on S3, so that a seperate web job (FootballDataProcessorWebJob.exe) can process the file. 

FootballDataProcessorWebJob.exe read's messages from the queue and then processes the opta XML. It then stores it in the SQL database (SportsData)

Another message is then posted to a different queue, which is read by another webjob (Stadion.Football.DataPusherWebJob.exe).  It send's out real time messages using the IRealTimeClient implementation you are using.


##Architecture Detail

Data Feeds should be posed to the ```FeedController```. The action is HandleFeed. By default the route is : /Feed

If you are passing in a feed that is not Opta, you need to pass in a querystring variable such as: ?provider=PressAssociation

When the feed is posted to the endpoint, we store the feed on a ```IMediaStorageManager``` implementation and push a message to a queue implementation (```IServiceBus```)  for processing by a webjob of some kind.


By Default, ```IMediaStorageManager``` is wired up to ```S3MediaStorageManager```, which implements storing the files on S3. and the bucket name can be configured in the stadion.config file with property 'dataS3Bucket="newcastle-sportdata"'

By Default, ```IServiceBus``` is wired up to ```AzureServiceBus```, which implements an Azure Queue. You need to create two queues. "footballdata" and "footballpushdata".

The S3 credentials are stored in web.config as per normal:
```
	<add key="AWSProfileName" value="production" />
    <add key="AWSProfilesLocation" value="~/App_Data/awscredentials.txt" />
    <add key="AWSAccessKey" value="*" />
    <add key="AWSSecretKey" value="*" />
	<add key="BaseAPIUrl" value="https://dev.xx.stadion.io/" />
```
The Queue details are stored in appsettings in the web.config of the site, with a name of ```Microsoft.ServiceBus.ConnectionString```.

Example azure configuration:
```
 <appSettings>
        <!-- Service Bus specific app setings for messaging connections -->
      <add key="StorageConnectionString" value="DefaultEndpointsProtocol=https;AccountName=xx;AccountKey=xxx" />
 </appSettings>
 
```

Currently, the WebJobs are Azure WebJobs that listen to the queues and process data as they come in. To get the webjob's to run on azure, they must live inside the 'App_data\jobs\continuous' folder.

FootballDataProcessorWebJob - This processes the data posted to the 'footballdata' queue and then stores it in the database. It then pushes messages to the 'footballPushData' message queue, if any realtime updates need to be pushed out.

DataPusherWebJob - This sends out any realtime updates via your IRealtTimeClient ( Default implementation is Pubnub)
