export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.filter(elem => elem.name === day);

  if(!filteredDays.length) {
    return [];
  }

  console.log(filteredDays)
  console.log(filteredDays[0].appointments)

  return filteredDays[0].appointments.map(id => state.appointments[id])
}