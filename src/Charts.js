import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Charts = (props) => {
  return (
    <>
      <Container>
        <Row lg={3} md={2} sm={1} xs={1}>
          {Array.isArray(props.weather)
            ? props.weather.map((item, index) => (
                <Col
                  key={item.id}
                  style={{
                    position: "relative",
                    padding: "1rem",
                    border: "1px solid #eee",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                  }}
                >
                  <Card.Title style={{ color: "#a5a58d" }}>
                    {item.applicable_date}
                  </Card.Title>
                  <PieChart weather={item} />
                  <BarChart
                    weather={item}
                    padding={20}
                    gridScale={5}
                    gridColor={"#999999"}
                    colors={["#cb997e", "#eddcd2"]}
                  />
                  <legend>
                    <ul>
                      <li
                        style={{
                          color: "#a5a58d",
                          listStyle: "none",
                          borderLeft: " 20px solid #b7b7a4",
                          padding: "5px",
                          margin:'1rem',
                          fontSize:'small'
                        }}
                      >
                        Humidity : {item.humidity} %
                      </li>
                      <li
                        style={{
                          color: "#a5a58d",
                          listStyle: "none",
                          borderLeft: " 20px solid #cb997e",
                          padding: "5px",
                          margin:'1rem',
                          fontSize:'small'
                        }}
                      >
                        Max Temprature : {Math.round(item.max_temp)} °C
                      </li>
                      <li
                        style={{
                          color: "#a5a58d",
                          listStyle: "none",
                          borderLeft: "20px solid #eddcd2",
                          padding: "5px",
                          margin:'1rem',
                          fontSize:'small'
                        }}
                      >
                        Min Temprature : {Math.round(item.min_temp)} °C
                      </li>
                    </ul>
                  </legend>
                </Col>
              ))
            : ""}
        </Row>
      </Container>
    </>
  );
};

export default Charts;
