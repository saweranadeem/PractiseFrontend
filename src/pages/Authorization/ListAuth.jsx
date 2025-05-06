import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ListAuth = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="List Authorization" pageTitle="Ecommerce" />
        <Card>
          <CardBody>hi authorization</CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ListAuth;
