import styled, { css } from "styled-components";
// import CartForm from "../features/auth/components/Cart/auth/components/CartForm.tsx";
import CartForm from "../features/auth/components/Cart/auth/components/CartForm.tsx";
import TransparentOverlay from "../features/auth/components/Cart/auth/components/VoucherForm.tsx";


function Cart() {
  return (
      <div >
        <CartForm/>
      </div>
  );
}

export default Cart;
const CartPageContainer = styled.div`
  display: flex;
  height: auto;
  background: #caf7fa;
`;