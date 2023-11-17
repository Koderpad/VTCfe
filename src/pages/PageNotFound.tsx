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
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
