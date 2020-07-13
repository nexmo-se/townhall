// @flow
import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
  visible: { display: "inherit" },
  black: { backgroundColor: "black" },
  hidden: { display: "none !important" },
  videoControl: { marginTop: 16 },
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
  layoutContainer: { 
    width: "100%", 
    height: "100%", 
    zIndex: 0
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
  },
  smallVideoContainer: {
    height: "20%",
    width: "70%",
    position: "absolute",
    bottom: 0,
    "& div": {
      marginLeft: 8,
      marginRight: 8,
      borderRadius: "25%",
      height: "150px !important",
      width: "150px !important",
      overflow: "none",
      flexGrow: 0,
      flexBasis: "unset"
    },
    "& div > .OT_bar": { display: "none" },
    "& div > .OT_name": { display: "none" }
  }
}))