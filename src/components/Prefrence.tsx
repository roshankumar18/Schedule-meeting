"use client";
import React, { useState } from "react";

interface PrefrenceProps {
  editSchedule: () => void;
  submitPreference: (
    before: string,
    after: string,
    maxMeetings: string[],
  ) => void;
}

const Prefrence = ({ editSchedule, submitPreference }: PrefrenceProps) => {
  const [bufferBefore, setBufferBefore] = useState<string>("");
  const [bufferAfter, setBufferAfter] = useState<string>("");
  const [maxMeetingsPerDay, setMaxMeetingsPerDay] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState<{
    before: string;
    after: string;
    meetings: string;
  }>({
    before: "",
    after: "",
    meetings: "",
  });
  const handleBufferBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBufferBefore(e.target.value);
  };

  const handleBufferAfterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBufferAfter(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = { before: "", after: "", meetings: "" };
    if (!bufferBefore || parseInt(bufferBefore) <= 0) {
      errors.before = "Buffer before must be a positive number";
    }

    if (!bufferAfter || parseInt(bufferAfter) <= 0) {
      errors.after = "Buffer after must be a positive number";
    }

    if (maxMeetingsPerDay.some((value) => !value || parseInt(value) <= 0)) {
      errors.meetings = "Maximum meetings per day must be positive numbers";
    }
    setError(errors);
    if (!errors.before && !errors.after && !errors.meetings) {
      submitPreference(bufferBefore, bufferAfter, maxMeetingsPerDay);
    }
  };

  const handleMaxMeetingsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedMaxMeetings = [...maxMeetingsPerDay];
    updatedMaxMeetings[index] = e.target.value.trim();
    setMaxMeetingsPerDay(updatedMaxMeetings);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2 ">
            <h2 className="text-2xl">Set Your Preferences</h2>
            <div className="flex justify-between">
              <label>Buffer Before Meetings (in minutes):</label>
              <input
                className="border-2 border-slate-500"
                type="number"
                value={bufferBefore}
                onChange={handleBufferBeforeChange}
              />
            </div>
            {error.before && <div className="text-red-600">{error.before}</div>}
            <div className="flex justify-between">
              <label>Buffer After Meetings (in minutes):</label>
              <input
                className="border-2 border-slate-500"
                type="number"
                value={bufferAfter}
                onChange={handleBufferAfterChange}
              />
            </div>
            {error.after && <div className="text-red-600">{error.after}</div>}
            <div>
              <h3 className="text-xl">Maximum Meetings Per Day</h3>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <div
                  key={day}
                  className="flex items-center justify-between gap-2 mt-2"
                >
                  <label>{day}</label>
                  <input
                    className="border-2 border-slate-500"
                    type="number"
                    value={maxMeetingsPerDay[index]}
                    onChange={(e) => handleMaxMeetingsChange(e, index)}
                  />
                </div>
              ))}
            </div>
            {error.meetings && (
              <div className="text-red-600">{error.meetings}</div>
            )}
            <button
              type="submit"
              className="bg-blue-400 p-2 mt-4  w-52 hover:bg-blue-600 self-center"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={editSchedule}
          className="bg-blue-400 p-2 mt-4  w-52 hover:bg-blue-600 self-center"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default Prefrence;
