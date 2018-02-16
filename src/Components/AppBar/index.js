import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import MuiAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import { IconButton } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import AddIcon from 'material-ui-icons/Add';
import ListIcon from 'material-ui-icons/ViewList';
import CourseIcon from 'material-ui-icons/ChromeReaderMode';
import ModuleIcon from 'material-ui-icons/Assignment';
import AttachIcon from 'material-ui-icons/Attachment';
import UserIcon from 'material-ui-icons/Person';
import Logout from 'material-ui-icons/PowerSettingsNew';
import TestIcon from 'material-ui-icons/Create';
import QuestionIcon from 'material-ui-icons/QuestionAnswer';

import ExpandableMenu from '../../Components/ExpandableMenu';
import Logo from '../../Images/LogoBackground.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: '0px',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: 1301,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.secondary[500],
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.primary[500],
    overflowX: 'hidden',
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    height: '64px',
    fontSize: '25px',
    backgroundColor: 'white',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#e2e2e2',
    padding: 24,
    marginTop: 56,
  },
  iconRight: {
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  title: {
    paddingLeft: '15px',
    paddingTop: '5px',
    color: 'white',
  },
  accentColor: {
    color: 'white',
    fontSize: '14px',
  },
});

const CourseDetails = {
  listName: 'Course',
  listIcon: <CourseIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Course',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Course List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
    {
      key: 2,
      subItemName: 'Course Material',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'material',
    },
  ],
};

const ModuleDetails = {
  listName: 'Module',
  listIcon: <ModuleIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Module',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Module List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const TestDetails = {
  listName: 'Test',
  listIcon: <TestIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Test',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Test List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const QuestionDetails = {
  listName: 'Question',
  listIcon: <QuestionIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Question',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Question List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const UserDetails = {
  listName: 'User',
  listIcon: <UserIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create User',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'User List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  handleDrawer = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  logOut = () => {
    // console.log('Logout');
  };

  render() {
    const { classes, theme, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <MuiAppBar
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift,
            )}
          >
            <Toolbar
              className={classes.iconRight}
              disableGutters={!this.state.open}
            >
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawer}
                className={classNames(classes.menuButton, this.state.open)}
              >
                <MenuIcon />
              </IconButton>
              <div>
                <IconButton className="alignRight">
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
                !this.state.open && classes.drawerPaperClose,
              ),
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
                </div>
              </Link>
              <Divider />
              <MenuList>
                {this.state.open && (
                  <Typography className="user-type" type="subheading">
                    Admin View
                  </Typography>
                )}
                <Link to="/home">
                  <MenuItem>
                    <ListItemIcon>
                      <HomeIcon className={classes.accentColor} />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      className={classes.accentColor}
                      disableTypography
                      primary="Home"
                    />
                  </MenuItem>
                </Link>
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={CourseDetails}
                />
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={ModuleDetails}
                />
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={TestDetails}
                />
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={QuestionDetails}
                />
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={UserDetails}
                />
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
  theme: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppBar);
