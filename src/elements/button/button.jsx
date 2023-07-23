import "./button.css"

function Button({text, action, outline='#f7f7ff'}){
    return (
        <button onClick={action} style={{outline: outline}}>
            {text}
        </button>
    )
}

export default Button;