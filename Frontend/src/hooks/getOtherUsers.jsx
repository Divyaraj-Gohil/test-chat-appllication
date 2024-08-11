import React, { useEffect } from 'react'
import axios from 'axios'
import api from '../api.js'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../store/slices/useSlice'
const getOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await api.get('https://chat-app-oymd.onrender.com/api/v1/user/getOtherUser')
                dispatch(setOtherUsers(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    }, [])
}

export default getOtherUsers