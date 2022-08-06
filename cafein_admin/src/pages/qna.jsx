import SelectHeader from "../components/common/selectHeader";

import QnA from "../components/QnA";

const QnAs = () => {
  return (
    <>
      <SelectHeader
        menu={"qna"}
        menu1={"notice"}
        menu2={"qna"}
        Tmenu1={"공지사항"}
        Tmenu2={"자주 묻는 질문"}
      />

      <QnA />
    </>
  );
};

export default QnAs;
