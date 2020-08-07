import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//UI Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

//Components
import { history } from "../store";
import AdminLayout from "../components/Layout";
//>>Charts
import OrdersChart from "../components/Charts/OrdersChart";

const useStyles = makeStyles((theme) => ({
  sectionBtn: {
    width: "100%",
    padding: theme.spacing(1),
    borderTop: `5px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
  padding: {
    padding: theme.spacing(2),
  },
  statictisPaper: {
    "& .MuiAlert-message": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .MuiButton-root, & .MuiTypography-h4": {
        fontWeight: 700,
      },
    },
  },
}));

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Dashboard() {
  const classes = useStyles();

  //Open login success snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (history.location.state === 200) setOpen(true);
  }, []);

  //Colapse
  const [openStatisticCollapse, setOpenStatisticCollapse] = useState(true);
  const handleStatisticCollapse = () => {
    setOpenStatisticCollapse(!openStatisticCollapse);
  };

  const [openOrderChartCollapse, setOpenOrderChartCollapse] = useState(true);
  const handleOrderChartCollapse = () => {
    setOpenOrderChartCollapse(!openOrderChartCollapse);
  };

  const [openUserChartCollapse, setOpenUserChartCollapse] = useState(true);
  const handleUserChartCollapse = () => {
    setOpenUserChartCollapse(!openUserChartCollapse);
  };

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Login successful!
        </Alert>
      </Snackbar>
      <AdminLayout>
        <React.Fragment>
          <Grid container direction="column" spacing={3}>
            {/* Product info */}
            <Grid item>
              <ButtonBase
                className={classes.sectionBtn}
                onClick={handleStatisticCollapse}
              >
                <Typography variant="h6">Statistics</Typography>
                {openStatisticCollapse ? <ExpandLess /> : <ExpandMore />}
              </ButtonBase>
              <Collapse in={openStatisticCollapse} timeout="auto" unmountOnExit>
                <Paper className={classes.padding} elevation={4}>
                  <Grid container spacing={3}>
                    {/* New orders */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="info"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">5</Typography>
                        <Typography variant="h6">New Orders</Typography>
                        <Button component={Link} to="/orders">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                    {/* Products */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="warning"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">5</Typography>
                        <Typography variant="h6">Products</Typography>
                        <Button component={Link} to="/products">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                    {/* Users */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="success"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">5</Typography>
                        <Typography variant="h6">Users</Typography>
                        <Button component={Link} to="/users">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                    {/* Low stock */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="error"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">5</Typography>
                        <Typography variant="h6">Low stock products</Typography>
                        <Button component={Link} to="/users">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                  </Grid>
                </Paper>
              </Collapse>
            </Grid>

            {/* Order and user chart*/}
            <Grid item container spacing={3}>
              {/* Orders chart */}
              <Grid item xs={12} sm={6}>
                <ButtonBase
                  className={classes.sectionBtn}
                  onClick={handleOrderChartCollapse}
                >
                  <Typography variant="h6">Orders</Typography>
                  {openOrderChartCollapse ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse
                  in={openOrderChartCollapse}
                  timeout="auto"
                  unmountOnExit
                >
                  <Paper
                    className={classes.padding}
                    style={{ height: 300 }}
                    elevation={4}
                  >
                    <OrdersChart />
                  </Paper>
                </Collapse>
              </Grid>
              {/* Users chart */}
              <Grid item xs={12} sm={6}>
                <ButtonBase
                  className={classes.sectionBtn}
                  onClick={handleUserChartCollapse}
                >
                  <Typography variant="h6">Users</Typography>
                  {openUserChartCollapse ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse
                  in={openUserChartCollapse}
                  timeout="auto"
                  unmountOnExit
                >
                  <Paper className={classes.padding} elevation={4}></Paper>
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </AdminLayout>
    </React.Fragment>
  );
}
