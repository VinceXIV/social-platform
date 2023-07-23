//-- This file contains functions that are used a lot in this project
//-- It porovides a way to not rewriting them again and again


// The maximum number of posts that can be viewed by a regular 
const postViewLimit = 20

// Here we get the value of 50rem in pixels
const mobileThreshold = 50 * parseFloat(getComputedStyle(document.documentElement).fontSize)

export { postViewLimit, mobileThreshold }