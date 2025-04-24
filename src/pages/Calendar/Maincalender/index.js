import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "react-select";

//Import Icons
import FeatherIcon from "feather-icons-react";

import {
  Card,
  CardBody,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Button,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

//Simple bar
import SimpleBar from "simplebar-react";
import UpcommingEvents from "./UpcommingEvents";
import listPlugin from "@fullcalendar/list";

import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  updateEvent as onUpdateEvent,
  resetCalendar,
} from "../../../slices/thunks";
import { createSelector } from "reselect";
import axios from "axios";
import { api } from "../../../config";
const Calender = () => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({});
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedNewDay, setSelectedNewDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditButton, setIsEditButton] = useState(true);
  const [upcommingevents, setUpcommingevents] = useState([]);
  const [cptCodes, setCptCodes] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const selectLayoutState = (state) => state.Calendar;
  const calendarDataProperties = createSelector(selectLayoutState, (state) => ({
    events: state.events,
    categories: state.categories,
    isEventUpdated: state.isEventUpdated,
  }));

  const { events, categories, isEventUpdated } = useSelector(
    calendarDataProperties
  );

  useEffect(() => {
    dispatch(onGetEvents());
    dispatch(onGetCategories());
    // new Draggable(document.getElementById("external-events"), {
    //   itemSelector: ".external-event",
    // });
  }, [dispatch]);

  useEffect(() => {
    setUpcommingevents(events);
    upcommingevents.slice().sort(function (o1, o2) {
      return new Date(o1.start) - new Date(o2.start);
    });
  }, [events, upcommingevents]);

  useEffect(() => {
    if (isEventUpdated) {
      setIsEdit(false);
      setEvent({});
      setTimeout(() => {
        dispatch(resetCalendar("isEventUpdated", false));
      }, 500);
    }
  }, [dispatch, isEventUpdated]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
      setIsEditButton(true);
    } else {
      setModal(true);
    }
  };

  const fetchCpt = async () => {
    const response = await axios.get(`${api.API_URL}/cpt`);
    setCptCodes(response.cpts);
  };
  const fetchDoctors = async () => {
    const response = await axios.get(`${api.API_URL}/doctors`);
    // alert(JSON.stringify(response));
    setDoctors(response.doctors);
  };
  const fetchPatients = async () => {
    const response = await axios.get(`${api.API_URL}/patient`);
    setPatients(response.patients);
  };
  const fetchEvents = async () => {
    const response = await axios.get(`${api.API_URL}/appointments`);
    setAppointments(response.events);
  };

  const fetchClinics = async () => {
    try {
      const response = await axios.get(`${api.API_URL}/clinic`);
      setClinics(response.providers);
      // alert(JSON.stringify(response.providers));

      // alert(JSON.stringify(clinics));
    } catch (err) {
      setError("Failed to fetch clinics");
    }
  };

  useEffect(() => {
    fetchClinics();
    fetchCpt();
    fetchDoctors();
    fetchPatients();
    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedNewDay(date);
    setSelectedDay(modifiedData);
    toggle();
  };

  const str_dt = function formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date(date),
      month = "" + monthNames[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day + " " + month, year].join(",");
  };

  const date_r = function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const handleEventClick = (arg) => {
    console.log(arg.event);
    const event = arg.event;

    const st_date = event.start;
    const ed_date = event.end;
    const r_date =
      ed_date == null
        ? str_dt(st_date)
        : str_dt(st_date) + " to " + str_dt(ed_date);
    const er_date =
      ed_date == null
        ? date_r(st_date)
        : date_r(st_date) + " to " + date_r(ed_date);

    setEvent({
      id: event.id,
      title: event.title,
      doctor: event._def.extendedProps.doctorId || "",
      patient: event.title || "",
      cpt: event._def.extendedProps.cptCode || "",
      start: event.start,
      end: event.end,
      startTime: event._def.extendedProps.startTime || "",
      endTime: event._def.extendedProps.endTime || "",
      totalMinutes: event._def.extendedProps.totalMinutes || "",
      location: event._def.extendedProps.location || "",
      description: event._def.extendedProps.description || "",
      className: event.classNames,
      category: event.classNames[0],
      defaultDate: er_date,
      datetag: r_date,
    });

    setIsEdit(true);
    setIsEditButton(false);
    toggle();
  };

  const handleDeleteEvent = async (title) => {
    const response = await axios.delete(`${api.API_URL}/appointments/${title}`);

    if (response.success) {
      setDeleteModal(false);
      toggle();
      fetchEvents();
    }
  };

  const calculateTotalMinutes = (start, end) => {
    if (!start || !end) return 0;
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    return endMinutes >= startMinutes ? endMinutes - startMinutes : 0;
  };

  const updateTotalMinutes = (startTime, endTime) => {
    if (startTime && endTime) {
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);
      const start = startH * 60 + startM;
      const end = endH * 60 + endM;

      if (start > end) {
        validation.setFieldError(
          "endTime",
          "End time must be after start time"
        );
        validation.setFieldValue("totalMinutes", "");
      } else {
        validation.setFieldError("endTime", "");
        const diff = end - start;
        validation.setFieldValue("totalMinutes", diff);
      }
    } else {
      validation.setFieldValue("totalMinutes", "");
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      doctor: (event && event.doctor) || "",
      patient: (event && event.title) || "",
      cpt: (event && event.cpt) || "",
      defaultDate: (event && event.defaultDate) || "",
      startTime: (event && event.startTime) || "",
      endTime: (event && event.endTime) || "",
      totalMinutes: (event && event.totalMinutes) || "",
      location: (event && event.location) || "",
      description: (event && event.description) || "",
      eventName: (event && event.eventName) || "",
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required("Please select a Doctor"),
      patient: Yup.string().required("Please select a Patient"),
      cpt: Yup.string().required("Please select a CPT Code"),
      defaultDate: Yup.string().required("Please select an Appointment Date"),
      startTime: Yup.string().required("Please select a Start Time"),
      endTime: Yup.string().required("Please select an End Time"),
      location: Yup.string().required("Please enter a Location"),
    }),
    onSubmit: (values) => {
      var updatedDay = "";
      if (selectedNewDay) {
        updatedDay = new Date(selectedNewDay[1]);
        updatedDay.setDate(updatedDay.getDate() + 1);
      }

      const totalMinutes = calculateTotalMinutes(
        values.startTime,
        values.endTime
      );

      const payload = {
        _id: isEdit ? event._id : event._id, // Use existing _id for edits, generate new ObjectId for creates
        doctorId: values.doctor,
        patientId: values.patient,
        cptCode: values.cpt,
        appointmentDate: values.defaultDate.split(" to ")[0],
        startTime: values.startTime,
        endTime: values.endTime,
        totalMinutes,
        location: values.location,
        description: values.description,
        title: values.patient,
        eventName: values.eventName,
        start: selectedDay ? selectedNewDay[0] : new Date(),
        end: selectedDay ? updatedDay : new Date(),
        className: "bg-primary-subtle",
      };

      if (isEdit) {
        dispatch(onUpdateEvent(payload));
        axios
          .put(`${api.API_URL}/appointments/${payload.id}`, payload)
          .then((response) => {
            console.log("Appointment updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating appointment:", error);
          });
      } else {
        dispatch(onAddNewEvent(payload));
        axios
          .post(`${api.API_URL}/appointments`, payload)
          .then((response) => {
            console.log("Appointment created:", response.data);
            fetchEvents();
          })
          .catch((error) => {
            console.error("Error creating appointment:", error);
          });
      }

      validation.resetForm();
      setSelectedDay(null);
      setSelectedNewDay(null);
      toggle();
    },
  });

  const submitOtherEvent = () => {
    document.getElementById("form-event").classList.remove("view-event");
    document
      .getElementById("event-title")
      .classList.replace("d-none", "d-block");
    document
      .getElementById("event-category")
      .classList.replace("d-none", "d-block");
    document
      .getElementById("event-start-date")
      .parentNode.classList.remove("d-none");
    document
      .getElementById("event-start-date")
      .classList.replace("d-none", "d-block");
    document
      .getElementById("event-location")
      .classList.replace("d-none", "d-block");
    document
      .getElementById("event-description")
      .classList.replace("d-none", "d-block");
    document
      .getElementById("event-start-date-tag")
      .classList.replace("d-block", "d-none");
    document
      .getElementById("event-location-tag")
      .classList.replace("d-block", "d-none");
    document
      .getElementById("event-description-tag")
      .classList.replace("d-block", "d-none");

    setIsEditButton(true);
  };

  const onDrag = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const draggedElclass = draggedEl.className;
    if (
      draggedEl.classList.contains("external-event") &&
      draggedElclass.indexOf("fc-event-draggable") === -1
    ) {
      const modifiedData = {
        id: Math.floor(Math.random() * 1000),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
      dispatch(onAddNewEvent(modifiedData));
    }
  };

  const cptOptions = cptCodes.map((code) => ({
    value: code._id,
    label: `${code.cptCode} - ${code.shortDescription}`,
  }));

  const doctorOptions = doctors.map((doctor) => ({
    value: doctor._id,
    label: `${doctor.provider_fname} - ${doctor.provider_fname}`,
  }));
  const patientOptions = patients.map((patient) => ({
    value: patient._id,
    label: `${patient.fname} - ${patient.lname}`,
  }));

  const handleChange = (field, selectedOption) => {
    validation.setFieldValue(field, selectedOption ? selectedOption.value : "");
  };

  const formattedAppointments = appointments.map((app) => ({
    title: app.eventName || "No Name",
    start: app.appointmentDate,
    allDay: true,
  }));

  {
    console.log(event);
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteEvent(event.title)}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        {/* {JSON.stringify(clinics)} */}
        <Container fluid>
          <BreadCrumb title="Calendar" pageTitle="Apps" />
          <Row>
            <Col xs={12}>
              <Row>
                <Col xl={4}>
                  <Select
                    isMulti
                    name="doctorListing"
                    placeholder="Team Members"
                    options={doctors.map((doctor) => ({
                      value: doctor._id,
                      label: `${doctor.provider_fname} ${
                        doctor.provider_lname || ""
                      }`,
                    }))}
                    value={doctors
                      .filter((doctor) =>
                        validation.values.doctorListing?.includes(doctor._id)
                      )
                      .map((doctor) => ({
                        value: doctor._id,
                        label: `${doctor.provider_fname} ${
                          doctor.provider_lname || ""
                        }`,
                      }))}
                    onChange={(selected) => {
                      validation.setFieldValue(
                        "doctorListing",
                        selected ? selected.map((item) => item.value) : []
                      );
                    }}
                    onBlur={validation.handleBlur}
                    classNamePrefix="react-select"
                    styles={{
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#003366", // Navy blue background
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "white", // White text
                      }),
                      // multiValueRemove: (base) => ({
                      //   ...base,
                      //   color: "white",
                      //   ":hover": {
                      //     backgroundColor: "#003366",
                      //     color: "white",
                      //   },
                      // }),
                    }}
                  />
                </Col>
                <Col xs={4}>
                  <Select
                    isMulti
                    name="Cliniclocation"
                    placeholder=" Clinic Location"
                    options={clinics.map((location) => {
                      const address =
                        location.addresses && location.addresses["1"]
                          ? location.addresses["1"]
                          : {};

                      return {
                        value: location._id,
                        label: `${address.street || "No Street"}, ${
                          address.city || ""
                        }, ${address.state || ""}`,
                      };
                    })}
                    value={clinics
                      .filter((location) =>
                        validation.values.Cliniclocation?.includes(location._id)
                      )
                      .map((location) => {
                        const address =
                          location.addresses && location.addresses["1"]
                            ? location.addresses["1"]
                            : {};

                        return {
                          value: location._id,
                          label: `${address.street || "No Street"}, ${
                            address.city || ""
                          }, ${address.state || ""}`,
                        };
                      })}
                    onChange={(selected) => {
                      validation.setFieldValue(
                        "Cliniclocation",
                        selected ? selected.map((item) => item.value) : []
                      );
                    }}
                    onBlur={validation.handleBlur}
                    classNamePrefix="react-select"
                    styles={{
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#003366",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "white",
                      }),
                    }}
                  />
                </Col>
                <Col xl={4}>
                  <Card className="card-h-100">
                    {/* <CardBody> */}
                    <button
                      className="btn btn-primary w-100"
                      id="btn-new-event"
                      onClick={toggle}
                    >
                      <i className="mdi mdi-plus"></i> Create New Event
                    </button>

                    {/* <div id="external-events">
                        <br />
                        <p className="text-muted">
                          Drag and drop your event or click in the calendar
                        </p>
                        {categories &&
                          categories.map((category) => (
                            <div
                              className={`bg-${category.type}-subtle external-event fc-event text-${category.type}`}
                              key={"cat-" + category.id}
                              draggable
                              onDrag={(event) => {
                                onDrag(event, category);
                              }}
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                              {category.title}
                            </div>
                          ))}
                      </div> */}
                    {/* </CardBody> */}
                  </Card>
                </Col>
              </Row>
              <div style={{ clear: "both" }}></div>

              <Modal isOpen={modal} id="event-modal" centered>
                <ModalHeader
                  toggle={toggle}
                  tag="h5"
                  className="p-3 bg-info-subtle modal-title"
                >
                  {!!isEdit ? "Edit Event" : "Add Appointment"}
                </ModalHeader>
                <ModalBody>
                  <Form
                    className={
                      !!isEdit
                        ? "needs-validation view-event"
                        : "needs-validation"
                    }
                    name="event-form"
                    id="form-event"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {!!isEdit ? (
                      <div className="text-end">
                        <Link
                          to="#"
                          className="btn btn-sm btn-soft-primary"
                          id="edit-event-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            submitOtherEvent();
                            return false;
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                    ) : null}

                    <div className="event-details">
                      <div className="d-flex mb-2">
                        <div className="flex-grow-1 d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <i className="ri-calendar-event-line text-muted fs-16"></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6
                              className="d-block fw-semibold mb-0"
                              id="event-start-date-tag"
                            >
                              {event ? event.datetag : ""}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0 me-3">
                          <i className="ri-map-pin-line text-muted fs-16"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="d-block fw-semibold mb-0">
                            <span id="event-location-tag">
                              {event && event.location !== undefined
                                ? event.location
                                : "No Location"}
                            </span>
                          </h6>
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="ri-discuss-line text-muted fs-16"></i>
                        </div>
                        <div className="flex-grow-1">
                          <p
                            className="d-block text-muted mb-0"
                            id="event-description-tag"
                          >
                            {event && event.description !== undefined
                              ? event.description
                              : "No Description"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Row className="event-form">
                      <p>Appointment Details</p>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="eventName">
                            Event Name
                          </Label>
                          <Input
                            type="text"
                            name="eventName"
                            id="eventName"
                            value={validation.values.eventName}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Enter Event Name"
                            invalid={
                              validation.touched.eventName &&
                              !!validation.errors.eventName
                            }
                          />

                          {validation.touched.eventName &&
                          validation.errors.eventName ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.eventName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">Doctor</Label>
                          <Select
                            name="doctor"
                            id="doctor"
                            options={doctorOptions}
                            isSearchable
                            onChange={(selectedOption) =>
                              handleChange("doctor", selectedOption)
                            }
                            onBlur={() =>
                              validation.setFieldTouched("doctor", true)
                            }
                            value={
                              doctorOptions.find(
                                (option) =>
                                  option.value === validation.values.doctor
                              ) || null
                            }
                            placeholder="Select Doctor"
                            classNamePrefix="react-select"
                          />
                          {validation.touched.doctor &&
                          validation.errors.doctor ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.doctor}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3 flex-grow-1">
                            <Label className="form-label">Patient Name</Label>
                            <Select
                              name="patient"
                              id="event-title"
                              options={patientOptions}
                              isSearchable
                              onChange={(selectedOption) =>
                                handleChange("patient", selectedOption)
                              }
                              onBlur={() =>
                                validation.setFieldTouched("patient", true)
                              }
                              value={
                                patientOptions.find(
                                  (option) =>
                                    option.value === validation.values.patient
                                ) || null
                              }
                              placeholder="Select Patient"
                              classNamePrefix="react-select"
                            />
                            {validation.touched.patient &&
                            validation.errors.patient ? (
                              <FormFeedback type="invalid" className="d-block">
                                {validation.errors.patient}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mt-4">
                            <span
                              style={{
                                cursor: "pointer",
                                color: "#0d6efd",
                                fontWeight: "500",
                              }}
                              onClick={() =>
                                window.open("/patient-create", "_blank")
                              }
                            >
                              + Add Patient
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">CPT Codes</Label>
                          <Select
                            name="cpt"
                            id="cpt"
                            options={cptOptions}
                            isSearchable
                            onChange={(selectedOption) =>
                              handleChange("cpt", selectedOption)
                            }
                            onBlur={() =>
                              validation.setFieldTouched("cpt", true)
                            }
                            value={
                              cptOptions.find(
                                (option) =>
                                  option.value === validation.values.cpt
                              ) || null
                            }
                            placeholder="Select CPT"
                            classNamePrefix="react-select"
                          />
                          {validation.touched.cpt && validation.errors.cpt ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.cpt}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="mb-3">
                          <Label>Appointment Date</Label>
                          <div
                            className={
                              !!isEdit ? "input-group d-none" : "input-group"
                            }
                          >
                            <Flatpickr
                              className="form-control"
                              id="event-start-date"
                              name="defaultDate"
                              placeholder="Select Date"
                              value={validation.values.defaultDate || ""}
                              options={{
                                mode: "range",
                                dateFormat: "Y-m-d",
                              }}
                              onChange={(date) => {
                                setSelectedNewDay(date);
                                validation.setFieldValue(
                                  "defaultDate",
                                  date_r(date[0]) +
                                    (date[1] ? " to " + date_r(date[1]) : "")
                                );
                              }}
                            />
                            <span className="input-group-text">
                              <i className="ri-calendar-event-line"></i>
                            </span>
                          </div>
                          {validation.touched.defaultDate &&
                          validation.errors.defaultDate ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.defaultDate}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xs={4}>
                        <div className="mb-3">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input
                            type="time"
                            name="startTime"
                            id="start-time"
                            className="form-control"
                            onChange={(e) => {
                              const value = e.target.value;
                              validation.setFieldValue("startTime", value);
                              updateTotalMinutes(
                                value,
                                validation.values.endTime
                              );
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("startTime", true)
                            }
                            value={validation.values.startTime || ""}
                          />
                          {validation.touched.startTime &&
                          validation.errors.startTime ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.startTime}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xs={4}>
                        <div className="mb-3">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input
                            type="time"
                            name="endTime"
                            id="end-time"
                            className="form-control"
                            onChange={(e) => {
                              const value = e.target.value;
                              validation.setFieldValue("endTime", value);
                              updateTotalMinutes(
                                validation.values.startTime,
                                value
                              );
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("endTime", true)
                            }
                            value={validation.values.endTime || ""}
                          />
                          {validation.touched.endTime &&
                          validation.errors.endTime ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.endTime}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xs={4}>
                        <div className="mb-3">
                          <Label>Total Minutes</Label>
                          <Input
                            type="number"
                            name="totalMinutes"
                            className="form-control"
                            value={validation.values.totalMinutes || ""}
                            readOnly
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="mb-3">
                          <Label htmlFor="event-location">Location</Label>
                          <div>
                            <Input
                              type="text"
                              className={
                                !!isEdit
                                  ? "form-control d-none"
                                  : "form-control d-block"
                              }
                              name="location"
                              id="event-location"
                              placeholder="Event location"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.location || ""}
                            />
                            {validation.touched.location &&
                            validation.errors.location ? (
                              <FormFeedback type="invalid" className="d-block">
                                {validation.errors.location}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="hstack gap-2 justify-content-end">
                      {!!isEdit && (
                        <button
                          type="button"
                          className="btn btn-soft-danger"
                          id="btn-delete-event"
                          onClick={() => setDeleteModal(true)}
                        >
                          <i className="ri-close-line align-bottom"></i> Delete
                        </button>
                      )}
                      {isEditButton && (
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="btn-save-event"
                        >
                          {!!isEdit ? "Edit Event" : "Add Appointment"}
                        </button>
                      )}
                    </div>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card className="card-h-100">
                <CardBody>
                  <FullCalendar
                    plugins={[
                      BootstrapTheme,
                      dayGridPlugin,
                      interactionPlugin,
                      listPlugin,
                    ]}
                    initialView="dayGridMonth"
                    slotDuration={"00:15:00"}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                    }}
                    events={formattedAppointments}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    drop={onDrop}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Calender.propTypes = {
  events: PropTypes.any,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
