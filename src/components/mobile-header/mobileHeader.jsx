import { useRef, useState } from "react";
import { useEffect } from "react";
import "./mobileHeader.css"
import Button from "../../elements/button/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";


function MobileHeader({actions, getActiveState}){
    const [showActions, setShowActions] = useState(false)
    const headerRef = useRef()
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state.user.loggedIn)
    const dispatch = useDispatch()

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
                :   
                    <>
                        <ul>
                            <li className={`action header-view ${getActiveState('/home/feed')}`}
                                onClick={()=>handleActionClick('home/feed')}>
                                Feed
                            </li>
                        </ul>
                        <Button text="Login" action={()=> navigate('login')}/>
                    </>
            }
            

            {/* The hurmbuger icon */}
            <div ref={headerRef} className={`wrapper ${loggedIn? '': 'display-none'}`}>
                <button className="effect1">
                    <span className={showActions? 'active': ''}></span>
                </button>
            </div>

            {/* the options e.g feed, my posts, etc */}
            <div className={`actions-container ${showActions && loggedIn? '': 'display-none'}`}>
                <ul className="actions">
                     {
                        actions.map((action, i) => {
                            return (
                                <li key={`mobile-action-${i}`} className={`action body-view ${getActiveState(action.path)}`}
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