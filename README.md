Overview
============

Stadion is a .net platform, which can sit on top of [Umbraco](umbraco/umbraco.html) or [Sitecore](sitecore/sitecore.html), to provide all of the functionality that a sports club will need.

Architechture
============

Stadion is made up of multiple components, as can be seen in the diagram below.

Dependencies
============
We have dependencies on the following services / software:
* StructureMap
* Pubnub
* jQuery
* AWS S3
* MS SQL Server / Azure SQL / AWS RDS SQL

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
* The dagger symbol (as in "iOS 6.†") indicates that the most-current non-beta version.


### What Does "Support" Mean?

Support does not mean that everybody gets the same thing. Expecting two users using different browser software to have an identical experience fails to embrace or acknowledge the heterogeneous essence of the Web. In fact, requiring the same experience for all users creates an artificial barrier to participation. Availability and accessibility of content should be our key priority.

An appropriate support strategy allows every user to consume as much visual and interactive richness as their environment can support. This approach—commonly referred to as _progressive enhancement_ — builds a rich experience on top of an accessible core, without compromising that core.

We have done some testing in older browsers (IE 8+) and the site will 'work' but they won't have the best possible experience.