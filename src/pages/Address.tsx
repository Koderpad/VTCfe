
import styled, { css } from "styled-components";
import AddressForm from "../features/common/address/components/AddressForm";
function address() {
    return(
        <AddressPageContainer>
            <div>
                <AddressForm/>
            </div>
                
        </AddressPageContainer>
            
     

    );
}
const AddressPageContainer = styled.div`
height: 1000px;
background: #DCDCDC;
position : relative;

`;

export default address;
