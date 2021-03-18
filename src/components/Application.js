import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import InterviewList from "./InterviewerList";
import "components/Application.scss";

import Appointment from "components/Appointment/index"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');
  
  useEffect(() => {
    //axios request here...
    const URL = `api/days`
    axios.get(URL).then(res => {
      setDays([...res.data])
    });
  }, [days])

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        { appointments.map(appointment => 
          <Appointment key={appointment.id} {...appointment} />
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
