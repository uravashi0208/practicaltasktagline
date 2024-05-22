import React, { useState } from "react";
import "./home.css";
import { Data } from "../data";
import { Row, Col, Container, Form } from "react-bootstrap";

const HomePage = () => {
  const keys = Object.keys(Data[2]);
  const filteredKeys = keys.slice(2);
  const filteredSerachKeys = keys.slice(1, 2);
  const [selectedValues, setSelectedValues] = useState({});
  const [filterValue, setFilterValue] = useState("");

  const getAllKeys = () => {
    let keys = [];
    Data.forEach((item) => {
      keys = [...keys, ...Object.keys(item)];
    });
    return Array.from(new Set(keys));
  };

  const renderTableHeaders = () => {
    const headers = getAllKeys();
    return headers.map((header, index) => <th key={index}>{header}</th>);
  };

  const renderTableRows = () => {
    return Data.filter((item) => {
      for (let key in selectedValues) {
        if (
          selectedValues[key].length > 0 &&
          !selectedValues[key].includes(item[key])
        ) {
          return false;
        }
      }
      if (
        filterValue &&
        !item[filteredSerachKeys[0]]
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).map((item) => (
      <tr key={item.id}>
        {getAllKeys().map((key, index) => (
          <td key={index}>{item[key]}</td>
        ))}
      </tr>
    ));
  };

  const getUniqueValues = (key) => {
    let uniqueValues = new Set();

    Data.forEach((item) => {
      if (item[key]) {
        uniqueValues.add(item[key]);
      }
    });

    return Array.from(uniqueValues);
  };

  const handleToggleChange = (key, value) => {
    setSelectedValues((prevState) => {
      const prevValues = Array.isArray(prevState[key])
        ? [...prevState[key]]
        : [];

      if (prevValues.includes(value)) {
        return {
          ...prevState,
          [key]: prevValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prevState,
          [key]: [...prevValues, value],
        };
      }
    });
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          {filteredKeys.map((key, index) => (
            <Col lg={3}>
              <Row>
                <Col sm={5}>
                  <h4>{key}</h4>
                </Col>
                <Col sm={7}>
                  <Col lg={12}>
                    <Row>
                      {getUniqueValues(key).map((value, index) => (
                        <div key={index} className="toggle-switch-container">
                          <Col sm={7}>{value}</Col>
                          <Col sm={5}>
                            <Form.Check
                              type="switch"
                              id={`${key}-${value}`}
                              label=""
                              checked={
                                selectedValues[key] &&
                                selectedValues[key].includes(value)
                              }
                              onChange={() => handleToggleChange(key, value)}
                            />
                          </Col>
                        </div>
                      ))}
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
        <Col lg={5}>
          <Row>
            <Col sm={7}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={filterValue}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Container>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </>
  );
};
export default HomePage;
