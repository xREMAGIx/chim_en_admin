//Standard Modules
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Components
import AdminLayout from "../../components/Layout";

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

export default function ProductAdd() {
  const classes = useStyles();

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

  //Main funtion
  const [formData, setFormData] = useState();

  const onSubmit = async () => {
    //dispatch(categoryActions.add(formData));
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
          <Link className={classes.link} to="/products">
            Product List
          </Link>
          <Typography color="textPrimary">Product Add</Typography>
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
                  {/* sku */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="sku-text"
                      fullWidth
                      label="SKU"
                      variant="outlined"
                    />
                  </Grid>
                  {/* name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="name-text"
                      fullWidth
                      label="Product Name"
                      variant="outlined"
                    />
                  </Grid>
                  {/* short Description */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="sdescription-text"
                      fullWidth
                      label="Short Description"
                      variant="outlined"
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
                <Button variant="contained" color="primary">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </AdminLayout>
  );
}
