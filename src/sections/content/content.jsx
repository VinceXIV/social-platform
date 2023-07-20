import "./content.css"
import Post from "../../components/post/post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paywall from "../../components/paywall/paywall";
import { paywall } from "../../redux/paywall";

function Content(){
    const {loggedIn, userType } = useSelector(state => state.user)
    const posts = useSelector(state => state.posts.posts)
    const paywalled = useSelector(state => state.paywall.paywalled)
    const dispatch = useDispatch()

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)

        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function handleScroll(e) {
        const postsSection = document.querySelector('#section-posts')

        // If a person has scrolled to bottom (meaning they have 
        // viewed all the 20 free posts), show the paywall if they
        // want to view more posts
        if(window.scrollY > 0.9 * postsSection.scrollHeight){
            dispatch(paywall())
        }
    }

    function getShowablePosts(){
        if(!loggedIn){
            // Show only 20 pots if user is not logged
            return posts.slice(0, 20)
        }else if (loggedIn && userType === 'regular'){
            // Also, only show 20 posts if they have logged
            // in but they are not premium users.
            return posts.slice(0, 20)
        }else if (loggedIn && userType === 'premium'){
            return posts
        }
    }

    return (
        <div id="section-posts" className="section">
            {
                // Show the paywall if the user is paywalled
                // User is paywalled after viewing all 20 free posts
                paywalled? <Paywall /> : ''
            }

            {
                getShowablePosts().map(post => {
                    return <Post post={post} key={`post-${post.id}`}/>
                })
            }
        </div>
    )
}

export default Content;