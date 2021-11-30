import React from 'react'
import { useNavigate } from 'react-router'

const Success = () => {
    const navigate = useNavigate()
    console.log("🚀 ~ file: Success.jsx ~ line 6 ~ Success ~ navigate", navigate)
    
    return (
        <div>
            success
        </div>
    )
}

export default Success
