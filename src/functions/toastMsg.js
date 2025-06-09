import toast from "react-hot-toast";

const toastMsg = (msg, type = "error", time = 3000, hideProgressBar = true) => {
  switch (type) {
    case "error":
      toast.error(msg || "Something went wrong!", {
        hideProgressBar: hideProgressBar,
        autoClose: time
      });
      break;
    case "success":
      toast.success(msg, { hideProgressBar: hideProgressBar, autoClose: time });
      break;
    case "info":
      toast.info(msg, { hideProgressBar: hideProgressBar, autoClose: time });
      break;
    default:
      toast.error(msg || "Something went wrong!", {
        hideProgressBar: hideProgressBar,
        autoClose: time
      });
      break;
  }
  if (msg?.toLowerCase()?.includes("session expired"))
    setTimeout(() => {
      sessionStorage.clear();
      window.location.href = "/login";
    }, 3000);
};

export default toastMsg;
