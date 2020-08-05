//Standard Modules
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//UI Components
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Custom Components
import AdminLayout from "../../components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  bottomAppbar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
  },
  richEditor: {
    height: "50vh",
    border: "1px solid #ddd",
    backgroundColor: "white",
  },
  sectionBtn: {
    width: "100%",
    padding: theme.spacing(1),
    borderTop: `5px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
}));

//Fake Data
function createData(image, sku, name, price, quantity) {
  return { image, sku, name, price, quantity };
}

const rows = [
  createData(
    "https://source.unsplash.com/featured/?{laptop}",
    1,
    "Cupcake",
    1000,
    1
  ),
  createData(
    "https://source.unsplash.com/featured/?{laptop}",
    1,
    "Cupcake",
    1000,
    5
  ),
  createData(
    "https://source.unsplash.com/featured/?{laptop}",
    1,
    "Cupcake",
    1000,
    1
  ),
  createData(
    "https://source.unsplash.com/featured/?{laptop}",
    1,
    "Cupcake",
    2000,
    1
  ),
  createData(
    "https://source.unsplash.com/featured/?{laptop}",
    1,
    "Cupcake",
    1000,
    1
  ),
];

//function total
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

//date functions
//Custom Functions
function dateFormat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    // second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

//invoice fake
const TAX_RATE = 0.07;

//Options
const statusOption = [
  { title: "Not Order Yet", value: false },
  { title: "Ordered", value: true },
];

export default function OrderEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  //>>Load order edit
  useEffect(() => {
    dispatch(orderActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //Colapse
  const [openInfoCollapse, setOpenInfoCollapse] = useState(true);
  const handleInfoCollapse = () => {
    setOpenInfoCollapse(!openInfoCollapse);
  };

  const [openDetailCollapse, setOpenDetailCollapse] = useState(true);
  const handleDetailCollapse = () => {
    setOpenDetailCollapse(!openDetailCollapse);
  };

  //Main funtion
  const [formData, setFormData] = useState();

  const onSubmit = async () => {
    //dispatch(categoryActions.add(formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Link className={classes.link} to="/orders">
            Order List
          </Link>
          <Typography color="textPrimary">Order Edit: #</Typography>
        </Breadcrumbs>

        {/* Main */}
        <Grid container direction="row-reverse" spacing={3}>
          {/* Order info */}
          <Grid item xs={12} sm={12} md={4}>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleInfoCollapse}
            >
              <Typography variant="h6"> Info</Typography>
              {openInfoCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openInfoCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={2} justify="center">
                  {/* order id */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="order-id-text"
                      fullWidth
                      label="Order ID"
                      disabled
                      value={orders.item.id || ""}
                    />
                  </Grid>
                  {/* create at */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="create-at-text"
                      fullWidth
                      label="Create At"
                      disabled
                      value={orders.item.start_date || ""}
                    />
                  </Grid>
                  {/* customer name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="customer-name-text"
                      fullWidth
                      label="Customer Name"
                      disabled
                      value={orders.item.user || "Guest"}
                    />
                  </Grid>
                  {/* customer detail addess */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="customer-address-text"
                      fullWidth
                      label="Customer Address"
                      disabled
                      value={
                        (orders.item.order_address &&
                          orders.item.order_address.address) ||
                        ""
                      }
                    />
                  </Grid>
                  {/* customer district */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="customer-district-text"
                      fullWidth
                      label="District"
                      disabled
                      value={
                        (orders.item.order_address &&
                          orders.item.order_address.districts.name) ||
                        ""
                      }
                    />
                  </Grid>
                  {/* customer city */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="customer-city-text"
                      fullWidth
                      label="City"
                      disabled
                      value={
                        (orders.item.order_address &&
                          orders.item.order_address.city.name) ||
                        ""
                      }
                    />
                  </Grid>
                  {/* Status */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Autocomplete
                      id="combo-box-status"
                      disabled
                      fullWidth
                      value={
                        orders.item.ordered && orders.item.ordered
                          ? statusOption[1]
                          : statusOption[0]
                      }
                      options={statusOption}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Status"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>

          {/* Order detail*/}
          <Grid item xs={12} sm={12} md={8}>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleDetailCollapse}
            >
              <Typography variant="h6">Detail</Typography>
              {openDetailCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openDetailCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    {!orders.loading ? (
                      <TableBody>
                        {orders.item.items &&
                          orders.item.items.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                <img
                                  height={48}
                                  width={48}
                                  src={
                                    row.images &&
                                    row.images.length > 0 &&
                                    row.images[0].image
                                  }
                                  alt="No data"
                                ></img>
                              </TableCell>
                              <TableCell>
                                {row.product.title}
                                {
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    sku: {row.product.sku}
                                  </Typography>
                                }
                              </TableCell>
                              <TableCell align="right">
                                {row.product.price.toLocaleString() || 0}
                              </TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {(
                                  row.product.price * row.quantity
                                ).toLocaleString() || 0}
                              </TableCell>
                            </TableRow>
                          ))}

                        {/* Row extend */}
                        <TableRow>
                          <TableCell rowSpan={3} colSpan={2} />
                          <TableCell colSpan={2}>Subtotal</TableCell>
                          <TableCell align="right">
                            {(orders.item.get_total_price &&
                              orders.item.get_total_price.toLocaleString()) ||
                              0}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Ship</TableCell>
                          <TableCell align="right">
                            {orders.item.order_address
                              ? orders.item.order_address.districts.ship_fee.toLocaleString()
                              : 0}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">
                            {(orders.item.order_address &&
                              orders.item.get_total_price &&
                              (
                                orders.item.get_total_price +
                                orders.item.order_address.districts.ship_fee
                              ).toLocaleString()) ||
                              0}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : null}
                  </Table>
                </TableContainer>
              </Paper>
            </Collapse>
          </Grid>
        </Grid>

        {/* White space for bottom appbar */}
        <div style={{ height: "128px" }} />

        {/* Bottom Appbar for buttons */}
        <AppBar position="fixed" className={classes.bottomAppbar}>
          <Toolbar>
            <Grid container justify="center" spacing={5}>
              <Grid item>
                <Button
                  component={Link}
                  to="/orders"
                  variant="contained"
                  color="default"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Update
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </AdminLayout>
  );
}
