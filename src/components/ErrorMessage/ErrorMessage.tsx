import { FC } from 'react'
import styled from 'styled-components'

interface IProps {
    children: string | undefined
    className?: string
    $isError?: boolean | undefined | ""
}

interface IInputErrorProps{
  $isError?: boolean | undefined | "";
}

const StyledErrorMessage = styled.span<IInputErrorProps>`
  font-size: small;
  font-weight: 300;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align:center;
  color: ${(props) => (props.$isError ? "red" : "white")};
  width: 100%;
`;



const ErrorMessage:FC<IProps> = ({children, className, $isError}) => {

  if(!children) return null

  return (
    <StyledErrorMessage $isError={$isError} className={className}>{children}</StyledErrorMessage>
  )
}

export default ErrorMessage