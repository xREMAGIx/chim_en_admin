import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Autocomplete from "@material-ui/lab/Autocomplete";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { districtActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  img: {
    height: "100px",
    width: "100px",
  },
  gridList: {
    height: "60vh",
  },
}));

export default function DistrictAddModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //Redux
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const districts = useSelector((state) => state.districts);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    ship_fee: 0,
  });

  const { name, ship_fee } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    dispatch(districtActions.add(formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  useEffect(() => {
    if (districts.success) handleClose();
  }, [districts.success]);

  return (
    <React.Fragment>
      <Hidden xsDown>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Create
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          color="primary"
          aria-label="add-btn"
          component="span"
          onClick={handleOpen}
        >
          <AddIcon />
        </IconButton>
      </Hidden>
      <Modal
        aria-labelledby="transition-modal-name"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="md" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Add new District
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    label="District name"
                    id="outlined-name"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item>
                  <Autocomplete
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, city: newValue.id });
                    }}
                    id="controllable-cities"
                    options={cities.items}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="City" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Ship Fee"
                    id="outlined-ship-fee"
                    variant="outlined"
                    name="ship_fee"
                    value={ship_fee}
                    onChange={(e) => onChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item container justify="center" spacing={5}>
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
                    <Button variant="contained" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
