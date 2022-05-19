import axios from "axios";

const feedCreateApi = async (register) => {
  const formData = new FormData();
  formData.append(
    "register",
    new Blob([JSON.stringify(register)], { type: "application/json" })
  );
  return axios({
    method: "POST",
    url: "localhost:5000/admin/stores",
    data: formData,
    headers: {
      Authorization: `Bearer ${axios.defaults.headers.common["Authorization"]}`,
      "Content-Type": `multipart/form-data`,
    },
  });
};

export default feedCreateApi;
