import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Retrieve the username from the input field
      const usernameInput = document.getElementById(
        "username"
      ) as HTMLInputElement;
      const username = usernameInput.value;
      // const username = e.target.value;
      //   username = "nqt9999";
      // Simulate a delay of 5 seconds (5000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const url = `http://localhost:8181/api/customer/forgot-password?username=${username}`;

      axios
        .get(url)
        .then((res) => {
          console.log(res.data);

          // Navigate to the reset password page
          navigate("/reset-password", { state: { username: username } });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
        .finally(() => {
          setLoading(false); // Set loading to false regardless of success or error
        });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <body className=" bg-gray-100 flex h-full items-center py-16">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="../examples/html/signin.html"
                >
                  Sign in here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="email-error"
                      />
                      <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid username so we can get back to you
                    </p>
                  </div>

                  <button
                    type="submit"
                    onClick={handleForgotPassword}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    {loading ? (
                      <SyncLoader color="#ffffff" loading={loading} size={8} />
                    ) : (
                      "Reset password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};
