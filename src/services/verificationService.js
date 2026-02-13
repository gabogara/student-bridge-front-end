const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/resources`;

const create = async (resourceId, verificationFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${resourceId}/verifications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteVerification = async (resourceId, verificationId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${resourceId}/verifications/${verificationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { create, deleteVerification };
