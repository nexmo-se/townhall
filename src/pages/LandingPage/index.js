import React from "react";
import { withRouter } from "react-router-dom";

import RoleSelectionCard from "components/RoleSelectionCard";

function LandingPage(props){
  const { history } = props;

  const handleCeoClick = () => history.push("ceo");
  const handleEmployeeClick = () => history.push("employee");
  const handleModeratorClick = () => history.push("moderator");

  return (
    <div className="Vlt-container" style={{ margin: "auto" }}>
      <RoleSelectionCard title="I AM CEO" subtitle="Please make sure you are CEO, because everyone will be able to see you face." onClick={handleCeoClick}/>
      <RoleSelectionCard title="I AM EMPLOYEE" subtitle="You are here to watch CEO live. Don't worry, no one can see your face unless CEO choose you." onClick={handleEmployeeClick}/>
      <RoleSelectionCard title="I AM MODERATOR" subtitle="CEO's private secretary. Help to moderate the comments and many more" onClick={handleModeratorClick}/>
    </div>
  )
}
export default withRouter(LandingPage);