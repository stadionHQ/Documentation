---
currentMenu: API
---
API
============

We try to expose all functionality as a REST based API. 

All responses are returned in a JSON format.

## Securing your API
API Access can be secured via an OAuth Mechanism.

On API Controlers there are attibutes such as  ```[AuthorizePermission("football")] ```
The parameter is a role that is passed in to say what types of API user can access these methods.

The types of role we have defined are:
* football
* membership
* content

You can implement any permission / token scheme you want here, but we would reccommend a JsonWebToken based model. There is a good guide on how to do this with [Auth0](https://auth0.com/docs/server-apis/aspnet-webapi) . 

## Available methods
You can seem them on our [Swagger](http://demo.stadion.io/swagger) documentation.