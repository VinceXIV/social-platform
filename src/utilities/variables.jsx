// The maximum number of posts that can be viewed by a regular 
const regularUserLimit = 20 

// Here we get the value of 50rem in pixels
const mobileThreshold = 50 * parseFloat(getComputedStyle(document.documentElement).fontSize)

export { regularUserLimit, mobileThreshold }