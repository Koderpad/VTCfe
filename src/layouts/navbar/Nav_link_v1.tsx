function Nav_link_v1() {
  return (
    <>
      <ul className="flex gap-1">
        {/* account */}
        <li>
          {/* account container */}
          <div className="flex">
            {/* avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-ln4gdiy4aasz87_tn"
                className="w-full h-full object-cover"
              />
            </div>

            {/* username */}
            <div
              className="flex items-center text-white outline-none
            text-xl font-medium p-1
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
