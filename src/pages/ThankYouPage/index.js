import React from "react";
import Avatar from "react-avatar";

function ThankYouPage(){
  const styles = {
    container: { 
      width: "100%", height: "100%", display: "flex",
      alignItems: "center", justifyContent: "center"
    }
  }
  return (
    <div style={styles.container}>
      <div className="Vlt-card Vlt-card--plain" style={{ width: "auto" }}>
        <div className="Vlt-card__content" style={{ display: "flex", flexDirection: "row" }}>
          <Avatar src={`https://api.adorable.io/avatars/285/CEO.png`} round={true} style={{ marginRight: 16 }}/>
          <div style={{ maxWidth: 400 }}>
            <h1>Thank You</h1>
            <p>Thank you for attending Super Town Hall. We wissh you a very good insight about the company!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ThankYouPage;