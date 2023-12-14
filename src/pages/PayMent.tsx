// PayMent.tsx
<<<<<<< HEAD
import React from "react";

import styled from "styled-components";
import PayMentForm from "../features/common/payment/components/PayMentForm";
=======
import PayMentForm from "../features/common/payment/components/PayMentForm";
import styled from "styled-components";
>>>>>>> 08b400b55e33385eb39654a29715ea063247804b

function PayMent() {
  return (
    <PayMentPageContainer>
      <PayMentForm />
    </PayMentPageContainer>
  );
}

const PayMentPageContainer = styled.div`
  height: 1000px;
  background: #ffff;
`;

export default PayMent;
