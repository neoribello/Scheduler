import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData()  {

  useEffect(() => {
    //axios request here...
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      const [first, second, third] = all;
      // console.log("first", first.data, "second", second.data, "third", third.data);
      
      setState(prev => ({
        ...prev, 
        days: first.data, 
        appointments: second.data, 
        interviewers: third.data 
      }));
    })
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const setDay = day => setState({ ...state, day });

  const spotsLeft = function(daysObj, appointments) {
    let count = 0 ;
    
    for (const id of daysObj.appointments) {
      const appointment = appointments [id];
      if(!appointment.interview){
        count ++;
      }
    }
    return count;
  }

  
  const updateSpots = function (dayName, days, appointments) {
    const day = days.find (element => element.name === dayName);
    const notBooked = spotsLeft(day,appointments)
    const newArr = days.map(element => {
      if (element.name === dayName){
        console.log(element.name)
        return {...element, spots : notBooked}
      }
      return element;
    })
    console.log(newArr)
   return newArr;
 }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = updateSpots(state.day, state.days, appointments);
    console.log(spots)

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: spots
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = updateSpots(state.day, state.days, appointments);
    console.log(spots)

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments, days: spots });
    })
  }
  
  // const newDay = [...state.days]
  // console.log("spread state.days", newDay)


  // console.log("\n*** Initial Days State\n", state.days);
  
  return { state, setDay, bookInterview, cancelInterview }
}