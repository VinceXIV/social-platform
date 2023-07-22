import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileInfo from "../../components/profile-info/profile-info";
import apiHost from "../../utilities/api";
import { useGet } from "../../utilities/hooks";
import "./profile.css"

function Profile(){
    const location = useLocation()
    const loggedIn = useSelector(state => state.user.loggedIn)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!loggedIn){
            navigate('/home/feed')
        }
    }, [loggedIn])

    
    // const [userDetails, setUserDetails] = useState([])
    let userDetails = [] 

    // The path to get to this page is in the form users/:id/profile
    // we extract that id and fetch the details related to that id
    // which is then rendered
    const [,,userId] = location.pathname.split("/")
    userDetails = useGet(`${apiHost}/users/${userId}`)
    

    // userDetails is an object, which is also nested in certain instances.
    // In this function, I convert the nested object into a nested array
    // of the <ProfileInfo /> component, through recursion
    function arrayFyDetails(details, append=''){
        const result = []

        for(const key of Object.keys(details)){

            if(key === 'name' || key === 'id'){
                continue
            }

            if(typeof(details[key]) === 'string'){
                result.push(
                    <ProfileInfo key={`top-level-profile-${append}-${key}`} name={key} value={details[key]}/>
                )
            }else if(typeof(details[key]) === 'object'){
                result.push(
                    <div key={`second-level-profile-${append}-${key}`} className="detail">
                        <p className="title">{key}</p>
                        <div className="sub-detail">
                            {
                                arrayFyDetails(details[key], key)
                            }
                        </div>
                    </div>
                )
            }
        }

        return result;
    }

    

    return (
        <div id="page-profile" className="page">
            <div className="container">
                <div id="section-profile" className="content">
                    <h1 className="user-name">{userDetails[0].name}</h1>
                    <div className="user-info">{ arrayFyDetails(userDetails) }</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;