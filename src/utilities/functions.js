//-- This file contains functions that are used a lot in this project
//-- It porovides a way to not rewriting them again and again

function randomize(array){
    if(Array.isArray(array)){
        return array.sort(() => {
            return Math.random() - Math.random()
        })
    }else {
        console.warn('randomize function received the following non-array value; ', array)
        return array
    }
}

export { randomize }

// TEST
// console.log(randomize([1, 2, 3, 4, 5]))