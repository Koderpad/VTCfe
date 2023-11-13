import styled, { css } from "styled-components";

interface InputProps {
  icon?: string;
}

const Input = styled.input<InputProps>`
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  background-color: transparent;
  height: 54px;
  width: 364px;

  //icon
  padding-left: 40px; // Để tạo không gian cho icon
  background-repeat: no-repeat;
  background-position: 10px center; // Điều chỉnh vị trí của icon

  ${(props) =>
    props.icon &&
    css`
      background-image: url(${props.icon});
    `}
`;

export default Input;
