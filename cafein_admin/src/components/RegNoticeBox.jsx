import * as SS from "./noticesStyle";

import Row from "./atoms/row";
import FileUpload from "./common/FileUproad";
export default function RegNoticeBox({
  register,
  setRegister,
  setPreview,
  setAlert,
  title = "새 공지 등록",
}) {
  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
  };
  return (
    <SS.NewNotice>
      <p>{title}</p>

      <div>
        <SS.Input>
          <div>
            <p>제목</p>
            <span style={{ fontSize: "12px" }}>
              <span style={{ color: "#2563EB" }}>{register.title.length}자</span>/최대 47자
            </span>
          </div>
          <input
            type="text"
            name="title"
            onChange={(e) => onChange(e)}
            placeholder="제목을 입력해주세요 (최대 47자)"
          />
        </SS.Input>
        <SS.TextBox>
          <div>
            <p>내용</p>
            <textarea
              cols="50"
              rows="20"
              placeholder="내용을 적어 주세요"
              name="content"
              onChange={(e) => onChange(e)}
            />
          </div>

          <FileUpload register={register} setRegister={setRegister} num={1} />
        </SS.TextBox>
      </div>
      <Row gap={16} justify="end" align="baseline">
        <SS.Btn back="#515151" onClick={() => setPreview((previus) => !previus)}>
          미리보기
        </SS.Btn>
        <SS.Btn back="#2563eb" onClick={() => setAlert((previus) => !previus)}>
          등록
        </SS.Btn>
      </Row>
    </SS.NewNotice>
  );
}
