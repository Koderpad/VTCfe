import Register_rightSide from "./Register_rightSide";
import Logo_fix from "../components/ui-styled/Logo-fix";

function Register() {
  return (
    <div className="tw-flex tw-flex-row tw-bg-[#caf7fa] tw-h-auto">
      {/* create 2 components left, right by tailwind*/}
      <div className="tw-w-1/2 tw-shadow-2xl tw-bg-[url('/public/BiaPhai_Login.png')] tw-flex tw-justify-center tw-items-center">
        <Logo_fix />
      </div>
      <div className="tw-w-1/2">
        <Register_rightSide />
      </div>
    </div>
  );
}

export default Register;
