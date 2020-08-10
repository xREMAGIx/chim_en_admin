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

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cityActions } from "../../actions";

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

export default function CityEditModal(props) {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);

  //Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(cityActions.getById(props.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Main function
  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  //>>Set formData = city item
  useEffect(() => {
    console.log(cities.item);
    cities.item && setFormData({ name: cities.item.name });
  }, [cities.item]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    dispatch(cityActions.update(props.id, formData));
    handleClose();
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit" aria-label="edit">
        <IconButton aria-label="add-btn" component="span" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
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
                Update City Info
              </Typography>
              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="Category name"
                id="outlined-name"
                variant="outlined"
                name="name"
                value={name || ""}
                onChange={(e) => onChange(e)}
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
                    Update
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
