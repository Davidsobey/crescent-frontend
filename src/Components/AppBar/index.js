import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Drawer from "material-ui/Drawer";
import MuiAppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List from "material-ui/List";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import { IconButton } from "material-ui";
import MenuIcon from "material-ui-icons/Menu";
import HomeIcon from "material-ui-icons/Home";
import AccountCircle from "material-ui-icons/AccountCircle";
import { MenuList, MenuItem } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import { ListItemIcon, ListItemText } from "material-ui/List";
import CoursesIcon from "material-ui-icons/ChromeReaderMode";
import AssignmentIcon from "material-ui-icons/Assignment";
import AttachIcon from "material-ui-icons/Attachment";
import Logout from "material-ui-icons/PowerSettingsNew";
import { Link } from "react-router-dom";

import ExpandableMenuItem from '../../Components/ExpandableMenuItem'
import Logo from "../../images/LogoBackground.png";
import { amber500 } from "material-ui/colors";
import { amber100 } from "material-ui/colors";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "0px",
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: "absolute",
    zIndex: 1301,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.secondary[500]
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: theme.palette.primary[500],
    overflowX: "hidden"
  },
  drawerPaperClose: {
    width: 60,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    height: "64px",
    fontSize: "25px",
    backgroundColor: "white"
  },
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#e2e2e2",
    padding: 24,
    marginTop: 56
  },
  iconRight: {
    justifyContent: "space-between"
  },
  flex: {
    flex: 1
  },
  title: {
    paddingLeft: "15px",
    paddingTop: "5px",
    color: "white"
  },
  accentColor: {
    color: theme.palette.accent[500],
    margin: "auto",
    width: "85px",
    borderBottom: "1px solid"
  }
});

class AppBar extends React.Component {
  state = {
    open: true
  };

  handleDrawer = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  logOut = () => {
    console.log("Logout");
  };

  render() {
    const { classes, theme, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <MuiAppBar
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              className={classes.iconRight}
              disableGutters={!this.state.open}
            >
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawer}
                className={classNames(
                  classes.menuButton,
                  this.state.open,
                  classes.secondary
                )}
              >
                <MenuIcon />
              </IconButton>
              <div>
                <IconButton className="alignRight">
                  <Logout className={classes.secondary} onClick={this.logOut} />
                </IconButton>
              </div>
            </Toolbar>
          </MuiAppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <Link to="/home">
                <div className={classes.drawerHeader}>
                  <img
                    width="34px"
                    src={Logo}
                    alt="Crescent"
                    className="drawerLogo"
                  />
                  <Typography
                    className={classes.title}
                    type="body2"
                    gutterBottom
                  />
                </div>
              </Link>
              <Divider />
              <MenuList>
                <Typography className={classes.accentColor} type="subheading">
                  Admin View
                </Typography>
                <Link to="/home">
                  <MenuItem>
                    <ListItemIcon>
                      <HomeIcon className={classes.secondary} />
                    </ListItemIcon>
                    <ListItemText inset primary="Home" />
                  </MenuItem>
                </Link>
                <ExpandableMenuItem target="Course" option1="Create" option2="List"/>
                <Link to="/assesments/view">
                  <MenuItem>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.secondary} />
                    </ListItemIcon>
                    <ListItemText inset primary="Assesments" />
                  </MenuItem>
                </Link>
                <MenuItem>
                  <ListItemIcon>
                    <AttachIcon className={classes.secondary} />
                  </ListItemIcon>
                  <ListItemText inset primary="Course Material" />
                </MenuItem>
              </MenuList>
            </div>
          </Drawer>
          <main className={classes.content}>{children}</main>
        </div>
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AppBar);
