---
currentMenu: generators
---

Overview
============
We supply generators that be used to generate content in the CMS based on the data in the SQL database.  You can set these to run with quartz or any other such scheduling task. Note: They willneed to run with a CMS context of some kind.

Fixture generator
============

There is a class called  ```FixtureGenerator``` which implements  ```IFixtureGenerator```. 
You can use this to create fixtures from opta data, based on the teams defined in your cms. 
It will automatically create the seasons as appropriate and won't re-create fixtures that already exsist.




Player profile generator
============
There is a class called  ```PlayerGenerator``` which implements  ```IPlayerGenerator```. 
You can use this to create players from opta data (F40) based on the teams defined in your cms. 
It will automatically create the players as appropriate and won't re-create players that already exsist.