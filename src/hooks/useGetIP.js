import { useEffect, useState } from "react"

const useGetIP  =  ()=> {
    const [state,setState] = useState('0.0.0.0')
       fetch("https://api.ipify.org/").then(r=> r.text()).then(data=>{
        setState(data)
       }) 
    return state
}

export default useGetIP