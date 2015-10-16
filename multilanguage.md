---
currentMenu: Multi Language
---

Multi Language
============

The Stadion platform fully supports multiple languages using the native features of sitecore and umbraco. When we render any text, we pull it form the 'Dictionary' in the CMS.

![Translation Dictionary](TranslationDictionary.PNG)

To get the translated version of text, you can call the following method. We store all keys in the static 'TranslationKeys class'.

```
translationService.GetText(TranslationKeys.Core.AUTHOUR_LABEL_TEXT);
```


The translationService variable can be created by injecting it in your constructor or like so:

```
   var translationService = SystemContainer.Instance().GetInstance<ITranslationService>();
```