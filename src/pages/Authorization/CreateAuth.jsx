import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
const CreateAuth = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Authorization" pageTitle="Ecommerce" />
        <Card>
          <CardBody>Create authorization</CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateAuth;
