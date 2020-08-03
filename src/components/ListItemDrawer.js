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
import ReceiptIcon from "@material-ui/icons/Receipt";
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

export default function MainListItems() {
  const classes = useStyles();

  const [openSaleTab, setOpenSaleTab] = React.useState(false);
  const [openShopTab, setOpenShopTab] = React.useState(false);
  const [openAdminTab, setOpenAdminTab] = React.useState(false);

  const handleClickSaleTab = () => {
    setOpenSaleTab(!openSaleTab);
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
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      {/* Sales Menu List*/}
      <ListItem button onClick={handleClickSaleTab}>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Sales" />
        {openSaleTab ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSaleTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
        </List>
        <List component="div" disablePadding>
          <ListItem
            className={classes.nested}
            button
            component={Link}
            to="/receipts"
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Receipts" />
          </ListItem>
        </List>
      </Collapse>

      {/* Shop Menu List*/}
      <ListItem button onClick={handleClickShopTab}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Store" />
        {openShopTab ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openShopTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
        </List>
        <List component="div" disablePadding>
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
        </List>
        <List component="div" disablePadding>
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
        </List>
      </Collapse>

      {/* Admin Menu List*/}
      <ListItem button onClick={handleClickAdminTab}>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Administration" />
        {openAdminTab ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAdminTab} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
        </List>
      </Collapse>

      {/* Setting */}
      <ListItem button component={Link} to="/users">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>

      {/* Logout */}
      <ListItem button component={Link} to="/login">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}
