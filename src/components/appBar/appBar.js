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
import BusinessIcon from "material-ui-icons/Business";
import AssesmentIcon from "material-ui-icons/Assessment";
import AssignmentIcon from "material-ui-icons/Assignment";

import Logo from "../../img/LogoText.png";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
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
    padding: "13.2px 8px",
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
    paddingLeft: '30px',
    paddingTop: '5px',
    color: 'white'
  }
});

class AppBar extends React.Component {
  state = {
    open: false
  };

  handleDrawer = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    const { classes, theme } = this.props;

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
              <Typography
                className={classes.flex}
                type="title"
                color="inherit"
                noWrap
              />
              <div>
                <IconButton className="alignRight" color="contrast">
                  <AccountCircle />
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
              <div className={classes.drawerHeader}>
                <img
                  width="34px"
                  src={Logo}
                  className="drawerLogo"
                  alt="Crescent"
                />
                <Typography className={classes.title} type="title" gutterBottom>
                  Crescent
                </Typography>
              </div>
              <Divider />
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Home" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Clients" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Suppliers" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Quotes" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <AssesmentIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Reports" />
                </MenuItem>
              </MenuList>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Typography noWrap>
              {"You think water moves fast? You should see ice."}
            </Typography>
          </main>
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
