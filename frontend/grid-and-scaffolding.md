---
currentMenu: Grid
---

Grid and Scaffolding
============


## Summary:
The site has been built on a 12 column grid system. This is the most flexible grid for websites as it can be very flexible, is divisible by 6, 3, and 4 to allow for a flexible number of layout options. It also gives the best control when it comes to nesting. The site uses a four column grid layout for mobile, 8 column for tablet widths and 12 column for desktop.
The grid system is built upon the third party [Jeet grid system](http://jeet.gs/). It's a very flexible system and allows for margin, padding and width variables to be available and has powerful nesting capabilities. All grid classes are dynamically created in "client/styles/scaffolding.styl"
Also, it is possible to change the overall layout to be 10 column for instance. This would be acheived by changing all occurances of the "12" col declarations in this file. All content in the site has flexible width and so modules will flex to their containers. But we should stress again that it is ill advices to stray from the 12 column setup here as it has been tried and tested and is the most flexible.

## The methodology

It is best to read the Jeet docs to see what mixins is available, but the site mostly makes use of the "col" method. For example:
```
.col--2
    col(2/12, cycle: 6, gutter: gutter-percentage-desktop)
```
would create a class that when added to a number of elements within a .row container would size those elements to fit side by side with 6 to a row. To break it down:
- 2/12 - This means an item that is 2 columns wide of 12.
- cycle: 6 - This tells the system not to add a right margin to every 6th item allowing for many items to stack and be flush to the right.
- gutter: gutter-percentage-desktop - This is the size of the gutter between items, "gutter-percentage-desktop" being one of the variables available in "settings.styl". 

Other methods like:
```
column-width(2/12)
column-gutter(2/12)
```
return the raw percentage values and can be used to explicitly set values if needed.

The gutter size changes and different breakpoints as per the design for the demo site so these can be changed easily with a new design.
To see examples of all grid options in action, run the dev site and go to "http://localhost:3000/grid".

This is how the classes should then be used in markup so create layouts.
```
<div class="row">
    <article class="col--9">
        This would be the main content in this instance
    </article>
    <aside class="col--3">
        This would be secondary aside content
        <div class="aside-module">
            This would be nest content inside the layout to flex to it's parent
        </div>
    </aside>
</div>
```
Remember to keep layout and module containers seperate. This makes it easier to drop modules into layout containers without hassle.

## Gutter overlays and helpers
When viewing any page in the Expressjs site, the grid overlay can be shown with the "x" key or by clicking the "show grid" link in the top left. This overlay has been generated from [Gridpak](http://gridpak.com/) and the assets for it are available in "client/development/gridpak". This is a quick and easy way to make sure everything lines up with any designs and the grid system. It's best to decide on fixed gutter widths with the design team and then set these in the gridpak editor for each breakpoint. Design will then match development and the new files once downloaded can be dropped into the "client/development/gridpak" folder.

