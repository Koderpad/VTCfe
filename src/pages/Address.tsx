import AddressForm from "../features/auth/components/AddressForm";
import styled, { css } from "styled-components";
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
