'use client'
import { time } from '@/utils/resource'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
type User = {
    name:string,
    user_id:string,
    availabilty:{day:string,startTime:string,endTime:string}[],
    prefrence:{before:string,after:string, maxMeetings:string}
}

const week: Array<string> = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const Page = () => {
    
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser,setSelectedUser] = useState<User|null>(null)
    const [day,setDay] = useState<string>('')
    const [meetingTime,setMeetingTime] = useState<string>('')
    const [error, setError] = useState<{day:string,time:string}>({day:'',time:''})
    useEffect(()=>{
        async function getUsers(){
            const {users}:{users:User[]} = (await axios.get('/api/user')).data
            setUsers(users)
        }
        getUsers()
    },[])

    const handleUserClick = async(user:User) =>{
        setSelectedUser(user)
        const res = await (await axios.get(`/api/user/${user.user_id}`)).data
        console.log(res)
    }

    const schdeuleMeeting = () =>{
        if(!selectedUser){
            toast.error('Select user')
            return
        }
        const errors = {day:'',time:''}
        setError(errors)
        if(day===''){
            errors.day = 'day cannot be empty'
        }
        if(meetingTime===''){
            errors.time = 'time cannot be empty'
        }
        if(errors.time !=='' || errors.day!==''){
            setError(errors)
            return
        }else{
            book()
        }
        
    }

    const book = async() =>{
        try{
            const res = await axios.post('/api/schedule',{
                day:day,
                meetingTime:meetingTime,
                user2:selectedUser?.user_id
            })
            toast.success('Slot Booked')
        }catch(err){
            toast.error('Slot not available.')
        }
        
    }

  return (
    <div className='h-screen w-screen flex justify-center items-center p-4  gap-4'>
        <ToastContainer hideProgressBar/>
        <div className=' flex flex-col h-96 border-2 overflow-auto p-4 flex-1'>
            <h2 className='text-3xl'>Select User</h2>
            <div >
                {users?.length>0  && users.map((user)=>
                (<div key={user.user_id} 
                    onClick={()=>handleUserClick(user)}
                    className={`${selectedUser?.user_id===user.user_id ?'bg-slate-300':''} border-2 cursor-pointer p-2 hover:bg-slate-300`}>
                    {user.name}
                </div>))}
            </div>

        </div>
        <div className='flex flex-col p-4 border-2 h-96 flex-1'>
            <h2 className='text-3xl'>Select Date and Time</h2>
            
            <div>
                <label>
                    Day
                </label>
                <select onChange={(e)=>setDay(e.target.value)}>
                    <option value={'Select'}>Select</option>
                    {week.map((day:string ,index:number)=>(
                        <option key={index} value={day}>{day}</option>
                    ))}
                </select>
                {error.day && <p className="text-red-500">{error.day}</p>}
            </div>
            <div>
                <label>Time</label>
                <select onChange={(e)=>setMeetingTime(e.target.value)} >
                    <option>Select</option>
                    {time.map((t)=>(
                        <option key={t.id} value={t.t}>{t.t}</option>
                    ))}
                </select>
                {error.time && <p className="text-red-500">{error.time}</p>}
            </div>
            <button className='bg-blue-400 p-2 mt-4  w-52 hover:bg-blue-600 self-center'
            onClick={schdeuleMeeting}>Schedule Meeting</button>
        </div>
    </div>
  )
}

export default Page