import React from 'react'

import "components/InterviewList.scss";
import InterviewerListItem from './InterviewerListItem'


export default function InterviewList(props) {
  const parsedInterviewList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewList}
        </ul>
    </section>
  )
}