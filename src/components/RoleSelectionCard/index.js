import React from "react";

function RoleSelectionCard(props){
  const { title, subtitle } = props;

  const handleClick = () => {
    if(props.onClick) props.onClick();
  }

  return (
    <div className="Vlt-card Vlt-bg-white Vlt-card--clickable" style={{ maxWidth: "30vw" }} onClick={handleClick}>
      <div className="Vlt-card__content">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default RoleSelectionCard;