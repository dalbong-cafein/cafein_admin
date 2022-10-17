import styled from "styled-components";

import NoneDiv from "../components/common/Nonediv";
import Header from "../components/common/Header";
import TodayNewData from "../components/DeshTodayNewData";
import MarketingTable from "../components/DeshMarketingTable";
import DateColumn from "../components/DeshHeaderDateColumn";
import MemoTable from "../components/DeshMemoTable";

const Desh = () => {
  return (
    <>
      <Header mSize={22} text="안녕하세요! 오늘도 일하는 당신, 참 멋져요" mcolor="#fff" btn={false}>
        <DateColumn />
      </Header>
      <Container>
        <TodayNewData />
        <RowBox>
          <ColumnBox>
            <StaticBox>
              <p>통계</p>
              <div>
                <NoneDiv text="통계" loc="statistics" />
              </div>
            </StaticBox>
            <MarketingTable />
          </ColumnBox>
          <MemoTable />
        </RowBox>
      </Container>
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
  height: 65%;
  display: flex;
  gap: 24px;
`;
const ColumnBox = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StaticBox = styled.div`
  flex: 1;
  background-color: #222222;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;

  & > p:first-child {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  & > div {
    height: 150px;
  }
`;

export default Desh;
