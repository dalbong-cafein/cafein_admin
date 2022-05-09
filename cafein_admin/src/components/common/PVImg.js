const style = {
  objectFit: "fill",
  width: "100%",
  height: "100%",
  borderRadius: "6px",
};

export default function PVImg({ img }) {
  var imgUrl;

  if (typeof img === "string") {
    imgUrl = img;
  } else if (!img) {
    return null;
  } else {
    imgUrl = URL.createObjectURL(img);
  }
  return <img src={imgUrl} style={style} alt="" />;
}
