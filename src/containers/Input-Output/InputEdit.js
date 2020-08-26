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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

//Custom Components
import AdminLayout from "../../components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { inputActions, productActions } from "../../actions";

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
  container: {
    marginTop: theme.spacing(2),
    maxHeight: "50vh",
  },
}));

export default function InputEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const inputs = useSelector((state) => state.inputs);

  //>>Load products
  useEffect(() => {
    dispatch(productActions.getAllNonPagination());
    dispatch(inputActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //>>Pass input to formData
  useEffect(() => {
    setInput((input) => ({ ...input, provider: inputs.item.provider }));
    inputs.item.product_details &&
      setFormData([...inputs.item.product_details]);
  }, [inputs.item]);

  //Colapse
  // const [openInfoCollapse, setOpenInfoCollapse] = useState(true);
  // const handleInfoCollapse = () => {
  //   setOpenInfoCollapse(!openInfoCollapse);
  // };

  const [openDetailCollapse, setOpenDetailCollapse] = useState(true);
  const handleDetailCollapse = () => {
    setOpenDetailCollapse(!openDetailCollapse);
  };

  //Main funtion
  const [formData, setFormData] = useState([]);
  const [productSelected, setProductSelected] = useState();
  const [input, setInput] = useState({
    provider: "",
  });

  const onSubmit = () => {
    dispatch(
      inputActions.update(props.match.params.id, {
        ...input,
        product_details: formData,
      })
    );
  };

  const onDeleteItem = (id) => {
    setFormData(formData.filter((el) => el.product_id !== id));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter" && productSelected !== undefined) onAddList(e);
  };

  const onAddList = (e) => {
    if (formData.find((el) => el.product_id === productSelected.product_id))
      setFormData(
        formData.map((el) =>
          el.product_id === productSelected.product_id
            ? { ...productSelected, product_amount: el.product_amount + 1 }
            : el
        )
      );
    else
      setFormData([...formData, { ...productSelected, product_amount: 1 * 1 }]);
  };

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Link className={classes.link} to="/input-output">
            Input List
          </Link>
          <Typography color="textPrimary">
            Input Edit #{inputs.item.id}
          </Typography>
        </Breadcrumbs>

        {/* Main */}
        <Grid container spacing={3}>
          {/* Order detail*/}
          <Grid item xs={12}>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleDetailCollapse}
            >
              <Typography variant="h6">Detail</Typography>
              {openDetailCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openDetailCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="outlined-manufacturer"
                      label="Manufacturer"
                      variant="outlined"
                      value={input.provider || ""}
                      onChange={(e) =>
                        setInput({ ...input, provider: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Autocomplete
                      id="combo-box-demo"
                      loading={products.loading}
                      options={products.items}
                      getOptionLabel={(option) => option.title}
                      onChange={(e, newValue) =>
                        setProductSelected({
                          product_id: newValue.id,
                          product_name: newValue.title,
                          product_price: newValue.price,
                          product_promotion: newValue.promotion,
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product"
                          variant="outlined"
                          onKeyPress={(e) => keyPressed(e)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item container justify="center" xs={12} sm={3}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={onAddList}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <TableContainer component={Paper} className={classes.container}>
                  <Table
                    stickyHeader
                    className={classes.table}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {formData.length > 0 &&
                        formData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.product_name}</TableCell>
                            <TableCell align="right">
                              {row.product_price.toLocaleString() || 0}
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                style={{ maxWidth: "5vh" }}
                                id="standard-number"
                                size="small"
                                type="number"
                                value={row.product_amount || 0}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) =>
                                  setFormData(
                                    formData.map((el) =>
                                      el.id === row.id
                                        ? {
                                            ...row,
                                            product_amount: e.target.value,
                                          }
                                        : el
                                    )
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell align="right">
                              {(
                                row.product_price * row.product_amount
                              ).toLocaleString() || 0}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => onDeleteItem(row.product_id)}
                                aria-label="delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}

                      {/* Row extend */}
                      <TableRow>
                        <TableCell rowSpan={3} colSpan={2} />
                        <TableCell>
                          <Typography variant="h6">Total</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            {(formData &&
                              formData
                                .map(
                                  ({ product_price, product_amount }) =>
                                    product_price * product_amount
                                )
                                .reduce((sum, i) => sum + i, 0)
                                .toLocaleString()) ||
                              0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell align="right">
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">
                        </TableCell>
                      </TableRow> */}
                    </TableBody>
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
                  to="/input-output"
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
