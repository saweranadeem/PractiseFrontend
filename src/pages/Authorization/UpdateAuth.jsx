import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const UpdateAuth = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Update Auth" pageTitle="Ecommerce" />
        <Card>
          <CardBody>hi authorization</CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default UpdateAuth;
