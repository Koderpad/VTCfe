import styled from "styled-components";

// const StyledLogo = styled.div`
//   /* text-align: center; */
//   /* position: absolute;
//   top: 50%;
//   transform: translateY(-50%); */
//   /* text-align: center; */
//   /* top: 590px; */
//   height: 100vh;
//   line-height: 100vh;
//   display: flex;
//   /* flex-direction: column;
//   justify-content: space-around;
//   align-items: center; */
//   flex-direction: column-reverse;
//   justify-content: space-around;
//   align-items: center;
// `;

const Img = styled.img`
  width: 250px;
  height: 230px;
  /* flex-shrink: 0; */
`;

function Logo_fix() {
  const src = "/public/Logo.png";

  return <Img src={src} alt="Logo" />;
}

export default Logo_fix;
