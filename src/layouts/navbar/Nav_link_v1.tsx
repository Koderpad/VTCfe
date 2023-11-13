function Nav_link_v1() {
  return (
    <>
      <ul className="tw-flex tw-gap-1">
        {/* account */}
        <li>
          {/* account container */}
          <div className="tw-flex">
            {/* avatar */}
            <div className="tw-w-10 tw-h-10 tw-rounded-full tw-overflow-hidden">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-ln4gdiy4aasz87_tn"
                className="tw-w-full tw-h-full tw-object-cover"
              />
            </div>

            {/* username */}
            <div
              className="tw-flex tw-items-center tw-text-white tw-outline-none
            tw-text-xl tw-font-medium tw-p-1
            "
            >
              nguyenquoctrung999
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Nav_link_v1;
