//Standard Modules
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

//Options
const statusOption = [
  { title: "Pending", value: "Pending" },
  { title: "Processing", value: "Processing" },
  { title: "Complete", value: "Complete" },
  { title: "Cancel", value: "Cancel" },
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
  const [formData, setFormData] = useState({
    status: "",
  });

  //>>Set formData = Order item
  useEffect(() => {
    setFormData({ ...orders.item });
  }, [orders.item]);

  const onSubmit = () => {
    dispatch(orderActions.update(props.match.params.id, formData));
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
          <Typography color="textPrimary">
            Order Edit: <strong>#{props.match.params.id}</strong>
          </Typography>
        </Breadcrumbs>

        {/* Main */}
        {orders.item && orders.item.customer_details ? (
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
                        value={orders.item.created_at || ""}
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
                          (orders.item.customer_details &&
                            orders.item.customer_details.length > 0 &&
                            orders.item.customer_details[0].address) ||
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
                          (orders.item.customer_details.length > 0 &&
                            orders.item.customer_details[0].dictrict) ||
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
                          (orders.item.customer_details.length > 0 &&
                            orders.item.customer_details[0].city) ||
                          ""
                        }
                      />
                    </Grid>
                    {/* Status */}
                    <Grid item xs={12} sm={12} md={9}>
                      <Autocomplete
                        id="combo-box-status"
                        fullWidth
                        value={
                          statusOption.find(
                            (element) => element.value === formData.status
                          ) || null
                        }
                        onChange={(e, newValue) =>
                          newValue &&
                          setFormData({ ...formData, status: newValue.value })
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
                          {orders.item.product_details &&
                            orders.item.product_details.map((row, index) => (
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
                                  {row.product_name}
                                  {
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      sku: {row.sku || ""}
                                    </Typography>
                                  }
                                </TableCell>
                                <TableCell align="right">
                                  {row.product_price.toLocaleString() || 0}
                                </TableCell>
                                <TableCell align="right">
                                  {row.product_amount}
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    row.product_price * row.product_amount
                                  ).toLocaleString() || 0}
                                </TableCell>
                              </TableRow>
                            ))}

                          {/* Row extend */}
                          <TableRow>
                            <TableCell rowSpan={3} colSpan={2} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">
                              {orders.item.product_details
                                .map(
                                  ({ product_price, product_amount }) =>
                                    product_price * product_amount
                                )
                                .reduce((sum, i) => sum + i, 0)
                                .toLocaleString() || 0}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>Ship</TableCell>
                            <TableCell align="right">
                              {orders.item.ship.toLocaleString() || 0}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">
                              {orders.item.amount.toLocaleString() || 0}
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
        ) : null}
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
                <Button variant="contained" color="primary" onClick={onSubmit}>
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
