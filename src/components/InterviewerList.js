import React from 'react'

import "components/InterviewList.scss";
import InterviewerListItem from './InterviewerListItem'

import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const parsedInterviewerList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event=> props.setInterviewer(interviewer.id)}
      />
    )
  });
  
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerList}
        </ul>
    </section>
  )
}

