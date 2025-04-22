import React, { useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
    Card, CardBody, Col, Container, CardHeader, Nav, NavItem, NavLink, Row,
    Input, Label, FormFeedback, Form, FormGroup
} from "reactstrap";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { api } from "../../config";

const UpdateUser = () => {
    document.title = "Update User | Practise Fellow";

    const history = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${api.API_URL}/user/${id}`);
            setUser(response.user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: user?.username || "",
            fname: user?.fname || "",
            lname: user?.lname || "",
            email: user?.email || "",
            phone: user?.phone || "",
            password: "", // Optional - handle this per your app rules
            role: user?.role || ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please Enter a User Name"),
            email: Yup.string().email("Invalid email").required("Please Enter Email"),
            fname: Yup.string().required("Please Enter First Name"),
            lname: Yup.string().required("Please Enter Last Name"),
            phone: Yup.string().required("Please Enter Phone Number"),
            role: Yup.string().required("Please Select Role"),
        }),
        onSubmit: async (values) => {
            try {
                const updatedUser = {
                    ...values,
                };

                // Optional: Remove empty password if not updated
                if (!updatedUser.password) {
                    delete updatedUser.password;
                }

                await axios.put(`${api.API_URL}/user/${id}`, updatedUser);

                history("/users-list");
            } catch (err) {
                console.error("Update failed:", err);
            }
        }
    });

    const roles = [
        "Clinic Admin", "Doctor/Therapist", "Clinical Staff",
        "Billing Staff", "Other Admin Staff", "Patient", "Super Admin"
    ];

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Update User" />
                <Row>
                    <Col lg={8}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                        }}>
                            <Card>
                                <CardHeader>
                                    <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }}>
                                                User Info
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>First Name</Label>
                                                <Input
                                                    name="fname"
                                                    value={validation.values.fname}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.fname && validation.errors.fname)}
                                                />
                                                <FormFeedback>{validation.errors.fname}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>Last Name</Label>
                                                <Input
                                                    name="lname"
                                                    value={validation.values.lname}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.lname && validation.errors.lname)}
                                                />
                                                <FormFeedback>{validation.errors.lname}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>Username</Label>
                                                <Input
                                                    name="username"
                                                    value={validation.values.username}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.username && validation.errors.username)}
                                                />
                                                <FormFeedback>{validation.errors.username}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>Role</Label>
                                                <Input
                                                    type="select"
                                                    name="role"
                                                    value={validation.values.role}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.role && validation.errors.role)}
                                                >
                                                    <option value="">Select Role</option>
                                                    {roles.map((role, index) => (
                                                        <option key={index} value={role}>{role}</option>
                                                    ))}
                                                </Input>
                                                <FormFeedback>{validation.errors.role}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>Phone</Label>
                                                <Input
                                                    name="phone"
                                                    value={validation.values.phone}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.phone && validation.errors.phone)}
                                                />
                                                <FormFeedback>{validation.errors.phone}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>Email</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    value={validation.values.email}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.email && validation.errors.email)}
                                                />
                                                <FormFeedback>{validation.errors.email}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup className="mb-3">
                                                <Label>Password (Leave blank to keep current)</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    value={validation.values.password}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={!!(validation.touched.password && validation.errors.password)}
                                                />
                                                <FormFeedback>{validation.errors.password}</FormFeedback>
                                            </FormGroup>
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
                          
                                <button type="submit" className="btn btn-success w-sm" disabled={loading}>
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateUser;
