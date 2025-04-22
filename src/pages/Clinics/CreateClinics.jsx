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
import { addNewClinic as onAddNewClinic } from "../../slices/thunks";
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
import axios from "axios";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = () => {
  document.title = "Create Clinic | Practise Fellow";

  const history = useNavigate();
  const dispatch = useDispatch();
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const [date, setDate] = useState(dateFormat());

  // const insuranceList = [
  //   "Aetna", "Blue Cross", "Cigna", "United Health", "Humana", "Medicare", "Medicaid"
  // ];

  const doctorsList = [
    "Dr. John Smith",
    "Dr. Emily Johnson",
    "Dr. Michael Brown",
    "Dr. Sarah Davis",
  ];

  const [serviceTags, setServiceTags] = useState([]);
  const [serviceInputValue, setServiceInputValue] = useState("");
  const [specializationTags, setSpecializationTags] = useState([]);
  const [specializationInputValue, setSpecializationInputValue] = useState("");
  const [insuranceList, setInsuranceList] = useState([]);
  const [tabsData, setTabsData] = useState({
    1: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      owner_fname: "",
      owner_lname: "",
      owner_email: "",
      owner_password: "",
      clinic_email: "",
      clinic_phone: "",
      clinic_website: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Clinic Name"),
    }),
    onSubmit: (values) => {
      console.log("Specialization tags before submission:", specializationTags);

      const newClinic = {
        name: values.name,
        owner_fname: values.owner_fname,
        owner_lname: values.owner_lname,
        owner_email: values.owner_email,
        owner_password: values.owner_password,
        clinic_email: values.clinic_email,
        clinic_phone: values.clinic_phone,
        clinic_website: values.clinic_website,
        specialization: specializationTags,
        services: serviceTags,
        doctors_providers: values.doctors_providers,
        insurance_accepted: values.insurance_accepted,
        npi: values.npi,
        addresses: tabsData,
      };
      dispatch(onAddNewClinic(newClinic));
      history("/clinics-list");
      validation.resetForm();
      console.log(newClinic);
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

  const handleServiceKeyPress = (e) => {
    if (e.key === "Enter" && serviceInputValue.trim() !== "") {
      e.preventDefault();
      if (!serviceTags.includes(serviceInputValue.trim())) {
        setServiceTags([...serviceTags, serviceInputValue.trim()]);
      }
      setServiceInputValue("");
    }
  };

  const handleServiceTagRemove = (index) => {
    const newTags = serviceTags.filter((_, tagIndex) => tagIndex !== index);
    setServiceTags(newTags);
  };

  const handleServiceInputChange = (e) => {
    setServiceInputValue(e.target.value);
  };

  const handleSpecializationKeyPress = (e) => {
    if (e.key === "Enter" && specializationInputValue.trim() !== "") {
      e.preventDefault();
      const newTag = specializationInputValue.trim();
      if (!specializationTags.includes(newTag)) {
        setSpecializationTags([...specializationTags, newTag]);
      }
      setSpecializationInputValue("");
    }
  };

  const handleSpecializationInputChange = (e) => {
    setSpecializationInputValue(e.target.value);
  };

  const [customActiveTab, setCustomActiveTab] = useState("1");
  const [tabs, setTabs] = useState([{ id: "1", name: "Address 1" }]);

  const addNewTab = () => {
    const newTabId = (tabs.length + 1).toString();
    const newTab = {
      id: newTabId,
      name: `Address ${newTabId}`,
      data: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    };
    setTabs([...tabs, newTab]);
    setCustomActiveTab(newTabId);
  };

  const removeTab = (tabId) => {
    const filteredTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(filteredTabs);
    const filteredTabsData = { ...tabsData };
    delete filteredTabsData[tabId];
    setTabsData(filteredTabsData);
    setCustomActiveTab(filteredTabs.length > 0 ? filteredTabs[0].id : "1"); // Set the active tab to the first available
  };

  const handleChange = (tabId, e) => {
    const { name, value } = e.target;
    setTabsData((prevData) => ({
      ...prevData,
      [tabId]: {
        ...prevData[tabId],
        [name]: value,
      },
    }));
  };

  const toggleCustom = (tab) => {
    setCustomActiveTab(tab);
  };
  const handleSpecializationTagRemove = (index) => {
    setSpecializationTags(specializationTags.filter((_, i) => i !== index));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Clinic" pageTitle="Ecommerce" />

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
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Clinic Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter clinic name"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.name && validation.touched.name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
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
                          Owner First Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="owner_fname"
                          placeholder="Enter Owner First Name"
                          value={validation.values.owner_fname || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.owner_fname &&
                            validation.touched.owner_fname
                              ? true
                              : false
                          }
                        />
                        {validation.errors.owner_fname &&
                        validation.touched.owner_fname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.owner_fname}
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
                          Owner Last Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="owner_lname"
                          placeholder="Enter Owner Last Name"
                          value={validation.values.owner_lname || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.owner_lname &&
                            validation.touched.owner_lname
                              ? true
                              : false
                          }
                        />
                        {validation.errors.owner_lname &&
                        validation.touched.owner_lname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.owner_lname}
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
                          Owner Email
                        </label>
                        <Input
                          type="email"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="owner_email"
                          placeholder="Enter Owner email"
                          value={validation.values.owner_email || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.owner_email &&
                            validation.touched.owner_email
                              ? true
                              : false
                          }
                        />
                        {validation.errors.owner_email &&
                        validation.touched.owner_email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.owner_email}
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
                          Owner Password
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="password"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter Owner Password"
                            name="owner_password"
                            value={validation.values.owner_password || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.owner_password &&
                              validation.touched.owner_password
                                ? true
                                : false
                            }
                          />
                          {validation.errors.owner_password &&
                          validation.touched.owner_password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.owner_password}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    {tabs.map((tab) => (
                      <NavItem key={tab.id}>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTab === tab.id,
                          })}
                          onClick={() => toggleCustom(tab.id)}
                        >
                          {tab.name}
                          {tab.id !== "1" && (
                            <FaTimes
                              style={{
                                marginLeft: "8px",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeTab(tab.id);
                              }}
                            />
                          )}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                </CardHeader>

                <CardBody>
                  <TabContent activeTab={customActiveTab}>
                    {tabs.map((tab) => (
                      <TabPane key={tab.id} tabId={tab.id}>
                        <Row>
                          <Col lg={12}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor={`street-${tab.id}`}
                              >
                                Street
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                id={`street-${tab.id}`}
                                name="street"
                                placeholder="Enter address"
                                value={tabsData[tab.id]?.street || ""}
                                onBlur={validation.handleBlur}
                                onChange={(e) => handleChange(tab.id, e)}
                                invalid={
                                  validation.errors.street &&
                                  validation.touched.street
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.street &&
                              validation.touched.street ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.street}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor={`city-${tab.id}`}
                              >
                                City
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                id={`city-${tab.id}`}
                                name="city"
                                placeholder="Enter city"
                                value={tabsData[tab.id]?.city || ""}
                                onBlur={validation.handleBlur}
                                onChange={(e) => handleChange(tab.id, e)}
                                invalid={
                                  validation.errors.city &&
                                  validation.touched.city
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.city &&
                              validation.touched.city ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.city}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col sm={3}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor={`state-${tab.id}`}
                              >
                                State
                              </label>
                              <div className="input-group mb-3">
                                <select
                                  className="form-select"
                                  id={`state-${tab.id}`}
                                  name="state"
                                  value={tabsData[tab.id]?.state || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={(e) => handleChange(tab.id, e)}
                                  invalid={
                                    validation.errors.state &&
                                    validation.touched.state
                                      ? true
                                      : false
                                  }
                                >
                                  <option value="">Select a state</option>
                                  {states.map((state, index) => (
                                    <option key={index} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </select>
                                {validation.errors.state &&
                                validation.touched.state ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.state}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                          <Col sm={5}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor={`zip-${tab.id}`}
                              >
                                Zip
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  id={`zip-${tab.id}`}
                                  placeholder="Enter zip code"
                                  name="zip"
                                  value={tabsData[tab.id]?.zip || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={(e) => handleChange(tab.id, e)}
                                  invalid={
                                    validation.errors.zip &&
                                    validation.touched.zip
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.zip &&
                                validation.touched.zip ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.zip}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    ))}
                  </TabContent>

                  <div className="d-flex justify-content-end mt-3">
                    <Button color="primary" onClick={addNewTab}>
                      Add another address
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        General Info
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
                          Phone Number
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-name-input"
                          name="clinic_phone"
                          placeholder="Enter Clinic Phone Number"
                          value={validation.values.clinic_phone || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.clinic_phone &&
                            validation.touched.clinic_phone
                              ? true
                              : false
                          }
                        />
                        {validation.errors.clinic_phone &&
                        validation.touched.clinic_phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors.clinic_phone}
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
                          Clinic Email Address
                        </label>
                        <Input
                          type="email"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="clinic_email"
                          placeholder="Enter email"
                          value={validation.values.clinic_email || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.clinic_email &&
                            validation.touched.clinic_email
                              ? true
                              : false
                          }
                        />
                        {validation.errors.clinic_email &&
                        validation.touched.clinic_email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.clinic_email}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-stock-input"
                        >
                          Website
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="text"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter website"
                            name="clinic_website"
                            value={validation.values.clinic_website || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.clinic_website &&
                              validation.touched.clinic_website
                                ? true
                                : false
                            }
                          />
                          {validation.errors.clinic_website &&
                          validation.touched.clinic_website ? (
                            <FormFeedback type="invalid">
                              {validation.errors.clinic_website}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Clinic Logo</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
                    <h5 className="fs-14 mb-1">Logo</h5>
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <label htmlFor="product-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="" data-bs-original-title="Select Image">
                            <div className="avatar-xs">
                              <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                <i className="ri-image-fill"></i>
                              </div>
                            </div>
                          </label>
                          <input className="form-control d-none" defaultValue="" id="product-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded">
                            <img src="" id="product-img" alt="" className="avatar-md h-auto" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               
                </CardBody>
              </Card> */}

              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Specializations</h5>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {specializationTags.map((tag, index) => (
                      <div
                        key={index}
                        className="badge bg-primary text-white d-flex align-items-center"
                        style={{ padding: "0.5rem 1rem", borderRadius: "20px" }}
                      >
                        {tag}
                        <FaTimes
                          style={{ marginLeft: "8px", cursor: "pointer" }}
                          onClick={() => handleSpecializationTagRemove(index)}
                        />
                      </div>
                    ))}
                  </div>
                  <Input
                    className="form-control"
                    placeholder="Enter specializations"
                    type="text"
                    name="specialization_tags"
                    value={specializationInputValue}
                    onBlur={validation.handleBlur}
                    onChange={handleSpecializationInputChange}
                    onKeyPress={handleSpecializationKeyPress}
                    invalid={
                      validation.errors.specialization_tags &&
                      validation.touched.specialization_tags
                        ? true
                        : false
                    }
                  />
                  {validation.errors.specialization_tags &&
                  validation.touched.specialization_tags ? (
                    <FormFeedback type="invalid">
                      {validation.errors.specialization_tags}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Services Offered</h5>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {serviceTags.map((tag, index) => (
                      <div
                        key={index}
                        className="badge bg-primary text-white d-flex align-items-center"
                        style={{ padding: "0.5rem 1rem", borderRadius: "20px" }}
                      >
                        {tag}
                        <FaTimes
                          style={{ marginLeft: "8px", cursor: "pointer" }}
                          onClick={() => handleServiceTagRemove(index)}
                        />
                      </div>
                    ))}
                  </div>
                  <Input
                    className="form-control"
                    placeholder="Enter services"
                    type="text"
                    name="product_tags"
                    value={serviceInputValue}
                    onBlur={validation.handleBlur}
                    onChange={handleServiceInputChange}
                    onKeyPress={handleServiceKeyPress}
                    invalid={
                      validation.errors.product_tags &&
                      validation.touched.product_tags
                        ? true
                        : false
                    }
                  />
                  {validation.errors.product_tags &&
                  validation.touched.product_tags ? (
                    <FormFeedback type="invalid">
                      {validation.errors.product_tags}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Insurance and Provider Info</h5>
              </CardHeader>
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
                      onChange={validation.handleChange}
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

                {/* Doctors and Providers Multi-select Dropdown */}
                <div className="mt-3">
                  <FormGroup>
                    <Label for="doctors-providers">Doctors and Providers</Label>
                    <Input
                      type="select"
                      name="doctors_providers"
                      id="doctors-providers"
                      multiple
                      value={validation.values.doctors_providers || []}
                      onChange={validation.handleChange}
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

                {/* Number Input Field with 10 digits validation */}
                <div className="mt-3">
                  <FormGroup>
                    <Label for="npi">National Provider Identifier (NPI)</Label>
                    <Input
                      type="number" // Set type to "text" to handle only numeric characters
                      name="npi" // Changed to "npi" to match the field name
                      id="npi"
                      value={validation.values.npi || ""}
                      onChange={(e) => {
                        // Only allow numeric input, and limit to exactly 10 digits
                        const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                        if (value.length <= 10) {
                          validation.handleChange(e); // Update value only if it's 10 digits or less
                        }
                      }}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.errors.npi && validation.touched.npi
                          ? true
                          : false
                      }
                      maxLength={10} // Limit input to 10 characters
                      placeholder="Enter 10-digit NPI"
                    />
                    {validation.errors.npi && validation.touched.npi ? (
                      <FormFeedback type="invalid">
                        {validation.errors.npi}
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
