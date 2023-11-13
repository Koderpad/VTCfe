// import styled from "styled-components";

// import { useMoveBack } from "../hooks/useMoveBack";
// import Heading from "../ui/Heading";

// const StyledPageNotFound = styled.main`
//   height: 100vh;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 4.8rem;
// `;

// const Box = styled.div`
//   /* box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);

//   padding: 4.8rem;
//   flex: 0 1 96rem;
//   text-align: center;

//   & h1 {
//     margin-bottom: 3.2rem;
//   }
// `;

// function PageNotFound() {
//   const moveBack = useMoveBack();

//   return (
//     <StyledPageNotFound>
//       <Box>
//         <Heading as="h1">
//           The page you are looking for could not be found 😢
//         </Heading>
//         <button onClick={moveBack} size="large">
//           &larr; Go back
//         </button>
//       </Box>
//     </StyledPageNotFound>
//   );
// }

// export default PageNotFound;

export default function Example() {
  return (
    <main className="tw-grid tw-min-h-full tw-place-items-center tw-bg-white tw-px-6 tw-py-24 sm:tw-py-32 lg:tw-px-8">
      <div className="tw-text-center">
        <p className="tw-text-base tw-font-semibold tw-text-indigo-600">404</p>
        <h1 className="tw-mt-4 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-5xl">
          Page not found
        </h1>
        <p className="tw-mt-6 tw-text-base tw-leading-7 tw-text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="tw-mt-10 tw-flex tw-items-center tw-justify-center tw-gap-x-6">
          <a
            href="#"
            className="tw-rounded-md tw-bg-indigo-600 tw-px-3.5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Go back home
          </a>
          <a href="#" className="tw-text-sm tw-font-semibold tw-text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
