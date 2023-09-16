"use client";
import React, { useEffect, useState } from 'react'
import Button from './Button';
import CountUpLabel from './CountUpLabel';

const Dashboard = () => {

  const [swipeStatus, setswipeStatus] = useState({ text: "Swipe In", currentStatus: false, color: "green", name: 'swipe', disable: false });
  const [breakStatus, setBreakStatus] = useState({ text: "Take a Break", currentStatus: false, color: "sky", name: 'break', disable: true, startTime: null, endTime: null });

  const [timeHistory, setTimeHistory] = useState([]);
  const [startTime, setStartTime] = useState(null);

  //setEndDate(new Date());

  const handleClick = (evnt) => {
    switch (evnt.target.name) {
      case swipeStatus.name:
        setswipeStatus(prev => ({
          ...prev,
          text: !prev.currentStatus ? "Swipe Out" : "Swipe In",
          color: !prev.currentStatus ? "red" : "green",
          currentStatus: !prev.currentStatus
        }));

        setBreakStatus(prev => ({
          ...prev,
          disable: !prev.disable
        }));

        if (!swipeStatus.currentStatus) {
          setStartTime(Date.now());
        } else {
          setTimeHistory(prev => ([
            ...prev,
            { start: startTime, end: Date.now(),type: 'swipe' }
          ]));
          setStartTime(null);
        }

        break;
      case breakStatus.name:
        setBreakStatus(prev => ({
          ...prev,
          text: !prev.currentStatus ? "Back to Work" : "Take a Break",
          color: !prev.currentStatus ? "yellow" : "sky",
          currentStatus: !prev.currentStatus
        }));

        if (!breakStatus.currentStatus) {
          setTimeHistory(prev => ([
            ...prev,
            { start: startTime, end: Date.now(),type: 'swipe' }
          ]));
        } else {
          setTimeHistory(prev => ([
            ...prev,
            { start: startTime, end: Date.now(), type: 'break' }
          ]));
        }
        setStartTime(Date.now());

        break;
    }
  }
  useEffect(() => {
    console.log('swp-brk',timeHistory);
  })


  const calculateDuration = (initialDate, finalDate) => {
    iDate = Date(finalDate);
    fDate = Date(initialDate);
    return ({
      hours: iDate.getHours() - fDate.getHours(),
      minutes: iDate.getMinutes() - fDate.getMinutes(),
      seconds: iDate.getSeconds() - fDate.getSeconds()
    });
  }


  return (
    <div>
      <Button status={swipeStatus} handler={handleClick} />
      <Button status={breakStatus} handler={handleClick} />
      <CountUpLabel text={"swp strt"} name={"inTime"} />
      <CountUpLabel text={"brk strt"} name={"outTime"} />
    </div>
  )
}

export default Dashboard