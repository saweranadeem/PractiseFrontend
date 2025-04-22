import React, { useEffect, useState } from "react";
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
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

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
// Redux
import { useDispatch } from "react-redux";
import { addNewPatient } from "../../slices/thunks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import { api } from "../../config";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddPatient = () => {
  document.title = "Update Patient | Practise Fellow";
  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [medicalTags, setMedicalTags] = useState([]);
  const [medicalInputValue, setMedicalInputValue] = useState("");
  const [allergyTags, setAllergyTags] = useState([]);
  const [allergyInputValue, setAllergyInputValue] = useState("");
  const [surgeryTags, setSurgeryTags] = useState([]);
  const [surgeryInputValue, setSurgeryInputValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const { id } = useParams();

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.API_URL}/patient/${id}`);
      //   alert(JSON.stringify(response.patient));
      setPatient(response.patient);
      if (response.patient.medicalTags) {
        setMedicalTags(response.patient.medicalTags);
      }
      if (response.patient.allergyTags) {
        setAllergyTags(response.patient.allergyTags);
      }
      if (response.patient.surgeryTags) {
        setSurgeryTags(response.patient.surgeryTags);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  const history = useNavigate();
  const dispatch = useDispatch();
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fname: patient?.fname || "",
      lname: patient?.lname || "",
      dob: patient?.dob ? patient.dob.split("T")[0] : "",
      gender: patient?.gender || "",
      language: patient?.language || "",
      race: patient?.race || "",
      ssn: patient?.ssn || "",
      phone: patient?.phone || "",
      alt_phone: patient?.alt_phone || "",
      email: patient?.email || "",
      street: patient?.street || "",
      city: patient?.city || "",
      state: patient?.state || "",
      zip: patient?.zip || "",
      emergancy_contact_name: patient?.emergancy_contact_name || "",
      relation_to_patient: patient?.relation_to_patient || "",
      emergancy_contact_number: patient?.emergancy_contact_number || "",
      emergancy_contact_email: patient?.emergancy_contact_email || "",
      insurance_sequence: patient?.insurance_sequence || "",
      primary_insurance_provider: patient?.primary_insurance_provider || "",
      insurance_plan_name: patient?.insurance_plan_name || "",
      policy_number: patient?.policy_number || "",
      group_number: patient?.group_number || "",
      relation_with_subscriber: patient?.relation_with_subscriber || "",
      subscriber_name: patient?.subscriber_name || "",
      subscriber_dob: patient?.subscriber_dob
        ? patient.subscriber_dob.split("T")[0]
        : "",
      start_date: patient?.start_date ? patient.start_date.split("T")[0] : "",
      end_date: patient?.end_date ? patient.end_date.split("T")[0] : "",
      additional_notes: patient?.additional_notes || "",
      insurance_certificate: patient?.insurance_certificate || "",
      pcp: patient?.pcp || "",
      pcp_phone: patient?.pcp_phone || "",
      referer: patient?.referer || "",
      hipaaConsent: patient?.hipaaConsent || false,
      financial: patient?.financial || false,
      attorney: patient?.attorney || "",
      familyMedical: patient?.familyMedical || "",
      documents: patient?.documents || "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Please Enter a User Name"),
    }),
    onSubmit: async (values) => {
      const updatedPatient = {
        fname: values.fname,
        lname: values.lname,
        dob: values.dob,
        gender: values.gender,
        language: values.language,
        race: values.race,
        ssn: values.ssn,
        phone: values.phone,
        alt_phone: values.alt_phone,
        email: values.email,
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
        pcp: values.pcp,
        pcp_phone: values.pcp_phone,
        referer: values.referer,
        emergancy_contact_name: values.emergancy_contact_name,
        relation_to_patient: values.relation_to_patient,
        emergancy_contact_number: values.emergancy_contact_number,
        emergancy_contact_email: values.emergancy_contact_email,
        insurance_sequence: values.insurance_sequence,
        primary_insurance_provider: values.primary_insurance_provider,
        insurance_plan_name: values.insurance_plan_name,
        policy_number: values.policy_number,
        group_number: values.group_number,
        relation_with_subscriber: values.relation_with_subscriber,
        policy_number: values.policy_number,
        group_number: values.group_number,
        relation_with_subscriber: values.relation_with_subscriber,
        subscriber_name: values.subscriber_name,
        subscriber_dob: values.subscriber_dob,
        start_date: values.start_date,
        end_date: values.end_date,
        additional_notes: values.additional_notes,
        insurance_certificate: values.insurance_certificate,
        medicalTags: medicalTags,
        allergyTags: allergyTags,
        surgeryTags: surgeryTags,
        hipaaConsent: values.hipaaConsent,
        financial: values.financial,
        attorney: values.attorney,
        documents: values.documents,
        familyMedical: values.familyMedical,
      };
      try {
        await axios.put(`${api.API_URL}/patient/${id}`, updatedPatient);
        history("/patients-list");
      } catch (err) {
        console.error("Update failed:", err);
      }
    },
  });

  const toggleCard = (e) => {
    console.log("Toggle card called!");
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  const handleSpecializationInputChange = (e) => {
    setMedicalInputValue(e.target.value);
  };
  const handleSpecializationKeyPress = (e) => {
    if (e.key === "Enter" && medicalInputValue.trim() !== "") {
      e.preventDefault();
      if (!medicalTags.includes(medicalInputValue.trim())) {
        setMedicalTags([...medicalTags, medicalInputValue.trim()]);
      }
      setMedicalInputValue("");
    }
  };
  const handleSpecializationTagRemove = (index) => {
    setMedicalTags(medicalTags.filter((_, i) => i !== index));
  };
  const handleAllergyInputChange = (e) => {
    setAllergyInputValue(e.target.value);
  };
  const handleAllergyKeyPress = (e) => {
    if (e.key === "Enter" && allergyInputValue.trim() !== "") {
      e.preventDefault();
      if (!allergyTags.includes(allergyInputValue.trim())) {
        setAllergyTags([...allergyTags, allergyInputValue.trim()]);
      }
      setAllergyInputValue("");
    }
  };
  const handleAllergyTagRemove = (index) => {
    setAllergyTags(allergyTags.filter((_, i) => i !== index));
  };
  const handleSurgeryInputChange = (e) => {
    setSurgeryInputValue(e.target.value);
  };
  const handleSurgeryKeyPress = (e) => {
    if (e.key === "Enter" && surgeryInputValue.trim() !== "") {
      e.preventDefault();
      if (!surgeryTags.includes(surgeryInputValue.trim())) {
        setSurgeryTags([...surgeryTags, surgeryInputValue.trim()]);
      }
      setSurgeryInputValue("");
    }
  };
  const handleSurgeryTagRemove = (index) => {
    setSurgeryTags(surgeryTags.filter((_, i) => i !== index));
  };
  const toggleStatus = () => {
    setIsActive((prevStatus) => !prevStatus);
  };
  return (
    <div className="page-content">
      <Container fluid>
        {/* <pre> {JSON.stringify(patient)}</pre> */}

        <BreadCrumb title="Update Patient" />

        <Row>
          <Col lg={12}>
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
                        Basic Information
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
                        <label className="form-label" htmlFor="date-input">
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                          className="form-control"
                          id="date-input"
                          name="dob"
                          placeholder="Select Date"
                          value={validation.values.dob || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.dob && validation.touched.dob
                              ? true
                              : false
                          }
                        />
                        {validation.errors.dob && validation.touched.dob ? (
                          <FormFeedback type="invalid">
                            {validation.errors.dob}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="insurance-accepted">Gender</Label>
                        <Input
                          type="select"
                          name="gender"
                          id="gender"
                          value={validation.values.gender || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.errors.gender &&
                            validation.touched.gender
                              ? true
                              : false
                          }
                        >
                          <option value="">Select Gender</option>
                          {genders.map((role, index) => (
                            <option key={index} value={role}>
                              {role}
                            </option>
                          ))}
                        </Input>
                        {validation.errors.gender &&
                        validation.touched.gender ? (
                          <FormFeedback type="invalid">
                            {validation.errors.gender}
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
                          Preferred Language
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="language"
                          placeholder="Enter Language"
                          value={validation.values.language || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.language &&
                            validation.touched.language
                              ? true
                              : false
                          }
                        />
                        {validation.errors.language &&
                        validation.touched.language ? (
                          <FormFeedback type="invalid">
                            {validation.errors.language}
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
                          Race/Ethnicity
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="manufacturer-brand-input"
                          name="race"
                          placeholder="Enter Race/Ethnicity"
                          value={validation.values.race || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.race && validation.touched.race
                              ? true
                              : false
                          }
                        />
                        {validation.errors.race && validation.touched.race ? (
                          <FormFeedback type="invalid">
                            {validation.errors.race}
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
                          SSN(Social Security Number)
                        </label>
                        <div className="input-group mb-3">
                          <Input
                            type="number"
                            className="form-control"
                            id="product-stock-input"
                            placeholder="Enter SSN"
                            name="ssn"
                            value={validation.values.ssn || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.ssn && validation.touched.ssn
                                ? true
                                : false
                            }
                          />
                          {validation.errors.ssn && validation.touched.ssn ? (
                            <FormFeedback type="invalid">
                              {validation.errors.ssn}
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
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        Contact Information
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div style={{ cursor: "pointer" }} onClick={toggleCard}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </CardHeader>

                {isOpen && (
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
                            type="number"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="phone"
                            placeholder="Enter Number"
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
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Alternate Phone Number
                          </label>
                          <Input
                            type="number"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="alt_phone"
                            placeholder="Enter Alternate Nummber"
                            value={validation.values.alt_phone || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.alt_phone &&
                              validation.touched.alt_phone
                                ? true
                                : false
                            }
                          />
                          {validation.errors.alt_phone &&
                          validation.touched.alt_phone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.alt_phone}
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
                            Email Address
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-brand-input"
                            name="email"
                            placeholder="Enter Email"
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
                      </Col>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="street">
                              Street
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="street"
                              name="street"
                              placeholder="Enter address"
                              value={validation.values.street || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.street &&
                                validation.touched.street
                              }
                            />
                            {validation.errors.street &&
                              validation.touched.street && (
                                <FormFeedback type="invalid">
                                  {validation.errors.street}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="city">
                              City
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="city"
                              name="city"
                              placeholder="Enter city"
                              value={validation.values.city || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.city &&
                                validation.touched.city
                              }
                            />
                            {validation.errors.city &&
                              validation.touched.city && (
                                <FormFeedback type="invalid">
                                  {validation.errors.city}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>

                        <Col sm={3}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="state">
                              State
                            </label>
                            <select
                              className="form-select"
                              id="state"
                              name="state"
                              value={validation.values.state || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.state &&
                                validation.touched.state
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
                              validation.touched.state && (
                                <FormFeedback type="invalid">
                                  {validation.errors.state}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>

                        <Col sm={5}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="zip">
                              Zip
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="zip"
                              name="zip"
                              placeholder="Enter zip code"
                              value={validation.values.zip || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.zip && validation.touched.zip
                              }
                            />
                            {validation.errors.zip &&
                              validation.touched.zip && (
                                <FormFeedback type="invalid">
                                  {validation.errors.zip}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </Row>
                  </CardBody>
                )}
              </Card>
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        Emergency Contact
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div style={{ cursor: "pointer" }} onClick={toggleCard}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </CardHeader>

                {isOpen && (
                  <CardBody>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Emergency Contact Name
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="emergancy_contact_name"
                            placeholder="Enter Emergency Contact Name"
                            value={
                              validation.values.emergancy_contact_name || ""
                            }
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.emergancy_contact_name &&
                              validation.touched.emergancy_contact_name
                                ? true
                                : false
                            }
                          />
                          {validation.errors.emergancy_contact_name &&
                          validation.touched.emergancy_contact_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.emergancy_contact_name}
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
                            Relationship to Patient
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="relation_to_patient"
                            placeholder="Enter Relation"
                            value={validation.values.relation_to_patient || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.relation_to_patient &&
                              validation.touched.relation_to_patient
                                ? true
                                : false
                            }
                          />
                          {validation.errors.relation_to_patient &&
                          validation.touched.relation_to_patient ? (
                            <FormFeedback type="invalid">
                              {validation.errors.relation_to_patient}
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
                            Emergency Contact Phone Number
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-brand-input"
                            name="emergancy_contact_number"
                            placeholder="Enter Emergency Contact Number"
                            value={
                              validation.values.emergancy_contact_number || ""
                            }
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.emergancy_contact_number &&
                              validation.touched.emergancy_contact_number
                                ? true
                                : false
                            }
                          />
                          {validation.errors.emergancy_contact_number &&
                          validation.touched.emergancy_contact_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.emergancy_contact_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label">
                            Emergency Contact Email
                          </label>
                          <Input
                            type="email"
                            className="form-control"
                            name="emergancy_contact_email"
                            placeholder="Enter Emergency Email"
                            value={
                              validation.values.emergancy_contact_email || ""
                            }
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.emergancy_contact_email &&
                              validation.touched.emergancy_contact_email
                            }
                          />
                          {validation.errors.emergancy_contact_email &&
                            validation.touched.emergancy_contact_email && (
                              <FormFeedback type="invalid">
                                {validation.errors.emergancy_contact_email}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                )}
              </Card>

              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        Insurance Information
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div style={{ cursor: "pointer" }} onClick={toggleCard}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </CardHeader>

                {isOpen && (
                  <CardBody>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="insurance-sequence-input"
                          >
                            Insurance Sequence:
                          </label>
                          <Input
                            type="select"
                            className="form-control"
                            id="insurance-sequence-input"
                            name="insurance_sequence"
                            value={validation.values.insurance_sequence || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.insurance_sequence &&
                              validation.touched.insurance_sequence
                                ? true
                                : false
                            }
                          >
                            <option value="">Select Insurance Sequence</option>
                            <option value="Primary">Primary</option>
                            <option value="Secondary">Secondary</option>
                            <option value="Tertiary">Tertiary</option>
                            <option value="Other">Other</option>
                          </Input>
                          {validation.errors.insurance_sequence &&
                          validation.touched.insurance_sequence ? (
                            <FormFeedback type="invalid">
                              {validation.errors.insurance_sequence}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Primary Insurance Provider:
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="primary_insurance_provider"
                            placeholder="Enter Insurance Provider"
                            value={
                              validation.values.primary_insurance_provider || ""
                            }
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.primary_insurance_provider &&
                              validation.touched.primary_insurance_provider
                                ? true
                                : false
                            }
                          />
                          {validation.errors.primary_insurance_provider &&
                          validation.touched.primary_insurance_provider ? (
                            <FormFeedback type="invalid">
                              {validation.errors.primary_insurance_provider}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Insurance Plan Name
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="insurance_plan_name"
                            placeholder="Enter Insurance Plan name"
                            value={validation.values.insurance_plan_name || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.insurance_plan_name &&
                              validation.touched.insurance_plan_name
                                ? true
                                : false
                            }
                          />
                          {validation.errors.insurance_plan_name &&
                          validation.touched.insurance_plan_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.insurance_plan_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-brand-input"
                          >
                            Policy Number
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-brand-input"
                            name="policy_number"
                            placeholder="Enter Policy Number"
                            value={validation.values.policy_number || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.policy_number &&
                              validation.touched.policy_number
                                ? true
                                : false
                            }
                          />
                          {validation.errors.policy_number &&
                          validation.touched.policy_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.policy_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            Group Number
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="city"
                            name="group_number"
                            placeholder="Enter Group number"
                            value={validation.values.group_number || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.group_number &&
                              validation.touched.group_number
                            }
                          />
                          {validation.errors.group_number &&
                            validation.touched.group_number && (
                              <FormFeedback type="invalid">
                                {validation.errors.group_number}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="insurance-sequence-input"
                          >
                            Relation with Subscriber:
                          </label>
                          <Input
                            type="select"
                            className="form-control"
                            id="insurance-sequence-input"
                            name="relation_with_subscriber"
                            value={
                              validation.values.relation_with_subscriber ||
                              "Self"
                            }
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.relation_with_subscriber &&
                              validation.touched.relation_with_subscriber
                                ? true
                                : false
                            }
                          >
                            <option value="">Select Insurance Sequence</option>
                            <option value="Self">Self</option>
                            <option value="Patrent">Patrent</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Other">Other</option>
                          </Input>
                          {validation.errors.relation_with_subscriber &&
                          validation.touched.relation_with_subscriber ? (
                            <FormFeedback type="invalid">
                              {validation.errors.relation_with_subscriber}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            Subscriber Name
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="city"
                            name="subscriber_name"
                            placeholder="Enter Subscriber Name"
                            value={validation.values.subscriber_name || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.subscriber_name &&
                              validation.touched.subscriber_name
                            }
                          />
                          {validation.errors.subscriber_name &&
                            validation.touched.subscriber_name && (
                              <FormFeedback type="invalid">
                                {validation.errors.subscriber_name}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            Subscriber Date of Birth
                          </label>
                          <Input
                            type="date"
                            className="form-control"
                            id="city"
                            name="subscriber_dob"
                            value={validation.values.subscriber_dob || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.subscriber_dob &&
                              validation.touched.subscriber_dob
                            }
                          />
                          {validation.errors.subscriber_dob &&
                            validation.touched.subscriber_dob && (
                              <FormFeedback type="invalid">
                                {validation.errors.subscriber_dob}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            Start Date
                          </label>
                          <Input
                            type="date"
                            className="form-control"
                            id="city"
                            name="start_date"
                            value={validation.values.start_date || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.start_date &&
                              validation.touched.start_date
                            }
                          />
                          {validation.errors.start_date &&
                            validation.touched.start_date && (
                              <FormFeedback type="invalid">
                                {validation.errors.start_date}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            End Date
                          </label>
                          <Input
                            type="date"
                            className="form-control"
                            id="city"
                            name="end_date"
                            value={validation.values.end_date || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.end_date &&
                              validation.touched.end_date
                            }
                          />
                          {validation.errors.end_date &&
                            validation.touched.end_date && (
                              <FormFeedback type="invalid">
                                {validation.errors.end_date}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            Additional Notes
                          </label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="city"
                            name="additional_notes"
                            value={validation.values.additional_notes || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.additional_notes &&
                              validation.touched.additional_notes
                            }
                          />
                          {validation.errors.additional_notes &&
                            validation.touched.additional_notes && (
                              <FormFeedback type="invalid">
                                {validation.errors.additional_notes}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="form-check form-switch"
                          style={{
                            transform: "scale(1.5)",
                            marginLeft: "10px",
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="statusToggle"
                            checked={validation.values.financial || false}
                            onChange={() => {
                              validation.setFieldValue(
                                "financial",
                                !validation.values.financial
                              );
                            }}
                            style={{
                              backgroundColor: validation.values.financial
                                ? "green"
                                : "red",
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="statusToggle"
                          >
                            {validation.values.financial
                              ? "Active"
                              : "Inactive"}
                          </label>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                )}
              </Card>

              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        Medical Information
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div style={{ cursor: "pointer" }} onClick={toggleCard}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </CardHeader>

                {isOpen && (
                  <CardBody>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Primary Care Physician (PCP) Name:
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="pcp"
                            placeholder="Enter Primary Care"
                            value={validation.values.pcp || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.pcp && validation.touched.pcp
                                ? true
                                : false
                            }
                          />
                          {validation.errors.pcp && validation.touched.pcp ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pcp}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Primary Care Physician (PCP) Phone:
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="pcp_phone"
                            placeholder="Enter Primary Care Phone"
                            value={validation.values.pcp_phone || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.pcp_phone &&
                              validation.touched.pcp_phone
                                ? true
                                : false
                            }
                          />
                          {validation.errors.pcp_phone &&
                          validation.touched.pcp_phone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pcp_phone}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Referring Provider (if any)
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            name="referer"
                            placeholder="Enter Insurance Plan name"
                            value={validation.values.referer || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.referer &&
                              validation.touched.referer
                                ? true
                                : false
                            }
                          />
                          {validation.errors.referer &&
                          validation.touched.referer ? (
                            <FormFeedback type="invalid">
                              {validation.errors.referer}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <Card>
                          <CardHeader>
                            <h5 className="card-title mb-0">Medical History</h5>
                          </CardHeader>
                          <CardBody>
                            <FormGroup>
                              <div className="d-flex flex-wrap gap-2 mb-3">
                                {medicalTags.map((tag, index) => (
                                  <div
                                    key={index}
                                    className="badge bg-primary text-white d-flex align-items-center"
                                    style={{
                                      padding: "0.5rem 1rem",
                                      borderRadius: "20px",
                                    }}
                                  >
                                    {tag}
                                    <FaTimes
                                      style={{
                                        marginLeft: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleSpecializationTagRemove(index)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                              <Input
                                className="form-control"
                                placeholder="Enter specializations"
                                type="text"
                                name="medical_tags"
                                value={medicalInputValue}
                                onBlur={validation.handleBlur}
                                onChange={handleSpecializationInputChange}
                                onKeyPress={handleSpecializationKeyPress}
                                invalid={
                                  validation.errors.medical_tags &&
                                  validation.touched.medical_tags
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.medical_tags &&
                              validation.touched.medical_tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.medical_tags}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4}>
                        <Card>
                          <CardHeader>
                            <h5 className="card-title mb-0">Allergies</h5>
                          </CardHeader>
                          <CardBody>
                            <FormGroup>
                              <div className="d-flex flex-wrap gap-2 mb-3">
                                {allergyTags.map((tag, index) => (
                                  <div
                                    key={index}
                                    className="badge bg-primary text-white d-flex align-items-center"
                                    style={{
                                      padding: "0.5rem 1rem",
                                      borderRadius: "20px",
                                    }}
                                  >
                                    {tag}
                                    <FaTimes
                                      style={{
                                        marginLeft: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleAllergyTagRemove(index)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                              <Input
                                className="form-control"
                                placeholder="Enter Allergies"
                                type="text"
                                name="allergy_tags"
                                value={allergyInputValue}
                                onBlur={validation.handleBlur}
                                onChange={handleAllergyInputChange}
                                onKeyPress={handleAllergyKeyPress}
                                invalid={
                                  validation.errors.allergyTags &&
                                  validation.touched.allergyTags
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.allergyTags &&
                              validation.touched.allergyTags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.allergyTags}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4}>
                        <Card>
                          <CardHeader>
                            <h5 className="card-title mb-0">
                              Surgeries and Past Procedures
                            </h5>
                          </CardHeader>
                          <CardBody>
                            <FormGroup>
                              <div className="d-flex flex-wrap gap-2 mb-3">
                                {surgeryTags.map((tag, index) => (
                                  <div
                                    key={index}
                                    className="badge bg-primary text-white d-flex align-items-center"
                                    style={{
                                      padding: "0.5rem 1rem",
                                      borderRadius: "20px",
                                    }}
                                  >
                                    {tag}
                                    <FaTimes
                                      style={{
                                        marginLeft: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleSurgeryTagRemove(index)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                              <Input
                                className="form-control"
                                placeholder="Enter Surgeries"
                                type="text"
                                name="surgery_tags"
                                value={surgeryInputValue}
                                onBlur={validation.handleBlur}
                                onChange={handleSurgeryInputChange}
                                onKeyPress={handleSurgeryKeyPress}
                                invalid={
                                  validation.errors.surgery_tags &&
                                  validation.touched.surgery_tags
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.surgery_tags &&
                              validation.touched.surgery_tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.surgery_tags}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col lg={12}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="familyMedical">
                            Family Medical History & Current Medications (if
                            any)
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="familyMedical"
                            name="familyMedical"
                            value={validation.values.familyMedical || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.familyMedical &&
                              validation.touched.familyMedical
                            }
                          />
                          {validation.errors.familyMedical &&
                            validation.touched.familyMedical && (
                              <FormFeedback type="invalid">
                                {validation.errors.familyMedical}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                )}
              </Card>

              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        Additional Notes & Attachments
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div style={{ cursor: "pointer" }} onClick={toggleCard}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </CardHeader>

                {isOpen && (
                  <CardBody>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="document-type-select"
                          >
                            Document Type:
                          </label>
                          <Input
                            id="document-type-select"
                            name="documents"
                            type="select"
                            multiple
                            value={validation.values.documents || []}
                            onChange={(e) => {
                              const selectedOptions = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              );
                              validation.setFieldValue(
                                "documents",
                                selectedOptions
                              );
                              console.log(selectedOptions); // Outputs array of selected strings
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("documents", true)
                            }
                            classNamePrefix="select"
                          >
                            {[
                              {
                                value: "insurance_card",
                                label: "Insurance Card",
                              },
                              {
                                value: "medical_reports",
                                label: "Medical Reports",
                              },
                              {
                                value: "proof_of_insurance",
                                label: "Proof of Insurance",
                              },
                              {
                                value: "other_documents",
                                label: "Other Documents",
                              },
                            ].map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Input>
                          {validation.errors.documents &&
                          validation.touched.documents ? (
                            <FormFeedback type="invalid">
                              {validation.errors.documents}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="file-upload-input"
                          >
                            Upload Files
                          </label>
                          <Input
                            type="file"
                            className="form-control"
                            id="file-upload-input"
                            name="files"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              validation.setFieldValue("files", files);
                            }}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.errors.files &&
                              validation.touched.files
                                ? true
                                : false
                            }
                          />
                          {validation.errors.files &&
                          validation.touched.files ? (
                            <FormFeedback type="invalid">
                              {validation.errors.files}
                            </FormFeedback>
                          ) : null}

                          {validation.values.files &&
                            validation.values.files.length > 0 && (
                              <ul className="mt-2">
                                {validation.values.files.map((file, index) => (
                                  <li key={index}>{file.name}</li>
                                ))}
                              </ul>
                            )}
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            Guardian/Power of Attorney Information (if minor or
                            special needs)
                          </label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="Attorney"
                            name="attorney"
                            value={validation.values.attorney || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.attorney &&
                              validation.touched.attorney
                            }
                          />
                          {validation.errors.attorney &&
                            validation.touched.attorney && (
                              <FormFeedback type="invalid">
                                {validation.errors.Attorney}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="hipaa-consent"
                            name="hipaaConsent"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            checked={validation.values.hipaaConsent || false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="hipaa-consent"
                          >
                            HIPAA Consent
                          </label>
                          {validation.errors.hipaaConsent &&
                          validation.touched.hipaaConsent ? (
                            <FormFeedback type="invalid">
                              {validation.errors.hipaaConsent}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="financial-consent"
                            name="financial"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            checked={validation.values.financial || false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="financial-consent"
                          >
                            Financial Responsibility Agreement
                          </label>
                          {validation.errors.financial &&
                          validation.touched.financial ? (
                            <FormFeedback type="invalid">
                              {validation.errors.financial}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                )}
              </Card>
              <div className="d-flex gap-2 mb-2 justify-content-end">
                <Link to={"/patients-list"}>
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
        </Row>
      </Container>
    </div>
  );
};

export default AddPatient;
