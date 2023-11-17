import Register_rightSide from "./Register_rightSide";
import Logo_fix from "../components/ui-styled/Logo-fix";

function Register() {
  return (
    <div className="flex flex-row bg-[#caf7fa] h-auto">
      <div className="w-1/2 shadow-2xl bg-[url('/public/BiaPhai_Login.png')] flex justify-center items-center">
        <Logo_fix />
      </div>
      <div className="w-1/2">
        <Register_rightSide />
      </div>
    </div>
  );
}

export default Register;
