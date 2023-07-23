import "./posts.css"
import Post from "../post/post"
import { useDispatch, useSelector } from "react-redux";
import Paywall from "../../components/paywall/paywall";
import { useState } from "react";
import Button from "../../elements/button/button";
import { cosine } from "string-comparison";
import { setPosts } from "../../redux/posts";

function Posts(){
    const paywalled = useSelector(state => state.paywall.paywalled)
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState('')
    const blockedUsers = useSelector(state => state.user.blocked)
    const blockedPosts = useSelector(state => state.posts.blocked)
    const posts = useSelector(state => state.posts.posts)

    function getShowable(posts){
        // Return only posts that are not blocked or the people who
        // created the post are not blocked
        return posts.filter(post => {
            const postIsNotBlocked = !blockedPosts.find(blockedPostId => blockedPostId === post.id)
            const userIsNotBlocked = !blockedUsers.find(blockedUserId => blockedUserId === post.userId)
            return postIsNotBlocked && userIsNotBlocked
        })
    }

    function sortBasedOnSearchTerm(posts, e){
        e?.preventDefault()

        // Sort posts based on how similar they are with the search term
        // Here, I am using the cosine similarity for string comparison
        // Also, I am only searching for similarity in the post title
        const modifiedPosts = [...posts]
        const sortedPosts = modifiedPosts.sort((a, b)=> {
            return cosine.similarity(a.title, searchInput) < cosine.similarity(b.title, searchInput)
        })

        dispatch(setPosts(sortedPosts))        
    }

    function handleSearchInputChange(e){
        setSearchInput(e.target.value)
    }

    return (
        <div id="section-posts" className="section">
            {
                // Show the paywall if the user is paywalled
                // User is paywalled after viewing all 20 free posts
                paywalled? <Paywall /> : ''
            }

            <form onSubmit={(e)=>sortBasedOnSearchTerm(posts,e)}>
                <label htmlFor="search">Search Post</label>
                <div className="width-n-input">
                    <input name='search' 
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search terms are compared with the post titles"
                    />
                <Button text="submit" action={(e)=>sortBasedOnSearchTerm(posts,e)} />
                </div>
            </form>

            <div className="posts">
                {
                    getShowable(posts).map(post => {
                        return <Post post={post} key={`post-${post.id}`}/>
                    })
                }
            </div>

        </div>
    )
}

export default Posts;