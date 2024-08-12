import React, { useState } from 'react'
import search from '../Asset/search.png'
import OtherUsers from './OtherUsers'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setOnlineUsers, setSelectedUser } from '../store/slices/useSlice'
import OtherUser from './User'

function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const {onlineUsers} = useSelector(store=>store.user)
    const { authUser } = useSelector(store => store.user)
    const { otherUsers } = useSelector(state => state.user)
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const handlelogout = async () => {
        try {
            const res = await axios.get('https://temp-7grl.onrender.com/api/v1/user/logout', {
                headers: {
                    'content-Type': 'application/json',
                },
            })
            if (res) {
                dispatch(setSelectedUser(null))
                dispatch(setAuthUser(null))
                // dispatch(setOnlineUsers())
                localStorage.removeItem('authUser')
                toast.info('Logged out...')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filterUsers = (query) => {
        const searchTerm = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive search

        return otherUsers?.otherUser?.filter(user => {
            const { username } = user; // Assuming these properties for matching
            return (
                username.toLowerCase().includes(searchTerm)
            );
        });
    }

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredUsers = filterUsers(query);
        setSuggestions(filteredUsers);
    };
    const suggestUser = (username) => {
        const isuser = otherUsers?.otherUser?.find((user) => user.username.includes(username))
        dispatch(setSelectedUser(isuser))
        setSearchQuery('')
        setSuggestions('')
    }

    return (
        <div className='border-r md:w-auto w-screen  md:h-full h-[260px] bg-white border-stone-300 mp-4 flex flex-col'>
            <form className='flex items-center justify-center md:justify-normal relative'>
                <input className='input input-bordered mt-3 rounded-lg'
                    onChange={handleInputChange}
                    value={searchQuery}
                    placeholder='search...' type="text" />
                <button disabled className='hidden md:block md:h-15 md:w-10 md:absolute md:inset-y-0 md:end-0 md:items-center'><img src={search} alt="" /></button>
            </form>
            {suggestions !== '' &&
                <ul className='my-1 px-5 rounded-md bg-slate-200 cursor-pointer w-full h-36 md:h-16 overflow-auto'>
                    {suggestions.map(user => (
                        <li onClick={() => suggestUser(user.username)} key={user.id}>{user.username}</li>
                    ))}
                </ul>
            }
            {/* <div className="divider px-3"></div> */}
            <div className='h-full mt-2 overflow-auto'>
                <OtherUsers />
                {/* <OtherUsers />
                <OtherUsers />
                <OtherUsers /> */}
            </div>
            <div className='mt-4 flex justify-between'>
                <div className={`flex items-center shadow-md gap-5 rounded-lg p-2 `} >
                    <div className={`avatar online`}>
                        <div className='w-12 rounded-full'>
                            <img src={authUser?.profilephoto} alt="" />
                        </div>
                    </div>
                    <div className='w-28'>
                        <div className='w-full rounded-full'>
                            <p className='w-full cursor-default overflow-auto'>{authUser?.username}</p>
                        </div>
                    </div>
                </div>
                <button onClick={handlelogout} className="btn btn-active mt-4 bg-black hover:text-black hover:bg-white  text-white">Logout</button>
            </div>
        </div>
    )
}

export default Sidebar