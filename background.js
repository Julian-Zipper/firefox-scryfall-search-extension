const BASE_URL = "https://scryfall.com/";
const SEARCH_URL = BASE_URL += "search?q=";

/*
example project:
https://github.com/mdn/webextensions-examples/blob/master/firefox-code-search/background.js

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/omnibox
*/

/*
Example search urls:

bla
https://scryfall.com/search?q=bla
results in:
https://scryfall.com/search?q=bla&unique=cards&as=grid&order=name

set:STX t:warrior
https://scryfall.com/search?q=set%3ASTX+t%3Awarrior

set:STX t:spirit o:creature
https://scryfall.com/search?q=set%3ASTX+t%3Aspirit+o%3Acreature
results in:
https://scryfall.com/search?q=set%3ASTX+t%3Aspirit+o%3Acreature&unique=cards&as=grid&order=name

t:spirit t:dragon set:KHM
https://scryfall.com/search?q=t%3Aspirit+t%3Adragon+set%3AKHM
results in:
https://scryfall.com/search?q=t%3Aspirit+t%3Adragon+set%3AKHM&unique=cards&as=grid&order=name

search url: base url + /search?q=
*/