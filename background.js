const SOURCE_URL = "https://scryfall.com/";
const SEARCH_URL = SOURCE_URL + "search?q=";

/**
* Fired whenever the user's input changes, after they have focused
* the address bar and typed the keyword, followed by a space ("!scry ")
*/
browser.omnibox.onInputChanged.addListener((input, suggest) => {
	// TODO: find out how to remove the first suggestion since it leads nowhere
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
	let returnUrl = SEARCH_URL + text;
	return returnUrl;
}
