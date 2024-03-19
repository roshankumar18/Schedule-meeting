import { meeting, users } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, ne, or } from "drizzle-orm";
import { NextRequest } from "next/server";
import * as schema from  "@/lib/db/schema"
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "@/lib/db";
const db = drizzle(sql ,{schema})
import { DateTime } from 'luxon'
const dayIndexMap: Record<string, number> = {
    'Sun': 0,
    'Mon': 1,
    'Tue': 2,
    'Wef': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6,
  };
export async function POST(request:NextRequest) {
    try{
        const {userId:user1} = auth()
        const {day,meetingTime,user2} = await request.json()
        console.log(day,meetingTime,user2)
        if (user1 === null) {
            throw new Error('user is null');
          }
        const availabilityAndPrefrence = await db.query.users.findFirst({
            where:eq(users.user_id,user2),
            with:{
                availabilty:true,
                prefrence:true
            }
        })
        console.log(user2,availabilityAndPrefrence)
        const meetings = await db.select().from(meeting).where(or(eq(meeting.user1,user2),eq(meeting.user2,user2)))
        if(!availabilityAndPrefrence){
            return Response.json({ error: 'Availability or preference data not available.' }, { status: 404 });
        }
        const {availabilty, prefrence}:{availabilty:schema.Availability[]|null,prefrence:schema.Prefrence} = availabilityAndPrefrence
        
      
        if(availabilty.length===0 || prefrence===null){
            console.log('not available')
        }
        const maxMeetingsPerDayArray = prefrence.maxMeetings
        .replace(/[{}'"]/g, '')  
        .split(',')               
        
      
      const maxMeetingsPerDayNumbers = maxMeetingsPerDayArray.map(Number);
      if(maxMeetingsPerDayNumbers[day]===meetings.length){
        console.log('Maximum meetings per day limit reached.');
            return  Response.json({ error: 'Maximum meetings per day limit reached.' }, { status: 403 });
      }
      const isTimeBooked = meetings.some(meeting => {
        const meetingStart = DateTime.fromFormat(meeting.startTime, 'h:mma').minus({minutes:Number(prefrence.before)});
        const meetingEnd = meetingStart.plus({hours:1}).plus({minutes:Number(prefrence.after)})
        const proposedStartTime = DateTime.fromFormat(meetingTime, 'h:mma');
        const proposedEndTime = proposedStartTime.plus({ hours: 1 });
        return (
            meeting.day === day &&
            !(meetingEnd <= proposedStartTime || meetingStart >= proposedEndTime)
        );
    })
    if (isTimeBooked) {
        // Proposed meeting time is already booked
        console.log('The proposed meeting time is already booked.');
        return  Response.json({ error: 'The proposed meeting time is already booked.' }, { status: 409 });
    }
    const availableSlots = availabilty.filter(slot =>{
        return (slot.day === day &&
            DateTime.fromFormat(slot.startTime, 'h:mma') <= DateTime.fromFormat(meetingTime, 'h:mma') &&
            DateTime.fromFormat(slot.endTime, 'h:mma') >= DateTime.fromFormat(meetingTime, 'h:mma').plus({ hours: 1 }))
    }
        
    )
    console.log(availableSlots)


        if(availableSlots.length>0){

        await db.insert(meeting).values({user1,user2,day,startTime:meetingTime})
        return  Response.json({ message: 'Meeting scheduled successfully.' }, { status: 200 });
        }else{
            return  Response.json({ error: 'Slot not available.' }, { status: 409 });
        }
       
        
    }catch(error){
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }

}