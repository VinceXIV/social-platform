
// Here, I am implementing a simple recommendation engine using the 
// Naive Bayes Algorithm. 
// This function expects the viewedPostIds, and likedPostIds to be
// arrays of ids of posts the user viewed or liked, respectively
// allPosts, on the other hand, is an array of objects which
// are in the form {title: "the quick brown fox", body: "blah blah blah"}
function getRecommendation(viewedPostIds, likedPostIds, allPosts){   

    // The ids of posts the user viewed but did not like
    const unlikedPostIds = viewedPostIds.filter(viewedPostId => {
        likedPostIds.find(likedPostId => viewedPostId !== likedPostId)
    })

    // Probability of liking a post
    const pLiking = likedPostIds.length / viewedPostIds.length

    // Get the probability of a word being there in a post the user liked/did
    // not like e.g, it may return something like {'the': 0.7, 'is': 0.2}, which
    // shows that the probability that the word 'the' being in a post they
    // liked was 0.7
    let pWordLiking = pWord(getWords(getPosts(likedPostIds, allPosts)))

    // These are the posts the user hasn't viewed yet. We want to return them
    // in a sorted way with the first on the list being the one highest on
    // recommendation
    const unviewedPost = allPosts.filter(post => {
        return viewedPostIds.find(viewedPostId => viewedPostId !== post.id)
    })
}

// Returns the probability of liking the post given the words it has
// One thing we have avoided here is deviding the result by the probablity
// of Words being in a post at all because we will be deviding by the same 
// value for all values. Since we care more about ranking which post is
// preferred than we care about the actual exact probability, we will
// only use the numerator values.
// Please note that I have made a few assumptions including the one that
// the probability of one word in a sentence occuring given another is the
// same as the probability of the word occuring at all (i.e, independence)
// This might make sense given the posts aren't actual English sentences
function pLikingWords(pLiking, pWordLiking, postWords){
    // the probability_of_liking_a_post union probability_of_words
}


// Get an array of all words used in liked posts. 
// For example, if there are two titles; "The quick brown", and "fox jumps over",
// This will return ['the', 'quick', 'brown', 'fox', 'jumps', 'over']
function getWords(posts){

    let result = []
    posts.forEach(post => {
        result = [...result, ...post.title.replace(/\W/g, ' ').split(" ")]
    })

    return result
}


function getPosts(postIds, allPosts){
    return allPosts.filter(post => {
        postIds.find(pId => pId === post.id)
    })
}

// Takes in an array such as ['this', 'this', 'is'] and returns
// an object showing how many times each word has been mentioned
// in it. E.g, in this case, it will return {'this': 2, 'is': 1}
function countWords(wordArray){
    let result = {}

    for(const word of Array.from(new Set(wordArray))){
        result[word] = wordArray.reduce((w, count) => {
            if(w === word && result.hasOwnProperty(word)){
                result[word] += 1
            }else if(w === word && !result.hasOwnProperty(word)){
                result[word] = 1
            }
        })
    }

    return result
}

// Returns the normalized number of words an array contains. e.g
// if we call it with the array ['this', 'this', 'is'], it will
// return {'this': 0.67, 'is': 0.33}
function pWord(wordArray, alpha){
    const countWords = countWords(wordArray)
    
    const result = {}
    for(const word in Object.keys(countWords)){


        result[word] = (countWords[word] + alpha) / (wordArray.length + (alpha * wordArray.length))
    }

    return result
}