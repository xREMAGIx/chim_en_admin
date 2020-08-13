//Standard Modules
import React, { useState, useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

//Components
import AdminLayout from "../../components/Layout";
import CustomAlert from "../../components/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { userActions, permissionActions } from "../../actions";
import { Checkbox } from "@material-ui/core";

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
  tableContainer: {
    maxHeight: "50vh",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function UserEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const permissions = useSelector((state) => state.permissions);

  //>>Load all permission
  useEffect(() => {
    dispatch(permissionActions.getAllNonPagination());
  }, [dispatch]);
  //>>Load User Edit
  useEffect(() => {
    dispatch(userActions.getById(props.match.params.id));
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
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    user_permissions: [],
  });

  const {
    username,
    email,
    first_name,
    last_name,
    gender,
    date_of_birth,
  } = formData;

  //>>Put item to form data
  useEffect(() => {
    setFormData({ ...users.item });
  }, [users.item]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    let user_permissions = formData.user_permissions;
    dispatch(
      userActions.update(props.match.params.id, formData, user_permissions)
    );
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  //*Handle Permission
  const handleCheckPermission = (row) => {
    if (
      formData.user_permissions &&
      formData.user_permissions.find((element) => element.id === row.id)
    )
      setFormData({
        ...formData,
        user_permissions: formData.user_permissions.filter(
          (item) => item.id !== row.id
        ),
      });
    else
      setFormData({
        ...formData,
        user_permissions: [...formData.user_permissions, row],
      });
  };

  const handleCheckAll = () => {
    setFormData({ ...formData, user_permissions: [...permissions.items] });
  };

  const handleCheckRemoveAll = () => {
    setFormData({ ...formData, user_permissions: [] });
  };

  //>Simple search in permission table
  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearchTerm = (e) => {
    if (e.key === "Enter") setSearchTerm(e.target.value);
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
                  {/* name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="name-text"
                      fullWidth
                      label="Username"
                      variant="outlined"
                      value={username || ""}
                      name="username"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* email */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="email-text"
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={email || ""}
                      name="email"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* first name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="firstname-text"
                      fullWidth
                      label="First name"
                      variant="outlined"
                      value={first_name || ""}
                      name="first_name"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* last name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="lastname-text"
                      fullWidth
                      label="Last name"
                      variant="outlined"
                      value={last_name || ""}
                      name="last_name"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* gender */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="gender-text"
                      fullWidth
                      label="Gender"
                      variant="outlined"
                      value={gender || ""}
                      name="gender"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* date of birth */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="date-of-birth-text"
                      fullWidth
                      label="Date Of Birth"
                      variant="outlined"
                      value={date_of_birth || ""}
                      name="date_of_birth"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
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
                {users.item && users.item.is_superuser ? (
                  <Typography variant="h6" color="error" align="center">
                    Super Admin will have all permissions. You can't change it!
                  </Typography>
                ) : (
                  <React.Fragment>
                    {/* actions */}
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Button color="secondary" onClick={handleCheckAll}>
                          Select All
                        </Button>
                        <Button onClick={handleCheckRemoveAll}>
                          Deselect All
                        </Button>
                      </Grid>
                      <Grid item>
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                            onKeyPress={onSearchTerm}
                          />
                        </div>
                      </Grid>
                    </Grid>

                    {/* check permission table */}
                    <TableContainer className={classes.tableContainer}>
                      <Table
                        stickyHeader
                        className={classes.table}
                        aria-label="simple table"
                        size="small"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Content type</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Checkbox</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {permissions.items.length > 0 &&
                            permissions.items
                              .filter((permission) =>
                                permission.name
                                  .toLowerCase()
                                  .includes(searchTerm)
                              )
                              .map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell component="th" scope="row">
                                    {row.id}
                                  </TableCell>
                                  <TableCell>{row.content_type}</TableCell>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell align="right">
                                    <Checkbox
                                      checked={
                                        formData.user_permissions &&
                                        formData.user_permissions.find(
                                          (element) => element.id === row.id
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={() =>
                                        handleCheckPermission(row)
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </React.Fragment>
                )}
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
