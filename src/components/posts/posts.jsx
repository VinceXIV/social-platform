import "./posts.css"
import Post from "../post/post"
import { useSelector } from "react-redux";
import Paywall from "../../components/paywall/paywall";
import { useState } from "react";
import Button from "../../elements/button/button";

function Posts({posts = []}){
    const paywalled = useSelector(state => state.paywall.paywalled)
    const [searchInput, setSearchInput] = useState('')

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
                <input name='search' value={searchInput} onChange={handleSearchInputChange} />
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