import { useSelector } from "react-redux";
import ProfileInfo from "../../components/profile-info/profile-info";
import "./profile.css"

function Profile(){
    const userDetails = useSelector(state => state.user.userDetails)

    // userDetails is an object, which is also nested in certain instances.
    // In this function, I convert the nested object into a nested array
    // of the <ProfileInfo /> component, through recursion
    function arrayFyDetails(details){
        const result = []

        for(const key of Object.keys(details)){
            if(typeof(details[key]) === 'string'){
                result.push(
                    <ProfileInfo key={`top-level-profile-${key}`} name={key} value={details[key]}/>
                )
            }else if(typeof(details[key]) === 'object'){
                result.push(
                    <div key={`top-level-profile-${key}`}>
                        <p className="title">{key}</p>
                        <div style={{paddingLeft: '2rem'}}>
                            {
                                arrayFyDetails(details[key])
                            }
                        </div>
                    </div>
                )
            }
        }

        return result;
    }


    return (
        <div id="section-profile" className="content">
            <div className="user-info">{ arrayFyDetails(userDetails) }</div>
        </div>
    )
}

export default Profile;