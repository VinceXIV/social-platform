import { useRef } from "react";
import { useEffect } from "react";
import "./mobileHeader.css"

function MobileHeader(){
    const headerRef = useRef()

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
            <div ref={headerRef} className="wrapper">
                <button className="effect1">
                <span></span>
                </button>
            </div>
        </div>
    )
}

export default MobileHeader;