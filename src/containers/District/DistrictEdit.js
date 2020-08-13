import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
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
}));

export default function DistrictEditModal(props) {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const districts = useSelector((state) => state.districts);
  const cities = useSelector((state) => state.cities);

  //Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(districtActions.getById(props.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Main function
  const [formData, setFormData] = useState({
    name: "",
    city: 1,
    ship_fee: 0,
  });

  const { name, city, ship_fee } = formData;

  //>>Set formData = district item
  useEffect(() => {
    districts.item && setFormData({ ...districts.item });
  }, [districts.item]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(districtActions.update(props.id, formData));
  };

  useEffect(() => {
    if (districts.success) handleClose();
  }, [districts.success]);

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <div>
      <Tooltip title="Edit" aria-label="edit">
        <IconButton
          aria-label="add-btn"
          component="span"
          disabled={props.disable}
          onClick={handleOpen}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
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
                Update District Info
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    label="District name"
                    id="outlined-name"
                    variant="outlined"
                    name="name"
                    value={name || ""}
                    onChange={(e) => onChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item>
                  <Autocomplete
                    value={
                      cities.items.find((element) => element.id === city) ||
                      null
                    }
                    onChange={(event, newValue) => {
                      newValue &&
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
                    value={ship_fee || 0}
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
                      Update
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
    </div>
  );
}
