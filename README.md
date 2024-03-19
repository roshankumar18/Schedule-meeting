## Getting Started

To get started with this project, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/roshankumar18/Schedule-meeting.git
```
### 2. Install Dependencies
Navigate into the project directory and install the dependencies:
```bash
cd schedule-meeting
npm install
```

### 3. Set Up Environment Variables
add keys in env.local
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```
 ### 4.Run the Development Server
 ```bash
npm run dev
```



## Server-Side :

#### NeonDB : 
Selected as the database service for scalability and ease of use.It is fully managed serverless Postgres

#### Drizzle-ORM: 
Utilized for database interactions and CRUD operations. Drizzle-ORM simplifies database access with its intuitive API and efficient query execution.

#### Clerk: 
Integrated for user authentication and authorization, and easy to integrate

## Client-Server Communication:
#### Route handlers: 
Leveraged Next.js route handlers for server-side logic and data retrieval. It enable seamless communication between the client and server.

## Assumptions


Fixed Buffer Periods: Buffer periods before and after meetings are assumed to be fixed and consistent for all day  of week.

Default Meeting Duration: The default meeting duration is assumed to be one hour.

Meeting Attendee : There can only be 2 people in meeting.

## Challenge

One of the main challenges I encountered during the data modeling process was determining the appropriate structure for representing user availability. After careful consideration, I decided to create a separate table for availability slots, with each slot corresponding to a specific day of the week and containing fields for start and end times. Another challenge was defining the relationships between different entities in the data model. For example, I needed to establish relationships between users and their scheduled meetings, as well as between users and their preferences. To address this challenge, I used foreign key in meetings table to establish relationship.


## Potential Improvements and Additional Features

As of now buffer period is same for whole week , we can allow personlized buffer period for each day.
Integrate calender for better UI 


