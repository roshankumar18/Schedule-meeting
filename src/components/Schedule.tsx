'use client'
import { time } from '@/utils/resource'
import React, { useEffect, useState } from 'react'
import { scheduleType } from '../app/availability/page'
import axios from 'axios'

interface ScheduleInterface {
    schedule:scheduleType[],
    updatedSchedule :(updatedSchedule:scheduleType[])=>void,
    updatePrefrence:()=>void
}

const Schedule = ({schedule,updatedSchedule,updatePrefrence}:ScheduleInterface) => {
    

   const [error, setError] = useState<string>()
    const handleTimeChange = (e:React.ChangeEvent<HTMLSelectElement>,index:number) =>{
        const {name, value ,id} = e.target
        if(value==="Select") return
        const list = [...schedule]
        list[index][name as keyof scheduleType] = value
        updatedSchedule(list)
    }
    const filterTimeOptions = (index:number, type:string) =>{
        const {startTime} = schedule[index]
        const timeIndex = time.findIndex(({t})=>{
            return t===startTime
        })
        if(timeIndex===-1) return time
        return time.slice(timeIndex+1)
    }

    const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        let hasError = false
         hasError = schedule.some(({ startTime, endTime }) => {
            if (startTime === '' || endTime === '') {
                setError('Fill all fields')
                return true
            }else{
                return false
            }
        });
    
        if(!hasError){
            updatePrefrence()
        }

    }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <form className='flex flex-col items-center' onSubmit={submitHandler} >
        <h2 className='text-3xl mb-10'>Select your availability</h2>
        {schedule.map((sch, index)=>{
            return (
                <div className='flex gap-6 mb-2 ' key={sch.day}>
                    <div className='w-9'>{sch.day}</div>
                    <label className='flex flex-col'>
                    Start Time :
                        <select className='border-[1px] p-1 mt-1 border-slate-400' 
                        name='startTime'
                        onChange={(e)=>handleTimeChange(e,index)}
                        value={sch.startTime}>    
                        <option value={'Select'} >Select</option>
                            {time.slice(0,-1).map(({id,t})=>{
                                return (
                                    <option key={id} value={t} id={id}>{t}</option>
                                )
                            })}
                        </select>
                    </label>
                    <label className='flex flex-col'>
                    End Time :
                    <select className='border-[1px] p-1 mt-1 border-slate-400'
                        name='endTime'
                        onChange={(e)=>handleTimeChange(e,index)}
                        value={sch.endTime}>   
                            <option value={'Select'} >Select</option>
                            {filterTimeOptions(index,'endTime').map(({id,t})=>{
                                return (
                                    <option key={id} value={t} id={id}>{t}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
            )
        })}
        <button type='submit' className='bg-blue-400 p-2 mt-4  w-52 hover:bg-blue-600'>Save</button>
        {!!error && <div className='text-red-600 text-1xl'>
            {error}</div>}
        </form>

    </div>
  )
}

export default Schedule