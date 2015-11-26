---
currentMenu: FrontEndImages
---

Image Module
============


Image component. Responsive image used everywhere. 
Has optional link-wrapper.  Optional figcaption.
API example:

```
"image" : {
  "urls" :{
    "small" : {
      "url" : "/img/450x253.gif",
      "mw" : "450w"
    },
    "medium" : {
      "url" : "/img/900x506.gif",
      "mw" : "900w"
    },
    "large" : {
      "url" : "/img/1200x675.gif",
      "mw" : "1600w"
    },
    "xlarge" : {
      "url" : "/img/2400x675.gif",
      "mw" : "2400w"
    }
  },
  "altText" : "The alt text",
  "isSmall" : false, //IS THE IMAGE ONLY USED IN SIDE BAR OR SMALL WIDTH AREA
  "caption" : "This is the the optional caption text", //OPTIONAL. SHOULD NOT BE USED WHEN THERE WILL BE AN ARTICLE TITLE.
  "link" : { //OPTIONAL. IMAGE USED AS LINK
      "title" : "This is the optional link title",
      "url" : "This-is-the-optional-link-url"
  }
}
```
