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

//Components
import AdminLayout from "../../components/Layout";
import CustomAlert from "../../components/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { productActions, categoryActions } from "../../actions";

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
  uploadRoot: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ddd",
  },
}));

//Options
const statusOption = [
  { title: "Available", value: true },
  { title: "Unavailable", value: false },
];

export default function UserEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  //>>Load all categories
  useEffect(() => {
    dispatch(categoryActions.getAllNonPagination());
  }, [dispatch]);
  //>>Load User Edit
  useEffect(() => {
    dispatch(productActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //Colapse
  const [openUserInfoCollapse, setOpenUserInfoCollapse] = useState(true);
  const handleUserInfoCollapse = () => {
    setOpenUserInfoCollapse(!openUserInfoCollapse);
  };

  const [openPermissionCollapse, setOpenPermissionCollapse] = useState(false);
  const handlePermissionCollapse = () => {
    setOpenPermissionCollapse(!openPermissionCollapse);
  };

  //Main funtion
  const [formData, setFormData] = useState({
    sku: "",
    title: "",
    price: 0,
    description: "",
    active: true,
    slug: "",
    user_permissions: [],
  });

  const { sku, title, price, description } = formData;

  //>>Put item to form data
  useEffect(() => {
    setFormData({ ...users.item });
  }, [users.item]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(
      productActions.update(props.match.params.id, {
        ...formData,
        category: formData.category,
      })
    );
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
          <Link className={classes.link} to="/users">
            User List
          </Link>
          <Typography color="textPrimary">User Edit</Typography>
        </Breadcrumbs>

        {/* Success & Error handling */}
        {users.error && (
          <CustomAlert
            openError={true}
            messageError={users.error}
          ></CustomAlert>
        )}
        {users.success && <CustomAlert openSuccess={true}></CustomAlert>}

        {/* Main */}
        <Grid container direction="column" spacing={3}>
          {/* User info */}
          <Grid item>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleUserInfoCollapse}
            >
              <Typography variant="h6">User Info</Typography>
              {openUserInfoCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openUserInfoCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={2} justify="center">
                  {/* sku */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="sku-text"
                      fullWidth
                      label="SKU"
                      variant="outlined"
                      value={sku || ""}
                      name="sku"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="name-text"
                      fullWidth
                      label="User Name"
                      variant="outlined"
                      value={title || ""}
                      name="title"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* category */}
                  <Grid item xs={12} sm={12} md={9}></Grid>
                  {/* short Description */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="sdescription-text"
                      fullWidth
                      label="Short Description"
                      variant="outlined"
                      value={description || ""}
                      name="description"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* price */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="price-text"
                      type="number"
                      fullWidth
                      label="Price"
                      variant="outlined"
                      value={price || ""}
                      name="price"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* active */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Autocomplete
                      id="combo-box-active"
                      fullWidth
                      options={statusOption}
                      value={
                        formData.active ? statusOption[0] : statusOption[1]
                      }
                      onChange={(e, newValue) =>
                        setFormData({ ...formData, active: newValue.value })
                      }
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Active"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>

          {/* Permission info*/}
          <Grid item>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handlePermissionCollapse}
            >
              <Typography variant="h6">Permission</Typography>
              {openPermissionCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openPermissionCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.items.length > 0 &&
                        users.items.user_permissions.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                          </TableRow>
                        ))}
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
                  to="/users"
                  variant="contained"
                  color="default"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={onSubmit} variant="contained" color="primary">
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
