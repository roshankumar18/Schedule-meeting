import { NextRequest } from "next/server";

import { auth } from "@clerk/nextjs";
import * as schema from  "@/lib/db/schema"
import { Availability, availability, users,prefrence } from "@/lib/db/schema";
import { sql } from "@/lib/db";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
const db = drizzle(sql ,{schema})
type scheduleType = {
    day:string,
    startTime:string,
    endTime:string
}
export async function POST(request: NextRequest) {
    try {
        const { userId } = auth()
        const {schedule,before ,after,maxMeetings}:{schedule:scheduleType[],before:string,after:string,maxMeetings:string} = await request.json()

        

        if (before === null || after === null || maxMeetings === null || userId === null) {
            throw new Error('Preference data cannot contain null values');
          }
        const getPrefrence = await db.select().from(prefrence).where(eq(prefrence.user_id,userId))
        if(!getPrefrence.length){
            await db.insert(prefrence).values({before, after,maxMeetings,user_id:userId})
        }else{
            await db.update(prefrence).set({before,after,maxMeetings}).where(eq(prefrence.user_id,userId))
        }


        const getAvailability = await db.select().from(availability).where(eq(availability.user_id,userId))
        if(!getAvailability.length){
            
            const newAvailability:Availability[] =  schedule.map((sch:scheduleType)=>({day:sch.day,startTime:sch.startTime,endTime:sch.endTime,user_id:userId}))
            await db.insert(availability).values(newAvailability)
        }else{
            schedule.map(async(sch:scheduleType)=>{
                await db.update(availability).set({day:sch.day,startTime:sch.startTime,endTime:sch.endTime}).where(eq(availability.user_id,userId))
            })
        }
        
        
        
        return Response.json({succes:true})
    }catch(error){
        console.error("Error:", error);
      
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request:NextRequest) {
    try{
        const {userId} = auth()
        const user = await db.query.users.findMany({
            where:eq(users.user_id,userId!),
            with:{
                availabilty:true,
                prefrence:true
            }
        })
        
        return Response.json({user})
    }catch(error){
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }

}