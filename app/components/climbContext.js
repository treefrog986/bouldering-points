"use client"
import { createContext, use, useContext, useEffect, useState } from "react";
export const ClimbContext = createContext()
export function ClimbContextProvider({ children , getClimbs, putClimbs}) {
    const getZero = x=>(x<10?`0${x}`:x)
    const getMonday = ()=>{
        var prevMonday = new Date();
        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
        return `${getZero(prevMonday.getMonth() + 1)}/${getZero(prevMonday.getDate())}/${getZero(prevMonday.getFullYear().toString().slice(-2))}`;
    }
    const [user, setUser] = useState(null)
    const [climbs, setClimbs] = useState({
      yellow:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      red:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      green:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      purple:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      orange:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      black:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      blue:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},     
      pink:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},
      white:{completed: {count: 0, climb_id: null}, attempted: {count: 0, climb_id: null}},  
    })
    const fetchClimbs = async (id)=>{
      console.log(user)
      const res = await getClimbs(id)
      setClimbs(prev=>{
        for (const climb of res) {
          console.log(climb)
          const color = climb.color.toLowerCase()
          prev[color][climb.status] = {count: climb.count, climb_id: climb.climb_id}
        }
        return prev
      })
      }

      const editClimbs = (color, status, increment) => {
        setClimbs((prevClimbs) => ({
          ...prevClimbs,
          [color]: {
            ...prevClimbs[color],
            [status]: {
              ...prevClimbs[color][status],
              count: Math.max(0, prevClimbs[color][status].count + increment), // Prevent negative counts
            },
          },
        }));
      };
      const saveClimbs = async () => {
        const res = await putClimbs(user.id, climbs, getMonday())
        console.log(res)
      }
  return (
    <ClimbContext.Provider value={{ user, setUser, climbs, setClimbs, fetchClimbs, editClimbs, saveClimbs, getMonday }}>
      {children}
    </ClimbContext.Provider>
  );
}