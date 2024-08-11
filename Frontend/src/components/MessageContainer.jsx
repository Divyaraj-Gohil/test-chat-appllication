import React, { useState } from 'react'
import send from '../Asset/send.png'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setMessages } from '../store/slices/messageSlice'
import OtherUser from './User'

function MessageContainer() {
    const { selectedUser } = useSelector(state => state.user)
    const { messages } = useSelector(state => state.message)
    const dispatch = useDispatch()
    const [message, setmessage] = useState('')
    const handlesubmit = async (e) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`https://chat-app-oymd.onrender.com/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })
            dispatch(setMessages([...messages, res.data.newmessage]))
        } catch (error) {
            console.log(error)
        }
        setmessage('')
    }
    const keypress = (event) => {
        if (event.key === 'Enter') {
            handlesubmit()
        }
    }
    return (
        <div className='md:min-w-[550px] md:h-full h-[400px] flex flex-col bg-white'>
            {
                selectedUser ?
                    <>
                        <OtherUser user={selectedUser} />
                        {/* <div className='flex items-center gap-5 pt-3 px-5' >
                            <div className='avatar online'>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilephoto} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='w-12 rounded-full'>
                                    <p>{selectedUser?.username}</p>
                                </div>
                            </div>
                            <div className="divider px-3"></div>
                        </div> */}
                        <div ref={scroll} className="h-full bg-chat px-4 overflow-auto">
                            <Messages />
                        </div>
                        <div className='relative'>
                            <input className='outline-none text-sm rounded-r-lg w-full bg-slate-100 px-4 py-3'
                                value={message}
                                onKeyUp={keypress}
                                onChange={(e) => setmessage(e.target.value)}
                                placeholder='Type Message...' type="text" />
                            <button onClick={handlesubmit} className='h-10 w-6  absolute inset-y-0 end-4 items-center'><img className='mix-blend-multiply' src={send} alt="" /></button>
                        </div>
                    </> :
                    <div className='bg-chat flex flex-col gap-2 items-center justify-center h-full'>
                        <div className='font-extrabold text-[#9b9a9a] tracking-widest text-2xl'>Let's Chat</div>
                        {/* <div className='font-extrabold tracking-widest text-4xl text-zinc-800'>{authUser?.username}</div> */}
                    </div>
            }
        </div>
    )
}

export default MessageContainer