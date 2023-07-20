import "./home.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import Content from "../../sections/content/content"

function Home(){
    const loggedIn = useSelector(state => state.user.loggedIn)

    useEffect(()=>{


    }, [loggedIn])

    return (
        <div id="page-home" className="page">
            <div className="container">
                <Content />
            </div>
        </div>
    )
}

export default Home;