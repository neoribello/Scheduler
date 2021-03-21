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

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDays = [...state.days];
    for (let index in newDays) {
      let day = newDays[index]
      console.log("days[index]: ", day)
      if(day.appointments.includes(id)) {
        let updatedDay = { ...day, spots: day.spots - 1} 
        newDays[index] = updatedDay
      }
    }

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: newDays
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

    const newDays = [...state.days];
    for (let index in newDays) {
      let day = newDays[index]
      console.log("days[index]: ", day)
      if(day.appointments.includes(id)) {
        let updatedDay = { ...day, spots: day.spots + 1} 
        newDays[index] = updatedDay
      }
    }

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments, days: newDays });
    })
  }
  
  const newDay = [...state.days]
  console.log("spread state.days", newDay)


  console.log("\n*** Initial Days State\n", state.days);
  
  return { state, setDay, bookInterview, cancelInterview }
}