// PayMent.tsx
import React from "react";
import PayMentForm from "../features/auth/components/PayMentForm";
import styled from "styled-components";
import Vouchers from "../features/auth/components/vouchers";

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



