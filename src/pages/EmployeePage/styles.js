// @flow
import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
  container: { 
    width: "100vw", 
    height: "100vh", 
    display: "flex", 
    flexDirection: "row" 
  },
  leftContainer: { 
    flex: 3, 
    position: "relative" 
  },
  logoContainer: { 
    display: "flex", 
    flexDirection: "column", 
    position: "absolute", 
    top: 32, 
    right: 32, 
    zIndex: 2, 
    justifyContent: "center", 
    alignItems: "flex-end"
  },
  rightContainer: { 
    flex: 1, 
    borderLeft: "1px solid #e7ebee",
    display: "flex", 
    flexDirection: "column"
  },
  videoContainer: { 
    width: "100%", 
    height: "100%", 
    zIndex: 0,
    display: "flex",
    flexWrap: "wrap",
    "& div": {
      flexBasis: "50%",
      flexGrow: 1
    }
  },
  moderator: { 
    flex: 1, 
    borderBottom: "1px solid #e7ebee", 
    position: "relative" 
  },
  chatContainer: { 
    flex: 3, 
    display: "flex", 
    flexDirection: "column", 
    padding: 16, 
    overflowY: "scroll" 
  }
}))