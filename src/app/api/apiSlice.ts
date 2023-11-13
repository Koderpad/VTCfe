import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store"; // Import the type of your store's state
import { BASE_URL_VTC } from "../../constants/urls.js";
import { logOut, setCredentials } from "../../features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_VTC,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log("token trong prepareHeaders: ", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTest = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  console.log("let result = await baseQuery(args, api, extraOptions)");
  let result = await baseQuery(args, api, extraOptions);
  console.log("result= await baseQuery(args, api, extraOptions):  " + result);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    // const refreshResult = await baseQuery("/auth/refresh-token", api, {
    //   credentials: "include",
    //   method: "POST",
    // });
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );
    console.log("refreshResult: ", refreshResult);
    if (refreshResult?.data) {
      console.log("refreshResult.data: ", refreshResult.data);

      // Get the current user from the state
      const customerDTO = (api.getState() as RootState).auth.user;

      const access_token = refreshResult.data
        ? (refreshResult.data as { [key: string]: string })["accessToken"]
        : null;

      console.log("accessToken", access_token);
      console.log("cus: ", customerDTO);

      // Dispatch an action to update the state with the new data
      api.dispatch(setCredentials({ access_token, customerDTO }));

      // Dispatch an action to update the state with the new data
      // api.dispatch(setCredentials({refreshResult.data.accessToken, user }));

      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
      console.log("updated result: ", result);

      // const user = api.getState().auth.user
      // // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // // retry the original query with new access token
      // result = await baseQuery(args, api, extraOptions)
    } else {
      console.log("logOut()");
      api.dispatch(logOut());
      // //chueyern trang login
      // navigate("/login");

      // //xoa state
      // persistor.purge();
    }
  } else console.log("result khong dat 403!!!!");

  return result;
};

// const baseQueryWithReAuth = async (args, api, extraOptions) => {
//   console.log("let result = await baseQuery(args, api, extraOptions)");
//   let result = await baseQuery(args, api, extraOptions);
//   console.log("result: ", result);

//   if (result?.error?.status === 403) {
//     console.log("sending refresh token");
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery(
//       "/auth/refresh-token",
//       api,
//       extraOptions
//     );
//     console.log("refreshResult: ", refreshResult);
//     if (refreshResult?.data) {
//       console.log("refreshResult.data: ", refreshResult.data);

//       const user = api.getState().auth.user;
//       // store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       console.log("logOut()");
//       api.dispatch(logOut());
//     }
//   } else console.log("result khong dat 403!!!!");

//   return result;
// };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithTest,
  endpoints: () => ({}),
});
