const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/saves`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (resourceId) => {
  try {
    const res = await fetch(`${BASE_URL}/resources/${resourceId}/saves`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, create };
