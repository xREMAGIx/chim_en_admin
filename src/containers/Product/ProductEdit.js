//Standard Modules
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Components
import AdminLayout from "../../components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../actions";

const backendUrl = "http://127.0.0.1:8000";

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

//Image upload for editor
function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

//Options
const statusOption = [
  { title: "Available", value: true },
  { title: "Unavailable", value: false },
];

export default function ProductEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  //Colapse
  const [openProductInfoCollapse, setOpenProductInfoCollapse] = useState(true);
  const handleProductInfoCollapse = () => {
    setOpenProductInfoCollapse(!openProductInfoCollapse);
  };

  const [openSEOCollapse, setOpenSEOCollapse] = useState(false);
  const handleSEOCollapse = () => {
    setOpenSEOCollapse(!openSEOCollapse);
  };

  //Editor
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  //Image
  const [oldImage, setOldImage] = React.useState([{ images: [] }]);
  const [image, setImage] = React.useState([]);
  const [delImage, setDelImage] = React.useState([]);

  const handleOnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push({ id: i, img: event.target.files[i] });
      }
      setImage(images);
    }
  };

  const onDeleteNew = (e) => {
    let newImg = image.filter((_image) => image.id !== e.target.id * 1);
    setImage(newImg);
  };

  const onDeleteBtn = (e) => {
    setDelImage([...delImage, e.target.id * 1]);
    setOldImage({
      ...oldImage,
      images: oldImage.images.filter((_image) => _image.id !== e.target.id * 1),
    });
  };

  //Main funtion
  const [formData, setFormData] = useState({
    sku: "",
    title: "",
    price: 0,
    description: "",
    active: true,
    slug: "",
  });

  const { sku, title, price, description, active, slug } = formData;

  //>>Load Product Edit
  useEffect(() => {
    dispatch(productActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //>>Put item to form data
  useEffect(() => {
    setFormData({ ...products.item, images: [] });
    setOldImage({ images: products.item.images });
  }, [products.item]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(
      productActions.update(props.match.params.id, formData, image, delImage)
    );
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  useEffect(() => {
    console.log("old", oldImage);
    console.log(formData);
    console.log(delImage);
  }, [delImage, formData]);

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Link className={classes.link} to="/products">
            Product List
          </Link>
          <Typography color="textPrimary">Product Edit</Typography>
        </Breadcrumbs>

        {/* Main */}
        <Grid container direction="column" spacing={3}>
          {/* Product info */}
          <Grid item>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleProductInfoCollapse}
            >
              <Typography variant="h6">Product Info</Typography>
              {openProductInfoCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openProductInfoCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={2} justify="center">
                  {/* images */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justify="center"
                    >
                      <Grid item>
                        <div className={classes.uploadRoot}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleOnImageChange}
                          />

                          <label htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              color="secondary"
                              component="span"
                            >
                              Upload Images
                            </Button>
                          </label>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className={classes.gridListRoot}>
                          <GridList className={classes.gridList} cols={3.5}>
                            {/* Old Images */}
                            {oldImage.images &&
                              oldImage.images.map((item, index) => (
                                <GridListTile key={item.id}>
                                  <img src={item.image} alt={"No data"} />
                                  <GridListTileBar
                                    title={item.id}
                                    actionIcon={
                                      <Button
                                        id={item.id}
                                        style={{ color: "red" }}
                                        onClick={(e) => onDeleteBtn(e)}
                                      >
                                        <Typography id={item.id}>
                                          Del
                                        </Typography>
                                      </Button>
                                    }
                                  />
                                </GridListTile>
                              ))}
                            {/* New Images */}
                            {image &&
                              image.map((item) => (
                                <GridListTile key={item.id}>
                                  <img
                                    src={URL.createObjectURL(item.img)}
                                    alt={"No data"}
                                  />
                                  <GridListTileBar
                                    title={item.img.name}
                                    actionIcon={
                                      <Button
                                        id={item.id}
                                        style={{ color: "red" }}
                                        onClick={(e) => onDeleteNew(e)}
                                      >
                                        <Typography id={item.id}>
                                          Del
                                        </Typography>
                                      </Button>
                                    }
                                  />
                                </GridListTile>
                              ))}
                          </GridList>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
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
                      label="Product Name"
                      variant="outlined"
                      value={title || ""}
                      name="title"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
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
                  {/* content */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Editor
                      editorClassName={classes.richEditor}
                      wrapperClassName="demo-wrapper"
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },

                        image: {
                          uploadCallback: uploadImageCallBack,
                          alt: { present: true, mandatory: true },
                        },
                      }}
                      editorState={editorState}
                      onEditorStateChange={onEditorStateChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>

          {/* SEO info*/}
          <Grid item>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleSEOCollapse}
            >
              <Typography variant="h6">SEO</Typography>
              {openSEOCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openSEOCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={2} justify="center">
                  {/* slug */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="slug-text"
                      fullWidth
                      label="Search engine friendly page name (slug)"
                      variant="outlined"
                      value={slug}
                      name="slug"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* meta title */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="meta-title-text"
                      fullWidth
                      label="Product Name"
                      variant="outlined"
                    />
                  </Grid>
                  {/* meta keywords */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="meta-keyword-text"
                      fullWidth
                      label="Short Description"
                      variant="outlined"
                    />
                  </Grid>
                  {/* meta description */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="meta-description-text"
                      fullWidth
                      label="Meta Description"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
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
                  to="/products"
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
