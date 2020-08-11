//Standard Modules
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { fade, lighten, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CardContent from "@material-ui/core/CardContent";

//Custom Components
import AdminLayout from "../../components/Layout";
import CustomAlert from "../../components/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../actions";

//Fake Data
function createData(
  orderId,
  status,
  customerName,
  customerPhone,
  total,
  createAt
) {
  return { orderId, status, customerName, customerPhone, total, createAt };
}

const rows = [
  createData(1, "complete", "Remagi", "0909090909", 100000, new Date()),
  createData(1, "pending", "Remagi", "0909090909", 100000, new Date()),
  createData(1, "complete", "Remagi", "0909090909", 100000, new Date()),
  createData(1, "processing", "Remagi", "0909090909", 100000, new Date()),
  createData(1, "complete", "Remagi", "0909090909", 100000, new Date()),
];

const headCells = [
  {
    id: "orderId",
    numeric: false,
    disablePadding: false,
    label: "Order #",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "user",
    numeric: false,
    disablePadding: false,
    label: "User",
  },
  {
    id: "detailAddress",
    numeric: false,
    disablePadding: false,
    label: "Detail Address",
  },
  {
    id: "district",
    numeric: false,
    disablePadding: false,
    label: "District",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  { id: "createAt", numeric: true, disablePadding: false, label: "Create At" },
  { id: "action", numeric: true, disablePadding: false, label: "Action" },
];

//Enhance Tablehead
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//Custom Toolbar
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
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
    width: "12ch",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  const dispatch = useDispatch();

  //Handle Delete
  const { numSelected, idSelected } = props;
  const handleDelete = () => {
    dispatch(orderActions.delete(idSelected));
    props.setSelected([]);
  };

  const keyEnter = (e) => {
    if (e.key === "Enter") props.onSearch(e);
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Hidden smDown>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Orders
          </Typography>
        </Hidden>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Grid container alignItems="center" justify="flex-end" spacing={1}>
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
                onChange={(e) => props.setSearch(e.target.value)}
                onKeyPress={keyEnter}
              />
            </div>
          </Grid>
          <Grid item>
            <Hidden xsDown>
              <Button
                component={Link}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                to="/products-add"
              >
                Create
              </Button>
            </Hidden>
            <Hidden smUp>
              <IconButton color="primary" aria-label="add-btn" component="span">
                <AddIcon />
              </IconButton>
            </Hidden>
          </Grid>
          <Grid item>
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  cardRoot: {
    // maxWidth: 345,
    margin: theme.spacing(1),
  },
  cardMedia: {
    height: 0,
    paddingTop: "75%", // 4:3
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  status: {
    color: "white",
    borderRadius: "10px",
    padding: theme.spacing(1),
  },
  complete: {
    backgroundColor: theme.palette.success.main,
  },
  processing: {
    backgroundColor: theme.palette.info.main,
  },
  pending: {
    backgroundColor: theme.palette.warning.main,
  },
}));

export default function OrderList() {
  //UI Hook
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  //Table Hooks
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  //Main functions
  //*Filter
  const [statusFilter, setStatusFilter] = useState("");
  //Chip function
  const handleChipClick = (e) => {
    dispatch(
      orderActions.getAll(
        `?search=${search}&limit=${rowsPerPage}&offset=0&status=${e.currentTarget.id}`
      )
    );
    setStatusFilter(e.currentTarget.id);
  };

  //*Search
  const [search, setSearch] = useState("");
  //>>Handle Search
  const onSearch = () => {
    dispatch(
      orderActions.getAll(
        `?search=${search}&limit=${rowsPerPage}&offset=0&status=${statusFilter}`
      )
    );
    setPage(0);
  };

  //*load orders (with Pagination)
  useEffect(() => {
    dispatch(
      orderActions.getAll(`?limit=${rowsPerPage}&offset=${page * rowsPerPage}`)
    );
  }, [dispatch, rowsPerPage, page]);

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>

          <Typography color="textPrimary">Order List</Typography>
        </Breadcrumbs>

        {/* Success & Error handling */}
        {orders.error && (
          <CustomAlert
            openError={true}
            messageError={orders.error}
          ></CustomAlert>
        )}
        {orders.success && <CustomAlert openSuccess={true}></CustomAlert>}

        {/* Product table */}
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            idSelected={selected}
            setSelected={setSelected}
            setSearch={setSearch}
            onSearch={onSearch}
          />
          <Grid
            style={{ marginLeft: 8, marginBottom: 16 }}
            container
            spacing={2}
          >
            <Grid item>
              <Chip
                color={statusFilter === "" ? "secondary" : "default"}
                id=""
                label="All"
                onClick={(e) => handleChipClick(e)}
              />
            </Grid>

            <Grid item>
              <Chip
                color={statusFilter === "Pending" ? "secondary" : "default"}
                id="Pending"
                label="Pending"
                onClick={(e) => handleChipClick(e)}
              />
            </Grid>
            <Grid item>
              <Chip
                color={statusFilter === "Processing" ? "secondary" : "default"}
                id="Processing"
                label="Processing"
                onClick={(e) => handleChipClick(e)}
              />
            </Grid>
            <Grid item>
              <Chip
                color={statusFilter === "Complete" ? "secondary" : "default"}
                id="Complete"
                label="Complete"
                onClick={(e) => handleChipClick(e)}
              />
            </Grid>
          </Grid>

          {/* Table Desktop version */}
          <Hidden smDown>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={"small"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(orders.items, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          {/* Id */}
                          <TableCell>{row.id}</TableCell>
                          {/* Status */}
                          <TableCell>
                            <Typography
                              display="inline"
                              className={clsx({
                                [classes.status]: true,
                                [classes.complete]: row.status === "Complete",
                                [classes.processing]:
                                  row.status === "Processing",
                                [classes.pending]: row.status === "Pending",
                              })}
                            >
                              {row.status}
                            </Typography>
                          </TableCell>
                          {/* User */}
                          <TableCell>{row.user || "guest"}</TableCell>
                          {/* address */}
                          <TableCell>
                            {(row.customer_details &&
                              row.customer_details[0].address) ||
                              ""}
                          </TableCell>
                          {/* district */}
                          <TableCell>
                            {(row.customer_details &&
                              row.customer_details[0].dictrict) ||
                              ""}
                          </TableCell>
                          {/* city */}
                          <TableCell>
                            {(row.customer_details &&
                              row.customer_details[0].city) ||
                              ""}
                          </TableCell>
                          {/* total */}
                          <TableCell align="right">
                            {row.amount.toLocaleString()}
                          </TableCell>
                          {/* create at */}
                          <TableCell align="right">
                            {row.created_at
                              ? new Date(row.created_at).toLocaleString()
                              : null}
                          </TableCell>
                          {/* actions */}
                          <TableCell align="right">
                            <Grid container justify="flex-end">
                              <Grid item>
                                <Tooltip title="Edit" aria-label="edit">
                                  <IconButton
                                    component={Link}
                                    to={`/orders-edit/${row.id}`}
                                    aria-label="edit"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 40 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Hidden>

          {/* Table Mobile version */}
          <Hidden mdUp>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Card
                  variant="outlined"
                  className={classes.cardRoot}
                  key={index}
                >
                  <Grid container>
                    <Grid item xs={3} container alignItems="center">
                      <CardActionArea>
                        <CardMedia
                          className={classes.cardMedia}
                          image={row.image}
                          title={row.name}
                        />
                      </CardActionArea>
                    </Grid>
                    <Grid item xs={7}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h2">
                          {row.name}
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                          Price: {row.price}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="p"
                          gutterBottom
                        >
                          Status: {row.status}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component="p"
                        >
                          Categories: {row.categories}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      container
                      justify="flex-end"
                      alignItems="flex-start"
                    >
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              ))}
          </Hidden>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.count}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={"Rows:"}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </React.Fragment>
    </AdminLayout>
  );
}
