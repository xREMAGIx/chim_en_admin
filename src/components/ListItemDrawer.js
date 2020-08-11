//Standard Modules
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StoreIcon from "@material-ui/icons/Store";
import CategoryIcon from "@material-ui/icons/Category";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BookIcon from "@material-ui/icons/Book";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import StreetviewIcon from "@material-ui/icons/Streetview";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MainListItems(props) {
  const classes = useStyles();

  const [openSaleTab, setOpenSaleTab] = React.useState(false);
  const [openShippingTab, setOpenShippingTab] = React.useState(false);
  const [openShopTab, setOpenShopTab] = React.useState(false);
  const [openAdminTab, setOpenAdminTab] = React.useState(false);

  const handleClickSaleTab = () => {
    setOpenSaleTab(!openSaleTab);
  };

  const handleClickShippingTab = () => {
    setOpenShippingTab(!openShippingTab);
  };

  const handleClickShopTab = () => {
    setOpenShopTab(!openShopTab);
  };

  const handleClickAdminTab = () => {
    setOpenAdminTab(!openAdminTab);
  };

  return (
    <List>
      {/* Dashboard */}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Dashboard</Typography>}
      >
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItem>
      </Tooltip>

      {/* Sales Menu List*/}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Sales</Typography>}
      >
        <ListItem button onClick={handleClickSaleTab}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Sales" />
          {openSaleTab ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={openSaleTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            placement="right"
            title={<Typography variant="body2">Orders</Typography>}
          >
            <ListItem
              className={classes.nested}
              button
              component={Link}
              to="/orders"
            >
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </Tooltip>
        </List>
        <List component="div" disablePadding>
          <ListItem
            className={classes.nested}
            button
            component={Link}
            to="/users"
          >
            <Tooltip
              disableFocusListener
              disableTouchListener
              arrow
              placement="right"
              title={<Typography variant="body2">Users</Typography>}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Collapse>

      {/* Shipping List*/}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Shipping</Typography>}
      >
        <ListItem button onClick={handleClickShippingTab}>
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary="Shipping" />
          {openShippingTab ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={openShippingTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            placement="right"
            title={<Typography variant="body2">Districts</Typography>}
          >
            <ListItem
              className={classes.nested}
              button
              component={Link}
              to="/districts"
            >
              <ListItemIcon>
                <StreetviewIcon />
              </ListItemIcon>
              <ListItemText primary="Districts" />
            </ListItem>
          </Tooltip>
        </List>
        <List component="div" disablePadding>
          <ListItem
            className={classes.nested}
            button
            component={Link}
            to="/cities"
          >
            <Tooltip
              disableFocusListener
              disableTouchListener
              arrow
              placement="right"
              title={<Typography variant="body2">Cities</Typography>}
            >
              <ListItemIcon>
                <LocationCityIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Cities" />
          </ListItem>
        </List>
      </Collapse>

      {/* Shop Menu List*/}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Store</Typography>}
      >
        <ListItem button onClick={handleClickShopTab}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Store" />
          {openShopTab ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={openShopTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            placement="right"
            title={<Typography variant="body2">Products</Typography>}
          >
            <ListItem
              className={classes.nested}
              button
              component={Link}
              to="/products"
            >
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Tooltip>
        </List>
        <List component="div" disablePadding>
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            placement="right"
            title={<Typography variant="body2">Categories</Typography>}
          >
            <ListItem
              className={classes.nested}
              button
              component={Link}
              to="/categories"
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
          </Tooltip>
        </List>
        <List component="div" disablePadding>
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            placement="right"
            title={<Typography variant="body2">Blogs</Typography>}
          >
            <ListItem
              className={classes.nested}
              button
              component={Link}
              to="/blogs"
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItem>
          </Tooltip>
        </List>
      </Collapse>

      {/* Admin Menu List*/}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Administration</Typography>}
      >
        <ListItem button onClick={handleClickAdminTab}>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Administration" />
          {openAdminTab ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={openAdminTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            placement="right"
            title={<Typography variant="body2">Authorization</Typography>}
          >
            <ListItem
              className={classes.nested}
              button
              component={Link}
              to="/authorization"
            >
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Authorization" />
            </ListItem>
          </Tooltip>
        </List>
      </Collapse>

      {/* Setting */}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Setting</Typography>}
      >
        <ListItem button component={Link} to="/setting">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItem>
      </Tooltip>

      {/* Logout */}
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        placement="right"
        title={<Typography variant="body2">Logout</Typography>}
      >
        <ListItem button component={Link} to="/login">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Tooltip>
    </List>
  );
}
