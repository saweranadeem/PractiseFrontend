import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, FormGroup, Input, Form, Button } from "reactstrap";
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { addNewSetting as onAddNewSettings } from "../../slices/thunks";
import axios from "axios"; // Import axios for API calls

const Settings = () => {
  const [acceptedInsuranceTags, setAcceptedInsuranceTags] = useState([]);
  const [acceptedInsuranceValue, setAcceptedInsuranceInputValue] = useState('');
  const dispatch = useDispatch();

  // Fetch settings from API on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/setting"); // Update API endpoint as needed
        if (response.success) {
          setAcceptedInsuranceTags(response.settings.acceptedInsurances);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSettings = {
      acceptedInsurances: acceptedInsuranceTags,
    };
    dispatch(onAddNewSettings(newSettings));
  };

  const handleAcceptedInsuranceKeyPress = (e) => {
    if (e.key === 'Enter' && acceptedInsuranceValue.trim() !== '') {
      e.preventDefault();
      if (!acceptedInsuranceTags.includes(acceptedInsuranceValue.trim())) {
        setAcceptedInsuranceTags([...acceptedInsuranceTags, acceptedInsuranceValue.trim()]);
      }
      setAcceptedInsuranceInputValue('');
    }
  };

  const handleAcceptedInsuranceInputChange = (e) => {
    setAcceptedInsuranceInputValue(e.target.value);
  };

  const handleAcceptedInsuranceTagRemove = (index) => {
    setAcceptedInsuranceTags(acceptedInsuranceTags.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Accepted Insurances</h5>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {acceptedInsuranceTags.map((tag, index) => (
                  <div
                    key={index}
                    className="badge bg-primary text-white d-flex align-items-center"
                    style={{ padding: '0.5rem 1rem', borderRadius: '20px' }}
                  >
                    {tag}
                    <FaTimes
                      style={{ marginLeft: '8px', cursor: 'pointer' }}
                      onClick={() => handleAcceptedInsuranceTagRemove(index)}
                    />
                  </div>
                ))}
              </div>
              <Input
                className="form-control"
                placeholder="Enter accepted insurance"
                type="text"
                value={acceptedInsuranceValue}
                onChange={handleAcceptedInsuranceInputChange}
                onKeyPress={handleAcceptedInsuranceKeyPress}
              />
            </FormGroup>
          </CardBody>
        </Card>

        <div className="text-end mb-3 mx-3">
          <Button type="submit" color="success" className="w-sm">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
