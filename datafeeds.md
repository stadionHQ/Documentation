#Data Feeds


As with any good sport based website, you are going to need to get your hands on some juicy data, to power things like the league table, player and match stats.
There are many data providers out there and out of the box we support the two most common: Opta and the Press Association.

We store all data in a SQL database, that is independent of which dataprovider you use. 

We process the data as it comes in, normalise it and store it in a generic way for fast retrieval. Should you wish to use a different 3rd party data provider, you can do so.

##Architecture overview

TODO