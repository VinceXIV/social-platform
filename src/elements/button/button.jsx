import "./button.css"

function Button({text, action}){
    return (
        <button onClick={action}>
            {text}
        </button>
    )
}

export default Button;