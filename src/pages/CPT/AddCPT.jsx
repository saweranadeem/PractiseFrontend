import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"; // Assuming you use Reactstrap for UI components
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewCpt as onAddNewCPT } from "../../slices/thunks";

const roles = [
  "Mental Health",
  "Medical",
  "Surgical",
  "Dental",
  "Radiology",
  "Laboratory",
  "Physical Therapy",
  "Anesthesia",
  "Emergency Services",
  "Preventive Care",
  "Ophthalmology",
  "Pathology",
  "Pediatrics",
  "Obstetrics and Gynecology (OB/GYN)",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Dermatology",
  "Hematology",
  "Oncology",
  "Gastroenterology",
  "Urology",
  "Endocrinology",
  "Chiropractic",
  "Speech Therapy",
  "Dietary and Nutritional Services",
];

const AddCPT = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      cptCode: "",
      shortDescription: "",
      longDescription: "",
      effectiveDate: "",
      expirationDate: "",
      defaultUnits: 1,
      defaultModifier: "",
      codeType: "",
      feeSchedule: "",
    },
    validationSchema: Yup.object({
      cptCode: Yup.string().required("Please ccenter a CPT code"),
      shortDescription: Yup.string().required("Please enter a short description"),
      longDescription: Yup.string().required("Please enter a long description"),
      effectiveDate: Yup.date().required("Please enter an effective date"),
      expirationDate: Yup.date(),
      defaultUnits: Yup.number().required("Please enter default units").positive() .integer(),
      defaultModifier: Yup.string().matches(
        /^\d{2}$/,
        "Modifier must be two digits"
      ),
      codeType: Yup.string().required("Please select a code type"),
      feeSchedule: Yup.number()
        .required("Please enter a fee schedule")
        .min(0, "Fee must be greater than or equal to 0"),
    }),
    onSubmit: (values) => {
      // Prepare CPT code data for submission
      const cptCodeData = {
        cptCode: values.cptCode,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        effectiveDate: values.effectiveDate,
        expirationDate: values.expirationDate,
        defaultUnits: values.defaultUnits,
        defaultModifier: values.defaultModifier,
        codeType: values.codeType,
        feeSchedule: values.feeSchedule,
      };

      dispatch(onAddNewCPT(cptCodeData));

      navigate("/cpt-list");

      validation.resetForm();
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumb title="Create CPT" />

        <Row>
          <Col lg={12}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink style={{ cursor: "pointer" }}>
                        CPT Code Info
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="cptCode">
                          CPT Code
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="cptCode"
                          name="cptCode"
                          placeholder="Enter CPT Code"
                          value={validation.values.cptCode || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.cptCode &&
                            validation.touched.cptCode
                              ? true
                              : false
                          }
                        />
                        {validation.errors.cptCode &&
                          validation.touched.cptCode && (
                            <FormFeedback type="invalid">
                              {validation.errors.cptCode}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="codeType">
                          Code Type
                        </label>
                        <Input
                          type="select"
                          className="form-control"
                          id="codeType"
                          name="codeType"
                          value={validation.values.codeType || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.errors.codeType &&
                            validation.touched.codeType
                              ? true
                              : false
                          }
                        >
                          <option value="">Select Code Type</option>
                          {roles.map((role, index) => (
                            <option key={index} value={role}>
                              {role}
                            </option>
                          ))}
                        </Input>
                        {validation.errors.codeType &&
                          validation.touched.codeType && (
                            <FormFeedback type="invalid">
                              {validation.errors.codeType}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="shortDescription"
                        >
                          Short Description
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="shortDescription"
                          name="shortDescription"
                          placeholder="Enter Short Description"
                          value={validation.values.shortDescription || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.shortDescription &&
                            validation.touched.shortDescription
                              ? true
                              : false
                          }
                        />
                        {validation.errors.shortDescription &&
                          validation.touched.shortDescription && (
                            <FormFeedback type="invalid">
                              {validation.errors.shortDescription}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="longDescription">
                          Long Description
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="longDescription"
                          name="longDescription"
                          placeholder="Enter Long Description"
                          value={validation.values.longDescription || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.longDescription &&
                            validation.touched.longDescription
                              ? true
                              : false
                          }
                        />
                        {validation.errors.longDescription &&
                          validation.touched.longDescription && (
                            <FormFeedback type="invalid">
                              {validation.errors.longDescription}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="effectiveDate">
                          Effective Date
                        </label>
                        <Input
                          type="date"
                          className="form-control"
                          id="effectiveDate"
                          name="effectiveDate"
                          value={validation.values.effectiveDate || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.effectiveDate &&
                            validation.touched.effectiveDate
                              ? true
                              : false
                          }
                        />
                        {validation.errors.effectiveDate &&
                          validation.touched.effectiveDate && (
                            <FormFeedback type="invalid">
                              {validation.errors.effectiveDate}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="expirationDate">
                          Expiration Date
                        </label>
                        <Input
                          type="date"
                          className="form-control"
                          id="expirationDate"
                          name="expirationDate"
                          value={validation.values.expirationDate || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.expirationDate &&
                            validation.touched.expirationDate
                              ? true
                              : false
                          }
                        />
                        {validation.errors.expirationDate &&
                          validation.touched.expirationDate && (
                            <FormFeedback type="invalid">
                              {validation.errors.expirationDate}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="defaultUnits">
                          Default Units
                        </label>
                        <Input
                          type="number"
                          className="form-control"
                          id="defaultUnits"
                          name="defaultUnits"
                          value={validation.values.defaultUnits || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.defaultUnits &&
                            validation.touched.defaultUnits
                              ? true
                              : false
                          }
                        />
                        {validation.errors.defaultUnits &&
                          validation.touched.defaultUnits && (
                            <FormFeedback type="invalid">
                              {validation.errors.defaultUnits}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="defaultModifier">
                          Default Modifier
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="defaultModifier"
                          name="defaultModifier"
                          placeholder="Enter Modifier"
                          value={validation.values.defaultModifier || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.defaultModifier &&
                            validation.touched.defaultModifier
                              ? true
                              : false
                          }
                        />
                        {validation.errors.defaultModifier &&
                          validation.touched.defaultModifier && (
                            <FormFeedback type="invalid">
                              {validation.errors.defaultModifier}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="feeSchedule">
                          Fee Schedule
                        </label>
                        <Input
                          type="number"
                          className="form-control"
                          id="feeSchedule"
                          name="feeSchedule"
                          value={validation.values.feeSchedule || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.feeSchedule &&
                            validation.touched.feeSchedule
                              ? true
                              : false
                          }
                        />
                        {validation.errors.feeSchedule &&
                          validation.touched.feeSchedule && (
                            <FormFeedback type="invalid">
                              {validation.errors.feeSchedule}
                            </FormFeedback>
                          )}
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

export default AddCPT;
