import "./post.css"

function Post({post}){
    return (
        <div id="component-post" className="component">
            <h2 className="title">{post.title}</h2>
            <p className="body">{post.body}</p>
        </div>
    )
}

export default Post;