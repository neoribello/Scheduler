import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData()  {

  useEffect(() => {
    // Grabbing the axios requests here
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // Setting to the appropriate states
      const [first, second, third] = all;
      
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
    appointments: {},
  });

  const setDay = day => setState({ ...state, day });


  //Updates the spots if its either booked or cancelled
  const spotsLeft = function(daysObj, appointments) {
    let count = 0;
    
    for (const id of daysObj.appointments) {
      const appointment = appointments[id];
      //Checks if interview is null / if its not null then count
      if(!appointment.interview){
        count ++;
      }
    }
    return count;
  }

  const updateSpots = function (dayName, days, appointments) {
    const day = days.find (element => element.name === dayName);
    const notBooked = spotsLeft(day, appointments)
    const newArr = days.map(element => {
      if (element.name === dayName){
        return {...element, spots : notBooked}
      }
      return element;
    })
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

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments, days: spots });
    })
  }
  
  return { state, setDay, bookInterview, cancelInterview }
}