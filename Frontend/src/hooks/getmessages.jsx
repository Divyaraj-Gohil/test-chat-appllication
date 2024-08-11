import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../store/slices/messageSlice'

const getmessages = () => {
    const { selectedUser } = useSelector(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (selectedUser) {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`https://chat-app-oymd.onrender.com/api/v1/message/${selectedUser?._id}`, {
                        headers: {
                            'content-Type': 'application/json',
                        },
                        withCredentials: true,
                    })
                    dispatch(setMessages(res.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages()
    }, [selectedUser])
}

export default getmessages