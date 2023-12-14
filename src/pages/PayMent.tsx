// PayMent.tsx
import React from "react";

import styled from "styled-components";
import PayMentForm from "../features/common/payment/components/PayMentForm";

function PayMent() {
  return (
    <PayMentPageContainer>
            <PayMentForm />
    </PayMentPageContainer>
           
  );
}

const PayMentPageContainer = styled.div`
  height: 1000px;
  background : #ffff;
     
`;

export default PayMent;



