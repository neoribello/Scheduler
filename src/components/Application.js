import React from "react";
import DayList from "./DayList";
import "components/Application.scss";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"

import Appointment from "components/Appointment/index"
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  //custom hook connected to useApplicationData 
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //helper function to return the interviewers for that day
  const interviewers = getInterviewersForDay(state, state.day);

  //helper function to return the appointments for that day
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );
  
  //sidebar
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            day={state.day} 
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
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
