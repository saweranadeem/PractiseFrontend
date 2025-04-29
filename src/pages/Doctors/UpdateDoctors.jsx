import React, { useState, useEffect } from "react";
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
import { addNewDoctor as onAddNewDoctor } from "../../slices/thunks";
import classnames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import { api } from "../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = () => {
  document.title = "Update Doctors | Practise Fellow";

  const history = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  const doctorsList = [
    "Part Time",
    "Full time",
    "Work from home",
    "Salaried",
    "Fix Contract",
    "Percentage",
  ];

  const [insuranceList, setInsuranceList] = useState([]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      provider_fname: doctor?.provider_fname,
      provider_lname: doctor?.provider_lname,
      provider_mi: doctor?.provider_mi,
      npi_number: doctor?.npi_number,
      tax_id: doctor?.tax_id,
      license_number: doctor?.license_number,
      caqh_username: doctor?.caqh_username,
      caqh_password: "",
      pecos_username: doctor?.pecos_username,
      pecos_password: "",
      specialty: doctor?.specialty,
      email: doctor?.email,
      phone: doctor?.phone,
      address: doctor?.address,
      doctors_providers: doctor?.doctors_providers || [],
      insuranceList: doctor?.insuranceList || [],
    },
    validationSchema: Yup.object({
      insurance_accepted: Yup.array()
        .min(1, "Please select at least one insurance")
        .required("At least one insurance is required"),
      address: Yup.string().required("Address is required"),
      doctors_providers: Yup.array()
        .min(1, "Please select at least one contract type")
        .required("At least one contract type is required"),
      provider_fname: Yup.string()
        .required("Provider First Name is required")
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),
      provider_lname: Yup.string()
        .required("Provider Last Name is required")
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),
      caqh_username: Yup.string().required("CAQH Username is required"),
      pecos_username: Yup.string().required("PECOS Username is required"),
      specialty: Yup.string().required("Specialty is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d{10}$/, "Phone must be exactly 10 digits"),
      license_number: Yup.number().required("License Number is required"),
      npi_number: Yup.string()
        .required("NPI Number is required")
        .matches(/^\d{10}$/, "NPI must be exactly 10 digits"),
      tax_id: Yup.string()
        .required("Tax ID is required")
        .matches(/^\d{9}$/, "Tax ID must be exactly 9 digits"),
      provider_mi: Yup.string().required("Provider_MI is required"),
    }),
    onSubmit: async (values) => {
      const updatedProvider = {
        provider_fname: values.provider_fname,
        provider_lname: values.provider_lname,
        provider_mi: values.provider_mi,
        npi_number: values.npi_number,
        tax_id: values.tax_id,
        license_number: values.license_number,
        caqh_username: values.caqh_username,
        pecos_username: values.pecos_username,
        specialty: values.specialty,
        email: values.email,
        phone: values.phone,
        address: values.address,
        insuranceList: values.insurance_accepted,
        doctors_providers: values.doctors_providers,
      };

      // Only include passwords if they've been changed (not empty)
      if (values.caqh_password) {
        updatedProvider.caqh_password = values.caqh_password;
      }
      if (values.pecos_password) {
        updatedProvider.pecos_password = values.pecos_password;
      }
      setLoading(true);
      try {
        await axios.put(`${api.API_URL}/doctors/${params.id}`, updatedProvider);
        history("/doctors-list");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Update failed:", err);
      }
    },
  });
  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`${api.API_URL}/doctors/${params.id}`);
      console.log(response, "response");
      setDoctor(response.provider);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/setting");
        if (response.success) {
          setInsuranceList(response.settings.acceptedInsurances);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
    fetchDoctor();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Update Doctor" pageTitle="Ecommerce" />

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
                      <NavLink style={{ cursor: "pointer" }}>
                        Provider Legal Information:
                      </NavLink>
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
                          Provider First Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="provider_fname"
                          placeholder="Enter Provider First Name"
                          value={validation.values.provider_fname || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.provider_fname &&
                            validation.touched.provider_fname
                              ? true
                              : false
                          }
                        />
                        {validation.errors.provider_fname &&
                        validation.touched.provider_fname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.provider_fname}
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
                          Provider Last Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="provider_lname"
                          placeholder="Enter Provider Last Name"
                          value={validation.values.provider_lname || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.provider_lname &&
                            validation.touched.provider_lname
                              ? true
                              : false
                          }
                        />
                        {validation.errors.provider_lname &&
                        validation.touched.provider_lname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.provider_lname}
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
                          Provider MI
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="provider_mi"
                          placeholder="Enter Provider email"
                          value={validation.values.provider_mi || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.provider_mi &&
                            validation.touched.provider_mi
                              ? true
                              : false
                          }
                        />
                        {validation.errors.provider_mi &&
                        validation.touched.provider_mi ? (
                          <FormFeedback type="invalid">
                            {validation.errors.provider_mi}
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
                          NPI Number
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="number"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter NPI number"
                            name="npi_number"
                            value={validation.values.npi_number || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.npi_number &&
                              validation.touched.npi_number
                                ? true
                                : false
                            }
                          />
                          {validation.errors.npi_number &&
                          validation.touched.npi_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.npi_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Tax ID
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="number"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter TAX ID"
                            name="tax_id"
                            value={validation.values.tax_id || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.tax_id &&
                              validation.touched.tax_id
                                ? true
                                : false
                            }
                          />
                          {validation.errors.tax_id &&
                          validation.touched.tax_id ? (
                            <FormFeedback type="invalid">
                              {validation.errors.tax_id}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          License Number
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="number"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter License Number"
                            name="license_number"
                            value={validation.values.license_number || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.license_number &&
                              validation.touched.license_number
                                ? true
                                : false
                            }
                          />
                          {validation.errors.license_number &&
                          validation.touched.license_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.license_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          CAQH Username
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="text"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter CAQH Username "
                            name="caqh_username"
                            value={validation.values.caqh_username || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.caqh_username &&
                              validation.touched.caqh_username
                                ? true
                                : false
                            }
                          />
                          {validation.errors.caqh_username &&
                          validation.touched.caqh_username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.caqh_username}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          CAQH Password
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="password"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter CAQH Password"
                            name="caqh_password"
                            value={validation.values.caqh_password || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.caqh_password &&
                              validation.touched.caqh_password
                                ? true
                                : false
                            }
                          />
                          {validation.errors.caqh_password &&
                          validation.touched.caqh_password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.caqh_password}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          PECOS username
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="text"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter PECOS username"
                            name="pecos_username"
                            value={validation.values.pecos_username || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.pecos_username &&
                              validation.touched.pecos_username
                                ? true
                                : false
                            }
                          />
                          {validation.errors.pecos_username &&
                          validation.touched.pecos_username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pecos_username}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          PECOS Password
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="password"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter PECOS Password"
                            name="pecos_password"
                            value={validation.values.pecos_password || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.pecos_password &&
                              validation.touched.pecos_password
                                ? true
                                : false
                            }
                          />
                          {validation.errors.pecos_password &&
                          validation.touched.pecos_password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pecos_password}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Specialty
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="text"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter Specialty"
                            name="specialty"
                            value={validation.values.specialty || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.specialty &&
                              validation.touched.specialty
                                ? true
                                : false
                            }
                          />
                          {validation.errors.specialty &&
                          validation.touched.specialty ? (
                            <FormFeedback type="invalid">
                              {validation.errors.specialty}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Email
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="email"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter Email"
                            name="email"
                            value={validation.values.email || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.email &&
                              validation.touched.email
                                ? true
                                : false
                            }
                          />
                          {validation.errors.email &&
                          validation.touched.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Phone
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="number"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter Phone"
                            name="phone"
                            value={validation.values.phone || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.phone &&
                              validation.touched.phone
                                ? true
                                : false
                            }
                          />
                          {validation.errors.phone &&
                          validation.touched.phone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Address
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="text"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter Address"
                            name="address"
                            value={validation.values.address || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.address &&
                              validation.touched.address
                                ? true
                                : false
                            }
                          />
                          {validation.errors.address &&
                          validation.touched.address ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <div className="d-flex gap-2 mb-2 justify-content-end">
                <Link to={"/users-list"}>
                  <button type="submit" className="btn btn-primary w-sm">
                    {"Back"}
                  </button>
                </Link>
                <div className="text-end mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <div className="mt-3">
                  <FormGroup>
                    <Label for="insurance-accepted">Insurance Accepted</Label>
                    <Input
                      type="select"
                      name="insuranceList"
                      id="insurance-accepted"
                      multiple
                      value={validation.values.insuranceList || []}
                      onChange={(e) => {
                        const options = e.target.options;
                        const value = [];
                        for (let i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            value.push(options[i].value);
                          }
                        }
                        validation.setFieldValue("insuranceList", value);
                      }}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.errors.insuranceList &&
                        validation.touched.insuranceList
                          ? true
                          : false
                      }
                    >
                      {insuranceList.map((insurance, index) => (
                        <option key={index} value={insurance}>
                          {insurance}
                        </option>
                      ))}
                    </Input>
                    {validation.errors.insurance_accepted &&
                    validation.touched.insurance_accepted ? (
                      <FormFeedback type="invalid">
                        {validation.errors.insurance_accepted}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </div>
                <div className="mt-3">
                  <FormGroup>
                    <Label for="doctors-providers">Contract Type:</Label>
                    <Input
                      type="select"
                      name="doctors_providers"
                      id="doctors-providers"
                      multiple
                      value={validation.values.doctors_providers || []}
                      onChange={(e) => {
                        const options = e.target.options;
                        const value = [];
                        for (let i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            value.push(options[i].value);
                          }
                        }
                        validation.setFieldValue("doctors_providers", value);
                      }}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.errors.doctors_providers &&
                        validation.touched.doctors_providers
                          ? true
                          : false
                      }
                    >
                      {doctorsList.map((doctor, index) => (
                        <option key={index} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </Input>

                    {validation.errors.doctors_providers &&
                    validation.touched.doctors_providers ? (
                      <FormFeedback type="invalid">
                        {validation.errors.doctors_providers}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
