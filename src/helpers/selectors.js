export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.find(elem => elem.name === day);

  if(!filteredDays) {
    return [];
  }
  return filteredDays.appointments.map(id => state.appointments[id])
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }

  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      return { student: interview.student, interviewer: {...state.interviewers[interviewer]} }
    }
  }
}
