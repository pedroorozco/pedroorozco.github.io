/* 
Name:           Pedro Orozco
Date:		        07/16/2023
Description:	  This JS file contains code for my digital clock application. It has
                all the necessary functions, etc. for the application to run as intended.
*/

// use strict enabled and var $ declared to extract elements by id from HTML document
"use strict";
var $ = function(id) { return document.getElementById(id); };

// displayTime function creates the clock by using Date object. I use variables for hours, mins, and seconds
// I then pass these values to their corresponding span id's from HTML document 
var displayCurrentTime = function() {
  // Get the current date and time using Date object
  var currentDate = new Date();
  
  // Get the current hour, minute, and second using methods of Date object (hours, mins, sec)
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();
  var today = currentDate.toLocaleDateString('ig-ng');

  // Convert to 12-hour clock format. I use ternary operator to distinguish between using 'AM' and 'PM". I use modulo operator to maintain values of 'hour' between 1 and 12
  var ampm = (hour >= 12) ? 'PM' : 'AM';
  hour = (hour % 12) || 12;

  // Display the current time in the appropriate span tags
  $('hours').innerHTML = padSingleDigit(hour);
  $('minutes').innerHTML = padSingleDigit(minute);
  $('seconds').innerHTML = padSingleDigit(second);
  $('todays').innerHTML = today;
  $('ampm').innerHTML = ampm;
};

// Function below was given but it determines when the clock needs to add 0 in front of number. Example would be 2:14:02 or 10:00:00
var padSingleDigit = function(num) {
    return (num < 10) ? "0" + num : num;
};

window.onload = function() {
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
};