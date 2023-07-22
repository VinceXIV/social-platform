import { useRef } from "react";
import { useEffect } from "react";
import "./mobileHeader.css"
import Button from "../../elements/button/button";
import { useNavigate } from "react-router-dom";
function MobileHeader(){
    const headerRef = useRef()
    const navigate = useNavigate()

    useEffect(()=>{ 

        const btn = headerRef.current?.querySelector('button.effect1')

        btn?.addEventListener('click', toggleActiveClass)

        return ()=>{
        btn?.removeEventListener('click', toggleActiveClass)
        }
          
    }, [])

    function toggleActiveClass(){
        const sp = headerRef.current?.querySelector('span')
        sp.classList.toggle('active')
    }

    return (
        <div id="component-mobile-header">
            <Button text="Login" action={()=> navigate('login')}/>
            <div ref={headerRef} className="wrapper">
                <button className="effect1">
                    <span></span>
                </button>
            </div>
        </div>
    )
}

export default MobileHeader;