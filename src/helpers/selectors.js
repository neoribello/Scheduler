export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.find(elem => elem.name === day);

  if(!filteredDays) {
    return [];
  }

  console.log(filteredDays)
  console.log(filteredDays[0])

  return filteredDays.appointments.map(id => state.appointments[id])
}