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
import PeopleIcon from "material-ui-icons/People";
import CoursesIcon from "material-ui-icons/ChromeReaderMode";
import AssignmentIcon from "material-ui-icons/Assignment";
import AttachIcon from "material-ui-icons/Attachment";
import Logout from "material-ui-icons/PowerSettingsNew";
import { Link } from "react-router-dom";

import Logo from "../../images/LogoText.png";

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
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
    })
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
    padding: "13.5px 8px",
    color: "white",
    fontSize: "25px",
    backgroundColor: "#c50003"
  },
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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
    paddingLeft: "30px",
    paddingTop: "5px",
    color: "white"
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
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawer}
                className={classNames(classes.menuButton, this.state.open)}
              >
                <MenuIcon />
              </IconButton>
              <div>
                <IconButton className="alignRight" color="contrast">
                  <Logout onClick={this.logOut} />
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
                    className="drawerLogo"
                    alt="Crescent"
                  />
                  <Typography
                    className={classes.title}
                    type="title"
                    gutterBottom
                  >
                    Crescent
                  </Typography>
                </div>
              </Link>
              <Divider />
              <MenuList>
                <Link to="/home">
                  <MenuItem>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Home" />
                  </MenuItem>
                </Link>
                <Link to="/course/view">
                  <MenuItem>
                    <ListItemIcon>
                      <CoursesIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Courses" />
                  </MenuItem>
                </Link>
                <Link to="/tests/view">
                  <MenuItem>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Tests" />
                  </MenuItem>
                </Link>
                <MenuItem>
                  <ListItemIcon>
                    <AttachIcon />
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
