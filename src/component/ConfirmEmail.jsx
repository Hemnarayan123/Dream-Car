import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ConfirmEmail() {
    const { token } = useParams()
    const [message, setmessage] = useState()
    return (
        <>
        </>
    )
}

export default ConfirmEmail