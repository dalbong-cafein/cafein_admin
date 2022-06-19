import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    console.log(this.props.imgs);
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
          slidesToShow={6}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {this.props.imgs &&
            this.props.imgs.map((item, i) => (
              <SBox key={i}>
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
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;
const SBox = styled(Box)`
  width: 96px;
  height: 96px;
`;
