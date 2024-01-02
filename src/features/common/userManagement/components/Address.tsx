import AddressForm from "../../address/components/AddressForm";
import styled, { css } from "styled-components";
function address() {
  return (
    <div className="h-full">
      <div className="h-full w-full p-10 bg-white overflow-y-auto">
        <AddressPageContainer>
          <div>
            <AddressForm />
          </div>
        </AddressPageContainer>
      </div>
    </div>
  );
}
const AddressPageContainer = styled.div`
  height: 1000px;
  background: #dcdcdc;
  position: relative;
`;

export default address;
