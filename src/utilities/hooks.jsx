import {useState, useEffect} from 'react'

function useGet(url, filterIds=null, key='userId', inverse=false){
    const [state, setState] = useState([])

    useEffect(()=>{
        fetch(url)
        .then(res => {
            if(res.ok){

                res.json().then(data => {
                    if(!filterIds){
                        setState(data)
                    }else if(!inverse){
                        // Get the data for which the userId is in the filterIds array
                        setState(data.filter(d => {
                            return !!filterIds.find(id => id === d[key])
                        }))
                        
                    }else if(inverse){
                        // Get the data for which the userId is not in the filterIds array
                        setState(data.filter(d => {
                            return !!filterIds.find(id => id !== d[key])
                        }))                    
                    }
                })
            }else{
                res.json().then(error => console.warn(error))
            }
        })

    }, [url, setState, filterIds])

    return [state, setState]
}

export {useGet}