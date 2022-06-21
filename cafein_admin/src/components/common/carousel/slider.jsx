import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          {this.props.imgs &&
            this.props.imgs.map((item, i) => (
              <Box key={i}>
                <img src={item} alt="" />
              </Box>
            ))}
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {this.props.imgs &&
            this.props.imgs.map((item, i) => (
              <SBox key={i} style={{ margin: "0 5px" }}>
                <img src={item} alt="" />
              </SBox>
            ))}
        </Slider>
      </div>
    );
  }
}

const Box = styled.div`
  width: 420px;
  height: 420px;
  padding: 10px 0;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
`;
const SBox = styled.div`
  width: 96px !important;
  height: 96px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
`;
