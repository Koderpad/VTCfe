function Breadcrumb() {
  return (
    <>
      <nav className="tw-flex tw-h-[24px]" aria-label="Breadcrumb">
        <ol className="tw-inline-flex tw-items-center tw-space-x-1 md:tw-space-x-3">
          <li className="tw-inline-flex tw-items-center">
            <a
              href="#"
              className="tw-inline-flex tw-items-center tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-text-blue-600 dark:tw-text-gray-400 dark:hover:tw-text-white"
            >
              <svg
                className="tw-w-3 tw-h-3 tw-mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="tw-flex tw-items-center">
              <svg
                className="tw-w-3 tw-h-3 tw-text-gray-400 tw-mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="tw-ml-1 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-text-blue-600 md:tw-ml-2 dark:tw-text-gray-400 dark:hover:tw-text-white"
              >
                Projects
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="tw-flex tw-items-center">
              <svg
                className="tw-w-3 tw-h-3 tw-text-gray-400 tw-mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="tw-ml-1 tw-text-sm tw-font-medium tw-text-gray-500 md:tw-ml-2 dark:tw-text-gray-400">
                Flowbite
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumb;
