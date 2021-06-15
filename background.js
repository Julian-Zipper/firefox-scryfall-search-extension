const SOURCE_URL = "https://scryfall.com/";
const SEARCH_URL = SOURCE_URL + "search?q=";

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

/**
* Fired whenever the user's input changes, after they have focused
* the address bar and typed the keyword, followed by a space ("!scry ")
*/
browser.omnibox.onInputChanged.addListener((input, suggest) => {
	suggest(getSuggestionUrl(input));
});

/**
* Fired when the user accepts the extensions suggestion
* Opens the page based on how the user clicks on a suggestion
*/
browser.omnibox.onInputEntered.addListener((url, disposition) => {
	switch (disposition) {
		case "currentTab":
			browser.tabs.update({url});
			break;
		case "newForegroundTab":
			browser.tabs.create({url});
			break;
		case "newBackgroundTab":
			browser.tabs.create({url, active: false});
			break;
	}
});

function getSuggestionUrl(input) {
	let url = buildScryfallURL(input);
	return [{
		content: url,
		description: input
	}];
}

function buildScryfallURL(text) {
	console.log('Omnibox input changed, text is: ' + text);
	let returnUrl = SEARCH_URL + text;
	console.log('Returned url = ' + returnUrl)
	return returnUrl;
}
