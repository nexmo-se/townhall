// @flow
import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
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
    flex: 1, 
    position: "relative",
    display: "flex", 
    flexWrap: "wrap",
    "& div": {
      flexBasis: "100%",
      flexGrow: 1
    }
  },
  liveBadge: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 32,
    right: 32
  }
}))