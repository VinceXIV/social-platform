import "./profile-info.css"

function ProfileInfo({name, value}){
    return (
        <div className="info">
            <p className="title">{name}</p> <p className="details">{value} </p>
        </div>
    )
}

export default ProfileInfo;