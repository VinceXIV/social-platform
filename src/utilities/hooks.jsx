import {useState, useEffect} from 'react'
import { randomize } from './functions'

function useGet(url, filterIds=null, key='userId', inverse=false){
    const [state, setState] = useState([])

    useEffect(()=>{
        fetch(url)
        .then(res => {
            if(res.ok){

                res.json().then(data => {
                    if(!filterIds){
                        // Randomize it because the data returned is sorted by userIds
                        // Which means if we display it it will show all posts by one
                        // user followed by the post of another user (not good)
                        setState(randomize(data))
                    }else if(!inverse){
                        // Get the data for which the userId is in the filterIds array
                        setState(randomize(data).filter(d => {
                            return !!filterIds.find(id => id === d[key])
                        }))
                        
                    }else if(inverse){
                        // Get the data for which the userId is not in the filterIds array
                        setState(randomize(data).filter(d => {
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