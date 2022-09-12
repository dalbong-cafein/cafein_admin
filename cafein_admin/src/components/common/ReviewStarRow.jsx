import Row from "../atoms/row";
import Stars from "../atoms/stars";

export default function ReviewStarRow({
  width,
  item1Title,
  item2Title,
  item1Star,
  item2Star,
}) {
  return (
    <>
      <Row gap={8} align="baseline" style={{ width: width }}>
        {item1Title}
        <Stars width={11} gap={2} num={item1Star} color="#FD9759" />
      </Row>
      <Row gap={8} align="baseline">
        {item2Title}
        <Stars width={11} gap={2} num={item2Star} color="#FD9759" />
      </Row>
    </>
  );
}
