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
import { useNavigate } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = () => {
  document.title = "Create Doctors | Practise Fellow";

  const history = useNavigate();
  const dispatch = useDispatch();

  const doctorsList = [
    "Part Time",
    "Full time",
    "Work from home",
    "Salaried",
    "Fix Contract",
    "Percentage",
  ];

  const [insuranceList, setInsuranceList] = useState([]);
  const [showCaqhPassword, setShowCaqhPassword] = useState(false);
  const [showPecosPassword, setShowPecosPassword] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      provider_fname: "",
      provider_lname: "",
      provider_mi: "",
      npi_number: "",
      tax_id: "",
      license_number: "",
      caqh_username: "",
      caqh_password: "",
      pecos_username: "",
      pecos_password: "",
      caqh_username: "",
      specialty: "",
      email: "",
      phone: "",
      address: "",
      insurance_accepted: [],
      doctors_providers: [],
    },
    validationSchema: Yup.object({
      provider_fname: Yup.string().required("Please Enter a Clinic Name"),
      insurance_accepted: Yup.array().min(
        1,
        "Please select at least one insurance"
      ),
      doctors_providers: Yup.array().min(
        1,
        "Please select at least one contract type"
      ),
    }),
    onSubmit: (values) => {
      const newProvider = {
        provider_fname: values.provider_fname,
        provider_lname: values.provider_lname,
        provider_mi: values.provider_mi,
        npi_number: values.npi_number,
        tax_id: values.tax_id,
        license_number: values.license_number,
        caqh_username: values.caqh_username,
        caqh_password: values.caqh_password,
        pecos_username: values.pecos_username,
        pecos_password: values.pecos_password,
        specialty: values.specialty,
        email: values.email,
        phone: values.phone,
        address: values.address,
        insuranceList: values.insurance_accepted,
        doctors_providers: values.doctors_providers,
      };
      dispatch(onAddNewDoctor(newProvider));
      history("/doctors-list");
      validation.resetForm();
    },
  });
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
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Doctor" pageTitle="Ecommerce" />

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
                            type={showCaqhPassword ? "text" : "password"}
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
                          <button
                            type="button"
                            onClick={() =>
                              setShowCaqhPassword(!showCaqhPassword)
                            }
                            className="btn btn-priamry"
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "red",
                              backgroundColor: "transparent", // Add this line
                              zIndex: 5,
                              cursor: "pointer",
                            }}
                          >
                            {showCaqhPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
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
                            type={showPecosPassword ? "text" : "password"}
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
                          <button
                            type="button"
                            onClick={() =>
                              setShowPecosPassword(!showPecosPassword)
                            }
                            className="btn btn-priamry"
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "red",
                              backgroundColor: "transparent", // Add this line
                              zIndex: 5,
                              cursor: "pointer",
                            }}
                          >
                            {showPecosPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
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
              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button>
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
                      name="insurance_accepted"
                      id="insurance-accepted"
                      multiple
                      value={validation.values.insurance_accepted || []}
                      onChange={(e) => {
                        const options = e.target.options;
                        const value = [];
                        for (let i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            value.push(options[i].value);
                          }
                        }
                        validation.setFieldValue("insurance_accepted", value);
                      }}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.errors.insurance_accepted &&
                        validation.touched.insurance_accepted
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
