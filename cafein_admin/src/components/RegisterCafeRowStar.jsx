import styled from "styled-components";
import { ReactComponent as Star } from "../svg/Star.svg";

export default function RegisterCafeRowStar({ content, register, setRegister }) {
  const starChange = (e) => {
    const star = e.currentTarget.id;
    const name = e.currentTarget.parentNode.id;
    const copy = { ...register };
    copy[name] = Number(star);
    setRegister(copy);
  };
  const text = {
    socket: [
      "바닥을 기어봐도 없어요",
      "적은 편이에요",
      "보통이에요",
      "여유 있어요",
      "모든 자리에 있어요",
    ],
    wifi: [
      "없어요 그냥 없어요",
      "자주 끊겨서 화나요",
      "그냥 저냥 쓸 만해요",
      "끊김없고 좋아요",
      "빵빵 잘 터져요",
    ],
    restroom: [
      "없어요 그냥 없어요",
      "이용하기가 꺼려져요",
      "그냥 저냥 쓸 만해요",
      "깨끗하고 좋아요",
      "화장실 맛집이에요",
    ],
    tableSize: [
      "테이블이 카공을 허락하지 않아요",
      "오래 쓰기엔 아쉬워요",
      "그냥 저냥 쓸 만해요",
      "넉넉하고 좋아요",
      "매우 편하게 사용 가능해요",
    ],
  };
  const title =
    content == "socket"
      ? "콘센트"
      : content == "wifi"
      ? "와이파이"
      : content == "restromm"
      ? "화장실"
      : "테이블";

  return (
    <div>
      <p>{title}</p>
      <StarBox id={content} isFill={register[content]}>
        <Star id={1} onClick={(e) => starChange(e)} />
        <Star id={2} onClick={(e) => starChange(e)} />
        <Star id={3} onClick={(e) => starChange(e)} />
        <Star id={4} onClick={(e) => starChange(e)} />
        <Star id={5} onClick={(e) => starChange(e)} />
      </StarBox>
      {register.socket && <p>{text[content][register[content] - 1]}</p>}
    </div>
  );
}

const StarBox = styled.div`
  & > svg:first-child {
    path {
      fill: ${(props) => props.isFill >= 1 && "#ffce4a"};
    }
  }
  & > svg:nth-child(2) {
    path {
      fill: ${(props) => props.isFill >= 2 && "#ffce4a"};
    }
  }
  & > svg:nth-child(3) {
    path {
      fill: ${(props) => props.isFill >= 3 && "#ffce4a"};
    }
  }
  & > svg:nth-child(4) {
    path {
      fill: ${(props) => props.isFill >= 4 && "#ffce4a"};
    }
  }
  & > svg:nth-child(5) {
    path {
      fill: ${(props) => props.isFill >= 5 && "#ffce4a"};
    }
  }
`;
