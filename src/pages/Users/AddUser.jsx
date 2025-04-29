import React, { useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import { FaTimes } from "react-icons/fa";
// Redux
import { useDispatch } from "react-redux";
import { addNewUser } from "../../slices/thunks";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddUser = () => {
  document.title = "Create User | Practise Fellow";

  const history = useNavigate();
  const dispatch = useDispatch();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter a User Name"),
      fname: Yup.string().required("Please Enter a First Name"),
      lname: Yup.string().required("Please Enter a Last Name"),
      email: Yup.string()
        .email("Invalid Email")
        .required("Please Enter Your Email"),
      phone: Yup.number().required("Please Enter Your Phonr Number"),
      password: Yup.string()
        .min(8, "Password should be at least 8 characters")
        .required("Please Enter Your Password"),
      role: Yup.string().required("Please Enter Your Role"),
    }),
    onSubmit: (values) => {
      const newUser = {
        username: values.username,
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone,
      };
      console.log("🚀 ~ EcommerceAddProduct ~ newClinic:", newUser);

      dispatch(addNewUser(newUser));
      history("/users-list");
      validation.resetForm();
    },
  });

  const roles = [
    "Clinic Admin",
    "Doctor/Therapist",
    "Clinical Staff",
    "Billing Staff",
    "Other Admin Staff",
    " Patient",
    "Super Admin",
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create User" />

        <Row>
          <Col lg={8}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("clicked");
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>User Info</NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="manufacturer-name-input"
                        >
                          First Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="fname"
                          placeholder="Enter First Name"
                          value={validation.values.fname || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.fname && validation.touched.fname
                              ? true
                              : false
                          }
                        />
                        {validation.errors.fname && validation.touched.fname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.fname}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="manufacturer-name-input"
                        >
                          Last Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="lname"
                          placeholder="Enter Last Name"
                          value={validation.values.lname || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.lname && validation.touched.lname
                              ? true
                              : false
                          }
                        />
                        {validation.errors.lname && validation.touched.lname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.lname}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="manufacturer-brand-input"
                        >
                          Username
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="username"
                          placeholder="Enter Username"
                          value={validation.values.username || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.username &&
                            validation.touched.username
                              ? true
                              : false
                          }
                        />
                        {validation.errors.username &&
                        validation.touched.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="insurance-accepted">Role</Label>
                        <Input
                          type="select"
                          name="role"
                          id="role"
                          value={validation.values.role || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.errors.role && validation.touched.role
                              ? true
                              : false
                          }
                        >
                          <option value="">Select Role</option>
                          {roles.map((role, index) => (
                            <option key={index} value={role}>
                              {role}
                            </option>
                          ))}
                        </Input>
                        {validation.errors.role && validation.touched.role ? (
                          <FormFeedback type="invalid">
                            {validation.errors.role}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="manufacturer-brand-input"
                        >
                          Phone
                        </label>
                        <Input
                          type="number"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="phone"
                          placeholder="Enter Phone number"
                          value={validation.values.phone || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.phone && validation.touched.phone
                              ? true
                              : false
                          }
                        />
                        {validation.errors.phone && validation.touched.phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="manufacturer-brand-input"
                        >
                          Email
                        </label>
                        <Input
                          type="email"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="email"
                          placeholder="Enter Email"
                          value={validation.values.email || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.email && validation.touched.email
                              ? true
                              : false
                          }
                        />
                        {validation.errors.email && validation.touched.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Password
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="password"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter Password"
                            name="password"
                            value={validation.values.password || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.password &&
                              validation.touched.password
                                ? true
                                : false
                            }
                          />
                          {validation.errors.password &&
                          validation.touched.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddUser;
