import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors, Container } from "../../../styles/styles";

function V2LandingPage() {
  return (
    <SContainer>
      <Header>
        <HeaderItem>
          <FontAwesomeIcon icon={faBars} color={colors.Black} size="2x" />
        </HeaderItem>
        <HeaderItem>로그인</HeaderItem>
      </Header>
    </SContainer>
  );
}

const SContainer = styled(Container)`
  background-color: red;
  min-height: 100vh;
`;

const Header = styled.div`
  position: fixed;
  width: 375px;
  height: 80px;
  background-color: ${colors.LightGray};
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
`;

const HeaderItem = styled.div`
  align-self: center;
`;

export default V2LandingPage;
