import React from "react";

function Button(props){
  const { text, style } = props;

  const handleClick = (e) => {
    e.preventDefault();
    if(props.onClick) props.onClick();
  }

  return <button className="Vlt-btn Vlt-btn--primary Vlt-btn--app" style={style} onClick={handleClick} type="submit">{text}</button>
}
export default Button;