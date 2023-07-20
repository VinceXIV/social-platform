import "./post.css"

function Post({post}){
    return (
        <div id="component-post" className="component">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}

export default Post;