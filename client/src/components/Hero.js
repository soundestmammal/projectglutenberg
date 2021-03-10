import React from 'react';
import { Row, Col } from 'antd'
import { Link } from "react-router-dom";
import order from "../image-assets/order.svg";
import "../styles/landing.css";

const Hero = () => {

    return (
        <>
            <Row>
                <Col span={8} offset={4} order={1} md={8} xs={20}>
                    <div className="hero-title">
                        Creating a healthier future
                    </div>
                    <div className="hero-subtitle">
                        We are creating a healthier future by building a platform that connects people across the gluten-free ecosystem for greater transparency and discovery.
                    </div>
                    <div style={{marginTop: '50px'}}>
                        <Link className="hero-beta" to="/app">Try it now</Link>
                    </div>
                </Col>
                <Col span={8} order={2} md={8} xs={20}>
                    <img src={order} alt="people ordering" />
                </Col>
            </Row>
        </>
    );
};

export default Hero;