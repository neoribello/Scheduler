export default function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.find(elem => elem.name === day);

  if(!filteredDays) {
    return [];
  }
  return filteredDays.appointments.map(id => state.appointments[id])
}