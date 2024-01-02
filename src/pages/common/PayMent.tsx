// PayMent.tsx
import PayMentForm from "../../features/common/payment/components/PayMentForm.tsx";
import styled from "styled-components";

function PayMent() {
    return (
        <PayMentPageContainer>
            <PayMentForm/>
        </PayMentPageContainer>
    );
}

const PayMentPageContainer = styled.div`
  height: 1000px;
  background: #ffff;
`;

export default PayMent;
