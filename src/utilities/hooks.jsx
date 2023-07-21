import {useState, useEffect} from 'react'

function useGet(url, defaultValue = []){
    const [state, setState] = useState(defaultValue)

    useEffect(()=>{
        fetch(url)
        .then(result => {
            if(result.ok){
                result.json().then(data => {
                    setState(data)
                })
            }else{
                result.json().then(error => {
                    console.warn(error)
                })
            }
        })
    }, [url])

    return [state, setState]
}

export {useGet}