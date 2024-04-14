import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Error = (props: Props) => {
    const navigete=useNavigate()
 useEffect(()=>{
navigete("/")
 },[])
 return null
}

export default Error