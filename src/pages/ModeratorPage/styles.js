// @flow
import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
  visible: { display: "inherit" },
  hidden: { display: "none !important" },
  container: { 
    width: "100%", 
    height: "100%", 
    display: "flex", 
    flexDirection: "row" 
  },
  leftPanel: { 
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 32,
    paddingLeft: 0,
    paddingRight: 0
  },
  chat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll"
  },
  centerPanel: { 
    flex: 1, 
    borderLeft: "1px solid #e7ebee", 
    borderRight: "1px solid #e7ebee",
    display: "flex", 
    flexDirection: "column", 
    padding: 32,
    paddingLeft: 0,
    paddingRight: 0
  },
  rightPanel: { 
    flex: 2, 
    position: "relative",
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
  smallVideoContainer: {
    height: "20%",
    width: "100%",
    position: "absolute",
    display: "flex",
    flexWrap: "nowrap",
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
  },
  liveBadge: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 32,
    right: 32
  }
}))