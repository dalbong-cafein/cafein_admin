import React from "react";
import Portal from "./Portal";
import * as S from "./style";
import Row from "../../atoms/row";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../../../svg/Search.svg";

const { kakao } = window;

export default function SearchModal({
  setModal,
  search,
  setSearch,
  setLoc,
  setRegister,
  register,
}) {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(search, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [search]);

  const onLoc = (item) => {
    setLoc(item);
    console.log(item);
    const copy = { ...register };
    const sp = item.road_address_name.split(" ");
    copy.siNm = sp[0] || "";
    copy.sggNm = sp[1] || "";
    copy.rNm = sp[2] || "";
    copy.rNum = sp[3] || "";
    copy.detail = sp[4] || "";
    copy.lngX = Number(item.x);
    copy.latY = Number(item.y);
    copy.storeName = item.place_name;
    copy.phone = item.phone;
    setRegister(copy);
    setSearch(item.place_name);
    setModal(false);
  };

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>카페 검색</p>
          <Close onClick={() => setModal(false)} />
        </S.ModalHeader>
        <Row style={{ borderBottom: "1px solid #fff" }}>
          <Input
            placeholder="검색"
            type="text"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search onClick={onclick} />
        </Row>

        <div>
          <div
            id="myMap"
            style={{
              width: "600px",
              height: "200px",
              margin: "24px auto 12px",
            }}
          ></div>
          <ScrollBox id="result-list" style={{ color: "#fff" }}>
            {Places.filter((item) => item.road_address_name).map((item, i) => (
              <Box key={i} onClick={() => onLoc(item)}>
                <p>{item.place_name}</p>
                <p>{item.road_address_name}</p>
              </Box>
            ))}
          </ScrollBox>

          <div id="pagination" style={{ display: "none" }}></div>
        </div>
      </S.ModalBox>
    </Portal>
  );
}

const Input = styled.input`
  border: 0;
  background-color: #131313;
  color: #fff;
  width: 595px;
  height: 32px;
  &:focus {
    outline: none;
  }
`;

const Box = styled.div`
  padding: 16px 14px;
  border-bottom: 1px solid #333333;
  cursor: pointer;
  & > p:first-child {
    font-size: 16px;
    color: #e3e3e3;
    padding-bottom: 8px;
  }
  & > p:nth-child(2) {
    font-size: 14px;
    color: #acacac;
  }
`;

const ScrollBox = styled.div`
  max-height: 280px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
