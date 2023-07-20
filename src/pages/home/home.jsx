import "./home.css"
import Posts from "../../sections/posts/posts"

function Home(){
    return (
        <div id="page-home" className="page">
            <div className="container">
                <Posts />
            </div>
        </div>
    )
}

export default Home;