import React from 'react';
import { Row, Col, Collapse } from 'antd';
const { Panel } = Collapse;

const Questions = () => {
    return (
        <div className="questions">

        <Row>
        <Col span={16} offset={4}>
            <h2 className="value-props-title">Ask us anything</h2>
            <p className="value-props-subtitle">We're here to build transparency - and that starts now.</p>
      <Collapse key='1'>
        <Panel header="What is Oasis?" key="1">
          <p>Oasis is a data-driven platform that is working to build trust and transparency in the gluten-free ecosystem.</p>
        </Panel>
        <Panel header="I already have a gluten-free app, why Oasis?" key="2">
            <p>Oasis is the third wave of gluten-free infrastructure. Prior to the COVID-19 pandemic, gluten-free restaurants were discovered by blogs, instagram and apps. However, all of these
                solutions provide static information about the safety of a restaurant. Oasis is working on a dynamic real-time solution
                to build trust and transparency across the gluten-free ecosystem.
          </p>
        </Panel>
        <Panel header="Do you have a mobile app?" key="3">
          <p>It's in the works!</p>
        </Panel>
        <Panel header="How can I help?" key="4">
          <p>We would love to hear from you and how we can better serve you. Our DM's are always open on IG! @oasisglutenfree</p>
        </Panel>
          </Collapse>
          </Col>
      </Row>
        </div>
    )
}

export default Questions;