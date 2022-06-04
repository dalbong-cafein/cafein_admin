import Header from "../components/common/header";
import styled from "styled-components";

import { ReactComponent as Cup } from "../svg/Cup.svg";
import { ReactComponent as User } from "../svg/user.svg";
import { ReactComponent as Review } from "../svg/review.svg";
import { ReactComponent as Mail } from "../svg/mail.svg";
import NoneDiv from "../components/common/Nonediv";
import { useEffect, useState } from "react";
import { memoListApi } from "../util/memo";
import DeshMemo from "../components/deshMemobox";
import MemoModal from "../components/common/modal/memo";
import { marketingDListApi, marketingListApi } from "../util/events";
import DeshMarketing from "../components/deshMarketing";
import { useNavigate } from "react-router-dom";

const Desh = () => {
  const navigate = useNavigate();
  const [memoArr, setMemoArr] = useState([]);
  const [memoId, setMemoId] = useState(null);
  const [memoModal, setMemoModal] = useState(false);
  const [selectMItem, setselectMItem] = useState([]);

  const [marketingArr, setMarketingArr] = useState([]);

  const memoClick = (item) => {
    setMemoId(item.memoId);
    setselectMItem(item);
    setMemoModal(!memoModal);
  };
  useEffect(() => {
    memoListApi().then((res) => setMemoArr(res.data.data));
    marketingDListApi()
      .then((res) => {
        setMarketingArr(res.data.data.couponResDtoList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header
        mSize={22}
        text={"안녕하세요! 오늘도 일하는 당신, 참 멋져요"}
        mcolor={"#fff"}
      />
      <Container>
        <RowBox>
          <Box colorS={"#FC6406"}>
            <div>
              <p>오늘 등록된 카페</p>
              <Cup />
            </div>
            <p>0곳</p>
          </Box>
          <Box colorS={"#2563eb"}>
            <div>
              <p>오늘 등록된 회원</p>
              <User />
            </div>
            <p>0명</p>
          </Box>
          <Box colorS={"#26ba6a"}>
            <div>
              <p>오늘 등록된 리뷰</p>
              <Review />
            </div>
            <p>0개</p>
          </Box>
          <Box>
            <div>
              <p>메일함</p>
              <Mail />
            </div>
            <p>0개</p>
          </Box>
        </RowBox>
        <Box2>
          <Box3>
            <LongBox2 height={40}>
              <p>통계</p>
              <div>
                <NoneDiv text={"통계"} loc={"statistics"} />
              </div>
            </LongBox2>
            <LongBox2 height={60}>
              <p>마케팅 서비스</p>

              <div>
                <Table>
                  <THead>
                    <div>회원번호</div>
                    <div>상품명</div>
                    <div>신청 날짜</div>
                    <div>처리 날짜</div>
                    <div>상태</div>
                  </THead>

                  {marketingArr && marketingArr.length === 0 ? (
                    <NoneDiv
                      padding={80}
                      text={"마케팅 서비스"}
                      loc={"marketing"}
                    />
                  ) : (
                    <ColumnBox onClick={() => navigate("/marketing")}>
                      {marketingArr &&
                        marketingArr.map((item, i) => (
                          <DeshMarketing item={item} />
                        ))}
                    </ColumnBox>
                  )}
                </Table>
              </div>
            </LongBox2>
          </Box3>
          <LongBox>
            <p>메모</p>
            {memoArr.length === 0 ? (
              <NoneDiv padding={284} text={"메모"} />
            ) : (
              <>
                {memoArr.map((item, i) => (
                  <DeshMemo
                    key={i}
                    item={item}
                    memoClick={memoClick}
                    setselectMItem={setselectMItem}
                  />
                ))}
              </>
            )}
          </LongBox>
        </Box2>
      </Container>
      {memoModal && (
        <MemoModal
          memoId={memoId}
          setModal={setMemoModal}
          selectItem={selectMItem}
        />
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RowBox = styled.div`
  width: 100%;
  height: 140px;
  background-color: #222222;
  border-radius: 16px;
  display: flex;
  & > div:not(:first-child) {
    border-left: 1px solid #515151;
  }
`;

const Box = styled.div`
  flex: 1;
  margin: 32px 0;
  padding: 0 56px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  & > div {
    display: flex;
    gap: 9.5px;
    & > p {
      color: #8b8b8b;
    }
    & > svg {
      width: 15px;
      height: 15px;
      path {
        fill: ${(props) => props.colorS && props.colorS};
      }
    }
  }
  & > p:last-child {
    color: #fff;
    font-size: 22px;
    font-weight: bold;
  }
`;

const Box2 = styled.div`
  width: 100%;
  display: flex;
  height: 60%;
  gap: 24px;
`;
const Box3 = styled.div`
  flex: 3;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  width: 75%;
`;

const LongBox = styled.div`
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  width: 25%;
  background-color: #222222;
  border-radius: 16px;
  padding: 24px;
  & > p:first-child {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  // overflow-y: scroll;
  // ::-webkit-scrollbar {
  //   width: 6px;
  // }
  // ::-webkit-scrollbar-track {
  //   background-color: none;
  // }
  // ::-webkit-scrollbar-thumb {
  //   border-radius: 3px;
  //   background-color: gray;
  // }
  // ::-webkit-scrollbar-button {
  //   width: 0;
  //   height: 0;
  // }
`;

const LongBox2 = styled.div`
  background-color: #222222;
  border-radius: 16px;
  height: ${(props) => props.height && props.height}%;
  padding: 24px;
  box-sizing: border-box;

  & > p:first-child {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  & > div {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-itema: center;
  }
`;

const Table = styled.div`
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
  & > div {
    flex: 1;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
`;

const THead = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 0;
  background-color: #333333;
  border-radius: 20px;
  margin: 10px 0;
  box-sizing: border-box;
  font-size: 14px;

  & > div {
    flex: 1;
    text-align: center;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export default Desh;
