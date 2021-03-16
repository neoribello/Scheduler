import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const interviewersListItemClass = classnames ("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li 
      className={interviewersListItemClass} 
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}