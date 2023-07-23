//-- This file contains functions that are used a lot in this project
//-- It porovides a way to not rewriting them again and again

function randomize(array){
    return array.sort(() => {
        return Math.random() - Math.random()
    })
}

export { randomize }

// Test
console.log(randomize([1, 2, 3, 4, 5]))