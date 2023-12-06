// PayMent.tsx
import React from "react";
import PayMentForm from "../features/auth/components/PayMentForm";
import styled from "styled-components";

function PayMent() {
  return (
    <PayMentPageContainer>
        <div>
            <PayMentForm />
        </div>

    </PayMentPageContainer>
  );
}

const PayMentPageContainer = styled.div`
  height: 1000px;
  background : #EEEEEE;
  position: relative;   
`;

export default PayMent;
