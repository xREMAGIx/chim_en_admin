//Standard Modules
import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//UI Components
import TreeView from "@material-ui/lab/TreeView";
import Button from "@material-ui/core/Button";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import SvgIcon from "@material-ui/core/SvgIcon";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

//Components
import AdminLayout from "../../components/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    flexGrow: 1,
    maxWidth: 400,
  },
  treeItemTransitionFrom: {
    opacity: 0,
    transform: "translate3d(20px,0,0)",
  },
  treeItemTransitionTo: {
    opacity: 1,
    transform: "translate3d(0,0,0)",
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//Style for treeview
function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const classes = useStyles();
  //   const style = useSpring({
  //     from: { opacity: 0, transform: "translate3d(20px,0,0)" },
  //     to: {
  //       opacity: props.in ? 1 : 0,
  //       transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
  //     },
  //   });

  return (
    <div
      // className={
      //   props.in ? classes.treeItemTransitionTo : classes.treeItemTransitionFrom
      // }
      onEnter={classes.treeItemTransitionFrom}
      onExited={classes.treeItemTransitionTo}
    >
      <Collapse {...props} />
    </div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

export default function CategoryList() {
  const classes = useStyles();

  //Custom hooks
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [data, setData] = React.useState({
    id: "root",
    name: "Parent",
    children: [
      {
        id: "1",
        name: "Child - 1",
      },
      {
        id: "3",
        name: "Child - 3",
        children: [
          {
            id: "4",
            name: "Child - 4",
          },
        ],
      },
    ],
  });

  //Handle functions of Add Modal
  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const onSubmit = async () => {
    //dispatch(categoryActions.add(formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  //Tree view function
  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        className={classes.margin}
        onClick={() => handleAddModalOpen()}
      >
        Add
      </Button>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Typography color="textPrimary">CategoryList</Typography>
        </Breadcrumbs>

        {/* CategoryList Treeview */}
        <Paper className={classes.paper}>
          <Typography className={classes.margin} variant="h6">
            CategoryList
          </Typography>
          <Button onClick={() => console.log(data)}>Console</Button>
          <TreeView
            className={classes.root}
            defaultExpanded={["root"]}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            {renderTree(data)}
          </TreeView>
        </Paper>

        {/* Add Modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openAddModal}
          onClose={handleAddModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openAddModal}>
            <div className={classes.addPaper}>
              <Container maxWidth="md" className={classes.container}>
                <Typography variant="h4" gutterBottom>
                  Add new Category
                </Typography>
                <TextField
                  fullWidth
                  style={{ marginTop: "10px" }}
                  label="Category name"
                  id="outlined-name"
                  variant="outlined"
                  name="name"
                  // value={name}
                  // onChange={(e) => onChange(e)}
                  onKeyPress={(e) => keyPressed(e)}
                />
                <Grid
                  style={{ marginTop: "10px" }}
                  container
                  justify="center"
                  spacing={5}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => onSubmit(e)}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleAddModalClose}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    </AdminLayout>
  );
}
