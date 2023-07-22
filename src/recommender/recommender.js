
// Here, I am implementing a simple recommendation engine using the 
// Naive Bayes Algorithm. 
// This function expects the viewedPostIds, and likedPostIds to be
// arrays of ids of posts the user viewed or liked, respectively
// allPosts, on the other hand, is an array of objects which
// are in the form {title: "the quick brown fox", body: "blah blah blah"}
function getRecommendation(viewedPostIds, likedPostIds, allPosts){   
    // Probability of liking a post
    const pLiking = likedPostIds.length / viewedPostIds.length

    // Get the probability of a word being part of a post the user liked
    // e.g, it may return something like {'the': 0.1, 'is': 0.03}, which
    // shows that the probability that the word 'the' being in a post they
    // liked was 0.1
    let likedPostWords = getWords(getPosts(likedPostIds, allPosts))

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

    return unviewedPosts

    // Sort the unviewed posts in the order a user would likely like to 
    // view them
    // return unviewedPost.sort((a, b) => {
    //     const probabilityOfLikingA  = pLikingWords(pLiking, likedPostWords, getWords(a))
    //     const probabilityOfLikingB = pLikingWords(pLiking, likedPostWords, getWords(b))

    //     return probabilityOfLikingA > probabilityOfLikingB
    // })
}

// Returns the probability of liking the post given the words it has
// One thing we have avoided here is deviding the result by the probablity
// of Words being in a post at all because we will be deviding by the same 
// value for all values. Since we care more about ranking which post is
// preferred than we care about the actual exact probability, we will
// only use the numerator values. As such, the probability given here
// is directly proportional to the actual probability we would have obtained
// if we went all the way using the rules
// Please note that I have made a few assumptions including the one that
// the probability of one word in a sentence occuring given another is the
// same as the probability of the word occuring at all (i.e, independence)
// This might make sense given the posts aren't actual sentences from people 
// making post
function pLikingWords(pLiking, wordArray, postWords){
    const probability = pLiking
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

const allPosts = [
    {id: 1, title: "brown fox"},
    {id: 2, title: "the the the quick is haah"}, 
    {id: 3, title: "this fox is awesome"},
    {id: 4, title: "I love lasagna"},
    {id: 5, title: "the fox is cool"},
    {id: 6, title: "and now the end is near"},
    {id: 7, title: "love is a beautiful thing"}
]

const likedPosts = [1, 5]
const viewedPosts = [1, 2, 5]

const x = pWordLiking("what", "this is awesome the".split(" "))

console.log(getRecommendation(viewedPosts, likedPosts, allPosts))
