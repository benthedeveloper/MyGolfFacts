/*
 * Scripts for MyGolfFacts
 * 
 * Ben Harrison - 2013
*/

// Global Variables
var save_putts,
	save_fairways_hit,
	save_gir,
	save_pen_strokes,
	save_upndowns,
	save_sand_saves;

document.addEventListener("deviceready", onDeviceReady, false);
// Runs when the device is ready
function onDeviceReady() {
    // Now safe to use the Cordova API
    // Set up the user's settings if localStorage is empty. Ripple has one entry, so check if length <= 1
    if(window.localStorage.length <= 1) {
    	saveSettings(); // initally all checkboxes are checked, so just call saveSettings to save this to localStorage
    }
} // end onDeviceReady


// Set checkboxes on settings page
$(document).delegate('#settings', 'pageinit', function() {
	// loop through checkboxes on settings page
	$('#settings input').each(function(index) {
		// get the matching setting in localStorage
		var currSetting = window.localStorage.getItem($(this).attr('id')); // currSetting var is the value
		// set checkbox property to what the value of currSetting is ("true" or "false")
		if (currSetting === "false") {
			// if currSetting is "false" string in localStorage, set checked property to false boolean
			$(this).prop('checked', false).checkboxradio('refresh');
		} else {
			// otherwise set checked property to true
			$(this).prop('checked', true).checkboxradio('refresh');
		}
	});
	
	// handle tapping cancel button - set checkboxes back to what's currently in localStorage
	// and do not save to localStorage
	$('#settings_cancel').on('tap', cancelSettings);
	
	// handle tapping save button - save checkbox settings to localStorage
	$('#settings_save').on('tap', saveSettings);
});


// Saves the user's settings upon clicking save_settings button
function saveSettings() {
	// Save the id of the checkbox as the key, and the checked property as the value for
	// each checkbox on settings page
	var key, value;
	$('#settings input').each(function(index) {
		key = $(this).attr('id'); // example: "chk_settings_putts"
		value = $(this).prop('checked'); // will be "true" or "false"
		window.localStorage.setItem(key, value); // save to localStorage
	});
}


// Cancels the user's settings upon clicking cancel_settings button
function cancelSettings() {
	// Set checkboxes on settings screen to what is currently in localStorage, do not save anything
	$('#settings input').each(function(index) {
		// get the matching setting in localStorage
		var currSetting = window.localStorage.getItem($(this).attr('id')); // currSetting var is the value
		// set checkbox property to what the value of currSetting is ("true" or "false")
		// also need to refresh to update visual styling
		if (currSetting === "false") {
			// if currSetting is "false" string in localStorage, set checked property to false boolean
			$(this).prop('checked', false).checkboxradio('refresh');
		} else {
			// otherwise set checked property to true
			$(this).prop('checked', true).checkboxradio('refresh');
		}
	});
}
