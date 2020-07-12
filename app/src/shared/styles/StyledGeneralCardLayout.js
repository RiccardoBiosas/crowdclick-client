import styled from "styled-components";

const StyledGeneralCardLayout = styled.main`
  width: 100vw;
  height: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:first-child {
    & > h1 {
      color: ${(props) => props.theme.publisherForm.mainHeading};
    }
  }
`;

export default StyledGeneralCardLayout;
