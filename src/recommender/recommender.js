
// Here, I am implementing a simple recommendation using the 
// Naive Bayes Algorithm. 
// This function takes in the ids of viewed and liked posts, and
// also all posts then returns posts that have not been viewed yet
// sorted in the order that is likely preferred by the user. That is,
// The first value in the array of result is the most similar to those
// that the user has liked
function getRecommendations(viewedPostIds, likedPostIds, allPosts, limit=5){  
    
    // Viewed posts but not liked
    const unlikedPostIds = viewedPostIds.filter(viewedPostId => {
        for(const likedPostId of likedPostIds){
            if(likedPostId === viewedPostId){
                return false
            }
        }

        return true
    })
    
    // Probability of liking a post
    const pLiking = likedPostIds.length / viewedPostIds.length

    // Probability of viewing but not liking
    const pUnliking = 1 - pLiking

    // Get the probability of a word being part of a post the user liked
    // e.g, it may return something like {'the': 0.1, 'is': 0.03}, which
    // shows that the probability that the word 'the' being in a post they
    // liked was 0.1
    const likedPostWords = getWords(getPosts(likedPostIds, allPosts))

    const unlikedPostWords = getWords(getPosts(unlikedPostIds, allPosts))

    // These are the posts the user hasn't viewed yet. We want to return them
    // in a sorted way with the first on the list being the one highest on
    // recommendation
    const unviewedPosts = allPosts.filter(post => {
        for(const viewedPostId of viewedPostIds){
            if(post.id === viewedPostId){
                return false
            }            
        }
        return true
    })

    // Sort the unviewed posts in the order a user would likely like to 
    const sortedPosts =  randomize(unviewedPosts).sort((a, b) => {
        const probabilityOfLikingA  = pLikingWords(pLiking, likedPostWords, getWords([a]))
        const probabilityOfUnLikingA  = pLikingWords(pUnliking, unlikedPostWords, getWords([a]))
        const probabilityOfLikingB = pLikingWords(pLiking, likedPostWords, getWords([b]))
        const probabilityOfUnLikingB = pLikingWords(pUnliking, unlikedPostWords, getWords([b]))

        const likeUnlikeA =  probabilityOfLikingA/probabilityOfUnLikingA
        const likeUnlikeB =  probabilityOfLikingB/probabilityOfUnLikingB

        // The relative probability of liking a over simply viewing the post and nothing
        // is greater than that of b
        return likeUnlikeB - likeUnlikeA
    })

    // Pick the first n posts
    return sortedPosts.slice(0, limit)
}

// First shuffle it so that we don't end up with the same list the
// function got in in cases where there is no "training" data. That is, the
// user hasn't liked or viewed any post yet. In that case, the recommended
// list might end up looking the same as the array of post we got
function randomize(posts){
    return posts.sort(() => {
        return Math.random() - Math.random()
    })
}

// Returns the probability of liking the post given the words it has
// One thing we have avoided here is deviding the result by the probablity
// of Words being in a post at all because we will be deviding by the same 
// value for all values. Since we care more about ranking which post is
// preferred than we care about the actual exact probability, we will
// only use the numerator values. That is because we will be doing 
// probabilityOfLiking/probabilityOfUnliking that will make the denominator
// not matter. Also, it will be the same value for both the probabilities
// so they will cancel out
// Please note that I have made a few assumptions including the one that
// the probability of one word in a sentence occuring given another is the
// same as the probability of the word occuring at all (i.e, independence)
// This might make sense given the posts aren't actual sentences from people 
// making post
function pLikingWords(pLiking, wordArray, postWords){
    let probability = pLiking
    for(const word of postWords){
        probability *= pWordLiking(word, wordArray)
    }

    return probability
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
        return postIds.find(pId => pId === post.id)
    })
}

// // Takes in an array such as ['this', 'this', 'is'] and returns
// // an object showing how many times each word has been mentioned
// // in it. E.g, in this case, it will return {'this': 2, 'is': 1}
function countWords(wordArray){
    let result = {}

    for(const word of Array.from(new Set(wordArray))){
        for(const w of wordArray){
            if(w === word && result.hasOwnProperty(word)){
                result[word] += 1
            }else if(w === word && !result.hasOwnProperty(word)){
                result[word] = 1
            }
        }
    }

    return result
}

// Returns the probabily that a word being part of a post
// given the user likes the post. The wordArray is what
// our algorithm was "trained" on
function pWordLiking(targetWord, wordArray, alpha=1){
    const wordCount = countWords(wordArray)
    const targetWordCount = wordCount[targetWord] || 0

    // Incorporated the alpha smoothing factor to deal with cases when we are encountering the 
    // target word for the first time
    // https://towardsdatascience.com/laplace-smoothing-in-na%C3%AFve-bayes-algorithm-9c237a8bdece
    return (targetWordCount + alpha) / (wordArray.length + (alpha * wordArray.length))
}


// EXAMPLE

const allPosts = [
    {id: 1, title: "brown fox"},
    {id: 2, title: "the the the quick is haah"}, 
    {id: 3, title: "love is a beautiful thing"},
    {id: 4, title: "I love lasagna"},
    {id: 5, title: "the fox is cool"},
    {id: 6, title: "and now the end is near"},
    {id: 7, title: "this fox is awesome"}
]

const likedPostIds = [1, 5]
const viewedPostIds = [1, 2, 5]

// We see that that the result given the above example is.
// This is just what we expect since the liked posts both contain
// the word fox
// [
//     { id: 7, title: 'this fox is awesome' },
//     { id: 3, title: 'love is a beautiful thing' },
//     { id: 4, title: 'I love lasagna' },
//     { id: 6, title: 'and now the end is near' }
// ]
console.log(getRecommendations(viewedPostIds, likedPostIds, allPosts))


export default getRecommendations;