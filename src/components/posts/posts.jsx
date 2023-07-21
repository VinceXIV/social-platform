import "./posts.css"
import Post from "../post/post"
import { useDispatch, useSelector } from "react-redux";
import Paywall from "../../components/paywall/paywall";
import { useState } from "react";
import Button from "../../elements/button/button";
import { cosine } from "string-comparison";
import { setPosts } from "../../redux/posts";
import { useEffect } from "react";

function Posts({posts = []}){
    const paywalled = useSelector(state => state.paywall.paywalled)
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState('')

    useEffect(()=>{
        // Sort posts based on how similar they are with the search term
        // Here, I am using the cosine similarity for string comparison
        // Also, I am only searching for similarity in the post title
        const modifiedPosts = [...posts]
        const sortedPosts = modifiedPosts.sort((a, b)=> {
            console.log(a.body)
            return cosine.similarity(a.title, searchInput) < cosine.similarity(b.title, searchInput)
        })

        dispatch(setPosts(sortedPosts))
    }, [searchInput])

    function handleSearchInputChange(e){
        setSearchInput(e.target.value)
    }

    function searchPost(e){
        e.preventDefault()

    }

    return (
        <div id="section-posts" className="section">
            {
                // Show the paywall if the user is paywalled
                // User is paywalled after viewing all 20 free posts
                paywalled? <Paywall /> : ''
            }

            <form onSubmit={searchPost}>
                <label htmlFor="search">Search Post</label>
                    <input name='search' 
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search terms are compared with the post titles"
                    />
                <Button text="submit" action={searchPost} />
            </form>

            {
                posts.map(post => {
                    return <Post post={post} key={`post-${post.id}`}/>
                })
            }
        </div>
    )
}

export default Posts;