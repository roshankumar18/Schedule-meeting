'use client'
import { time } from '@/utils/resource'
import React, { useEffect, useState } from 'react'
import Schedule from '../../components/Schedule'
import Prefrence from '../../components/Prefrence'
import axios from 'axios'

export  type scheduleType = {day:string,startTime:string,endTime:string}
const Set = () => {
 
    const [schedule, setSchedule] = useState<scheduleType[]>([
        { day: "Sun", startTime: "", endTime: "" },
        { day: "Mon", startTime: "", endTime: "" },
        { day: "Tue", startTime: "", endTime: "" },
        { day: "Wed", startTime: "", endTime: "" },
        { day: "Thu", startTime: "", endTime: "" },
        { day: "Fri", startTime: "", endTime: "" },
        { day: "Sat", startTime: "", endTime: "" },
    ])

    useEffect(()=>{
        async function getUserData() {
            const {user} = await (await axios.get('/api/availability')).data
            const availability:scheduleType[] = user[0].availabilty
            if(availability.length>0){
                setSchedule(availability)
            }
        }
        getUserData()
    },[])

    const [prefrenceVisible, setPrefrenceVisible] = useState<Boolean>(false)
    const [scheduleVisible, setScheduleVisible] = useState<boolean>(true);
    const updateSchedule = (updatedSchedule:scheduleType[]) =>{
        setSchedule(updatedSchedule)
    }

    const updatePrefrence = () =>{
        setPrefrenceVisible(true)
        setScheduleVisible(false)
    }
    const editSchedule = () => {
        setPrefrenceVisible(false);
        setScheduleVisible(true)
    }

    const submittPreference = (before:string, after:string , maxMeetings:string[]) =>{
        axios.post('/api/availability',{schedule,before,after,maxMeetings})
    }

  return (
    <>{
        !prefrenceVisible?<Schedule schedule={schedule} updatedSchedule={updateSchedule} updatePrefrence={updatePrefrence} />
        :<Prefrence editSchedule ={editSchedule} submitPreference={submittPreference}/>
    }
        
    </>
  )
}

export default Set