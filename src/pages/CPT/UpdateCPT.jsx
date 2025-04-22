import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container, Row, Col, Card, Breadcrumb, CardHeader, CardBody, Form, Input,
    FormFeedback, Nav, NavItem, NavLink
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '../../config';

const roles = [
    "Mental Health", "Medical", "Surgical", "Dental", "Radiology", "Laboratory", "Physical Therapy", "Anesthesia", "Emergency Services",
    "Preventive Care", "Ophthalmology", "Pathology", "Pediatrics", "Obstetrics and Gynecology (OB/GYN)", "Cardiology", "Neurology",
    "Orthopedics", "Dermatology", "Hematology", "Oncology", "Gastroenterology", "Urology", "Endocrinology", "Chiropractic", "Speech Therapy",
    "Dietary and Nutritional Services"
];

const UpdateCPT = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        cptCode: "",
        shortDescription: "",
        longDescription: "",
        effectiveDate: "",
        expirationDate: "",
        defaultUnits: 1,
        defaultModifier: "",
        codeType: "",
        feeSchedule: ""
    });
    const [cptDetails,setCptDetails]=useState()
    const getCptById=async()=>{
        const response=await axios.get(`${api.API_URL}/cpt/${id}`)
        
        console.log("🚀 ~ getCptById ~ response:", response)
        setCptDetails(response.cpt)
    }

    useEffect(() => {
        getCptById();
    }, []);

    useEffect(() => {
        if (cptDetails) {
            setInitialValues({
                cptCode: cptDetails.cptCode || "",
                shortDescription: cptDetails.shortDescription || "",
                longDescription: cptDetails.longDescription || "",
                effectiveDate: cptDetails.effectiveDate?.slice(0, 10) || "",
                expirationDate: cptDetails.expirationDate?.slice(0, 10) || "",
                defaultUnits: cptDetails.defaultUnits || 1,
                defaultModifier: cptDetails.defaultModifier || "",
                codeType: cptDetails.codeType || "",
                feeSchedule: cptDetails.feeSchedule || ""
            });
        }
    }, [cptDetails]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            cptCode: Yup.string().required("Please enter a CPT code"),
            shortDescription: Yup.string().required("Please enter a short description"),
            longDescription: Yup.string().required("Please enter a long description"),
            effectiveDate: Yup.date().required("Please enter an effective date"),
            expirationDate: Yup.date(),
            defaultUnits: Yup.number().required("Please enter default units").positive().integer(),
            defaultModifier: Yup.string().matches(/^\d{2}$/, "Modifier must be two digits"),
            codeType: Yup.string().required("Please select a code type"),
            feeSchedule: Yup.number().required("Please enter a fee schedule").min(0, "Fee must be greater than or equal to 0")
        }),
        onSubmit: (values) => {
            dispatch(onUpdateCPT({ id, data: values }));
            navigate("/cpt-list");
        }
    });

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Update CPT" />
                <Row>
                    <Col lg={12}>
                        <Form onSubmit={validation.handleSubmit}>
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
                                        {/* CPT Code */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="cptCode">CPT Code</label>
                                                <Input
                                                    id="cptCode"
                                                    name="cptCode"
                                                    type="text"
                                                    value={validation.values.cptCode}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.cptCode && validation.touched.cptCode)}
                                                />
                                                <FormFeedback>{validation.errors.cptCode}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Code Type */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="codeType" className="form-label">Code Type</label>
                                                <Input
                                                    type="select"
                                                    id="codeType"
                                                    name="codeType"
                                                    value={validation.values.codeType}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.codeType && validation.touched.codeType)}
                                                >
                                                    <option value="">Select Code Type</option>
                                                    {roles.map((role, idx) => (
                                                        <option key={idx} value={role}>{role}</option>
                                                    ))}
                                                </Input>
                                                <FormFeedback>{validation.errors.codeType}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Short Description */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="shortDescription" className="form-label">Short Description</label>
                                                <Input
                                                    id="shortDescription"
                                                    name="shortDescription"
                                                    type="text"
                                                    value={validation.values.shortDescription}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.shortDescription && validation.touched.shortDescription)}
                                                />
                                                <FormFeedback>{validation.errors.shortDescription}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Long Description */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="longDescription" className="form-label">Long Description</label>
                                                <Input
                                                    id="longDescription"
                                                    name="longDescription"
                                                    type="text"
                                                    value={validation.values.longDescription}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.longDescription && validation.touched.longDescription)}
                                                />
                                                <FormFeedback>{validation.errors.longDescription}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Effective Date */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="effectiveDate" className="form-label">Effective Date</label>
                                                <Input
                                                    id="effectiveDate"
                                                    name="effectiveDate"
                                                    type="date"
                                                    value={validation.values.effectiveDate}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.effectiveDate && validation.touched.effectiveDate)}
                                                />
                                                <FormFeedback>{validation.errors.effectiveDate}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Expiration Date */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                                <Input
                                                    id="expirationDate"
                                                    name="expirationDate"
                                                    type="date"
                                                    value={validation.values.expirationDate}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.expirationDate && validation.touched.expirationDate)}
                                                />
                                                <FormFeedback>{validation.errors.expirationDate}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Default Units */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="defaultUnits" className="form-label">Default Units</label>
                                                <Input
                                                    id="defaultUnits"
                                                    name="defaultUnits"
                                                    type="number"
                                                    value={validation.values.defaultUnits}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.defaultUnits && validation.touched.defaultUnits)}
                                                />
                                                <FormFeedback>{validation.errors.defaultUnits}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Default Modifier */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="defaultModifier" className="form-label">Default Modifier</label>
                                                <Input
                                                    id="defaultModifier"
                                                    name="defaultModifier"
                                                    type="text"
                                                    value={validation.values.defaultModifier}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.defaultModifier && validation.touched.defaultModifier)}
                                                />
                                                <FormFeedback>{validation.errors.defaultModifier}</FormFeedback>
                                            </div>
                                        </Col>

                                        {/* Fee Schedule */}
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <label htmlFor="feeSchedule" className="form-label">Fee Schedule</label>
                                                <Input
                                                    id="feeSchedule"
                                                    name="feeSchedule"
                                                    type="number"
                                                    value={validation.values.feeSchedule}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.errors.feeSchedule && validation.touched.feeSchedule)}
                                                />
                                                <FormFeedback>{validation.errors.feeSchedule}</FormFeedback>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <div className="text-end mb-3">
                                <button type="submit" className="btn btn-primary w-sm">
                                    Update
                                </button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateCPT;
