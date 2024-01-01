import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoaderOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.8)", // Adjust the background color and opacity
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Ensure it's above other elements
      }}
    >
      <div className="flex flex-col">
        <h1>Đang reset OTP</h1>
        <BarLoader color="#000000" loading={true} />
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const fieldsRef = useRef();
  const [state, setState] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "", // New code
    code6: "", // New code
  });

  // Access username
  const location = useLocation();
  const username = location.state.username;

  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(296); // Set the initial timer value in seconds (3 minutes)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const inputFocus = (e) => {
    const elements = fieldsRef.current.children;
    const dataIndex = +e.target.getAttribute("data-index");

    if (e.key === "Delete" || e.key === "Backspace") {
      const next = dataIndex - 1;
      if (next > -1) {
        elements[next].focus();
      }
    } else {
      const next = dataIndex + 1;
      if (
        next < elements.length &&
        e.target.value !== " " &&
        e.target.value !== "" &&
        e.key.length === 1
      ) {
        elements[next].focus();
      }
    }
  };

  const handleChange = (e, codeNumber) => {
    const value = e.target.value;
    setState({ ...state, [codeNumber]: value.slice(value.length - 1) });
  };

  //   const handleResetPassword = async () => {
  //     try {
  //       setLoading(true); // Set loading to true before making the API call

  //       // Combine OTP codes into one string
  //       const otp = Object.values(state).join("");
  //       // Retrieve the new password
  //       const newPasswordInput = document.getElementById(
  //         "newPassword"
  //       ) as HTMLInputElement;
  //       const newPassword = newPasswordInput.value;

  //       // Make the API call with OTP and new password
  //       const response = await axios.patch(
  //         "http://localhost:8181/api/customer/reset-password",
  //         {
  //           username,
  //           otp,
  //           newPassword,
  //         }
  //       );

  //       // Handle the response, e.g., show a success message
  //       console.log(response.data);
  //     } catch (error) {
  //       // Handle errors, e.g., show an error message
  //       console.error("Error:", error.response.data.message);
  //     } finally {
  //       setLoading(false); // Set loading back to false after API call completes
  //     }
  //   };

  //   const handleResetPassword = async () => {
  //     try {
  //       setLoading(true);

  //       const otp = Object.values(state).join("");
  //       const newPasswordInput = document.getElementById(
  //         "newPassword"
  //       ) as HTMLInputElement;
  //       const newPassword = newPasswordInput.value;

  //       const response = await axios.patch(
  //         "http://localhost:8181/api/customer/reset-password",
  //         {
  //           username,
  //           otp,
  //           newPassword,
  //         }
  //       );

  //       // Handle the response, e.g., show a success message
  //       console.log(response.data);

  //       // Show a success toast
  //       await toast.success("Password reset successfully!");

  //       navigate("/login");
  //     } catch (error) {
  //       console.error("Error:", error.response.data.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      const otp = Object.values(state).join("");
      const newPasswordInput = document.getElementById(
        "newPassword"
      ) as HTMLInputElement;
      const newPassword = newPasswordInput.value;

      const response = await axios.patch(
        "http://localhost:8181/api/customer/reset-password",
        {
          username,
          otp,
          newPassword,
        }
      );

      // Handle the response, e.g., show a success message
      console.log(response.data);

      // Show a success toast and delay the redirection for 3 seconds
      toast.success("Password reset successfully!", {
        autoClose: 3000, // Set the duration in milliseconds (3 seconds)
        onClose: () => navigate("/login"), // Redirect to login page when the toast is closed
      });
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error:", error.response.data.message);

      // Show an error toast
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      // Make the API call to resend OTP
      const url = `http://localhost:8181/api/customer/forgot-password?username=${username}`;

      await axios
        .get(url)
        .then((res) => {
          console.log(res.data);

          // Show a success toast
          toast.success("OTP sent successfully!");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
        .finally(() => {});
      // Reset the timer
      setTimer(296);
      // Disable the resend button for a certain period
      setResendDisabled(true);
      setTimeout(() => {
        setResendDisabled(false);
      }, 600); // Re-enable after 1 minute
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error:", error.response.data.message);
    } finally {
      setLoading(false); // Set loading back to false after API call completes
    }
  };

  // Countdown timer effect
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdown);
  }, []);

  // Print state
  console.log(state);
  console.log(username);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ToastContainer />
      <div className="flex flex-col items-center">
        <label className="text-gray-600">Mã xác nhận</label>
        <div ref={fieldsRef} className="mt-2 flex items-center gap-x-2">
          {/* Repeat the input fields for the desired number of OTP digits */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              type="text"
              data-index={index - 1} // Adjust data-index to start from 0
              placeholder="0"
              value={state[`code${index}`]}
              className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, `code${index}`)}
              onKeyUp={inputFocus}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div>
            <label className="text-gray-600">Mật khẩu mới</label>
            <div className="relative max-w-xs mt-2">
              <button
                className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600 focus:outline-none"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
              <input
                id="newPassword"
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Nhập mật khẩu..."
                className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleResetPassword}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Làm mới mật khẩu
        </button>
        <div className="flex items-center mt-2 space-x-2">
          <p className="text-gray-600">
            {loading ? "Sending OTP..." : `Resend OTP in ${timer} seconds`}
          </p>
          <button
            onClick={handleResendOTP}
            disabled={resendDisabled || loading}
            className={`text-blue-600 hover:underline focus:outline-none`}
          >
            Gửi lại OTP
          </button>
        </div>
        {loading && <LoaderOverlay />}
      </div>
    </div>
  );
};
