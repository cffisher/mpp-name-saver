// ==UserScript==
// @name         Name Saver for Multiplayer Piano - Promotor
// @namespace    https://github.com/slowstone72/MPP-name-saver
// @version      1.0.8
// @license      Unlicense
// @description  Promotor for the Name Saver script. Auto-Save & Set your nickname on Multiplayer Piano. No more 'Anonymous.'
// @author       Callum Fisher <cf.fisher.bham@gmail.com>
// @match        *://multiplayerpiano.com/*
// @grant        none
// ==/UserScript==

/*
	"Name Saver for Multiplayer Piano - Promotor"
	2025.01.04 - 2025.01.07

	As of writing, Multiplayer Piano (<https://multiplayerpiano.com>) still doesn't save your nickname.
	This is a simple script that attempts to rectify this issue.

	Userscript: https://greasyfork.org/scripts/522853

	Repository: https://github.com/slowstone72/MPP-name-saver

	Callum Fisher <cf.fisher.bham@gmail.com>

	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.

	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	For more information, please refer to <https://unlicense.org/>
*/

const startNameSaverPromotor = () => {

	// Define meta info:

	let version = '1.0.8';

	let logPrefix = `[Name Server for Multiplayer Piano Promotor v${version}] `;

	// Display a small start-up message in console:

	console.log(`${logPrefix}Running.`);

	// Define the adChannel:

	let adChannel = 'test/Save Your Nickname';

	// Are we in the adChannel?

	if (MPP.client.channel._id !== adChannel) { // No, do not proceed:
		console.log(`${logPrefix}Cancelled - Not in correct channel.`);
		return;
	}

	// Define anti-spam message send function:

	let lastMessage = {
		t: Date.now(),
		m: ''
	}

	let sendMessage = input => {
		if (input === lastMessage.m && Date.now() - lastMessage.t < 30000) return;
		lastMessage = {
			t: Date.now(),
			m: input
		}
		MPP.chat.send(input);
	}

	// Define ad message & ad send function:

	let ad = 'Hi, %name%. M.P.P. doesn\'t save your nickname by default, so I made a simple userscript to try to fix that. If you\'re interested, try it out: bit.ly/SaveOurNames (https://greasyfork.org/scripts/522853)';
	let sendAd = msg => {
		if (MPP.client.channel._id !== adChannel || msg.id === MPP.client.getOwnParticipant().id) return;
		sendMessage(ad.replace(/%name%/g, msg.name));
		lastAdMsg = Date.now();
	}

	// Listen for users joining the channel:

	MPP.client.on('participant added', sendAd); // sendAd on user join

}

// Start:

if (!window.addEventListener) {
	window.attachEvent('onload', startNameSaverPromotor);
} else {
	window.addEventListener('load', startNameSaverPromotor);
}