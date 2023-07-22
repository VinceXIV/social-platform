import { useRef, useState } from "react";
import { useEffect } from "react";
import "./mobileHeader.css"
import Button from "../../elements/button/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function MobileHeader({actions, getActiveState}){
    const [showActions, setShowActions] = useState(false)
    const headerRef = useRef()
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state.user.loggedIn)

    useEffect(()=>{ 
        const btn = headerRef.current?.querySelector('button.effect1')
        btn?.addEventListener('click', toggleShowActions)

        return ()=>{
            btn?.removeEventListener('click', toggleShowActions)
        }     
    }, [])

    function toggleShowActions(){
        setShowActions(showActions => !showActions)
    }

    function handleActionClick(page){
        navigate(page)

        setTimeout(setShowActions(false), 1000)
    }

    return (
        <div id="component-mobile-header">
            {
                loggedIn ? 
                    <Button text="Logout" action={()=>dispatch(logout())} />
                :   <Button text="Login" action={()=> navigate('login')}/>
            }
            
            {/* The hurmbuger icon */}
            <div ref={headerRef} className="wrapper">
                <button className="effect1">
                    <span className={showActions? 'active': ''}></span>
                </button>
            </div>

            {/* the options e.g feed, my posts, etc */}
            <div className={`actions-container ${showActions? '': 'display-none'}`}>
                <ul className="actions">
                    {
                        actions.map((action, i) => {
                            return (
                                <li key={`desktop-action-${i}`} className={`action ${getActiveState(action.path)}`}
                                    onClick={()=>handleActionClick(action.path.slice(1))}>
                                    {action.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default MobileHeader;