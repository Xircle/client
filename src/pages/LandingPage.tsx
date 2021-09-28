import { useState } from "react";
import styled from "styled-components";
import {
  ProcedureHeading,
  MainBtn,
  ContainerwithLeftRightMargin,
  colors,
  SubText,
  FlexDiv,
} from "../styles/styles";
import KakaoLogin from "react-kakao-login";
import { LoginResponse, UserProfile } from "../lib/kakao";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();

  const kakaoSuccessCallback = (response: {
    response: LoginResponse;
    profile?: UserProfile | undefined;
  }) => {
    process.env.NODE_ENV === "development" && console.log(response);
    history.push("/social/redirect", {
      uid: response.profile?.id,
      thumbnail: response.profile?.kakao_account.profile.profile_image_url,
      username: response.profile?.properties.nickname,
      email: response.profile?.kakao_account.email,
      gender: response.profile?.kakao_account.gender,
    });
  };

  return (
    <Container>
      <MainBox>
        <img src="/landingPage/LandingPageMain.jpeg" />
        <Row>
          <Heading>
            안암{"/"}신촌에서 만나는 <br /> 연고대 친구 <br /> 네시모해 {"👋"}
          </Heading>
        </Row>
        <Row style={{ paddingTop: "3vh" }}>
          <MainInfo>
            취향이 비슷한 대학 친구들과
            <br />
            <b>먹고 마시고, 웃고 떠들며 함께 놀러가는</b>
            <br />
            대학생 맛집매칭 서비스입니다{"."}
            <br />
            새내기 {"/"} 졸업생 {"/"} 대학원생 누구나{"!"}
          </MainInfo>
        </Row>
        <Row
          style={{
            position: "absolute",
            bottom: "10vh",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <MainDetail>
            {"※ "}현재는 고려대{"/"}연세대{"/"}이화여대 학교로만 운영중이에요
          </MainDetail>
          <div style={{ position: "relative" }}>
            <img
              src="/landingPage/kakao.svg"
              style={{
                position: "absolute",
                left: "4.25rem",
                top: "50%",
                transform: "translate(0, -50%)",
              }}
            />
            <KakaoLogin
              token={process.env.REACT_APP_KAKAO_KEY!}
              onSuccess={kakaoSuccessCallback}
              onFail={() => console.log("kakao login fail")}
              onLogout={() => console.log("hi")}
              style={{
                width: "333px",
                height: "50px",
                padding: "1.25rem 0",
                background: "#FFE812",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bolder",
                cursor: "pointer",
                color: colors.Black,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "rgba(75, 88, 208, 0.5) 0px 25px 20px -20px",
              }}
            />
          </div>
        </Row>
      </MainBox>
      <SubBox>
        <FlexDiv>
          <HeadingSubBox>
            맛집 모임으로
            <br />
            <b>대학친구</b> 사귀기
          </HeadingSubBox>
        </FlexDiv>
        <FlexDiv>
          <TextSubBox>철수는 여기서 연대생 동네 친구 사귀었대{"!"}</TextSubBox>
        </FlexDiv>
        <FlexDiv>
          <img src="/landingPage/SubPic1.png" />
        </FlexDiv>
      </SubBox>
      <SubBox style={{ height: "1000px" }}>
        <FlexDiv>
          <HeadingSubBox>
            함께할 친구들
            <br />
            <b>프로필</b> 둘러보기
          </HeadingSubBox>
        </FlexDiv>
        <FlexDiv>
          <TextSubBox>
            네시모해에 가입한 친구들과 소통을 즐겨보아요{"!"}
          </TextSubBox>
        </FlexDiv>
        <FullContainerWithLeftAndRightMargin>
          <FlexDiv>
            <img src="/landingPage/SubPic2.png" />
          </FlexDiv>
          <FlexDiv>
            <img src="/landingPage/SubPic3.png" />
          </FlexDiv>
        </FullContainerWithLeftAndRightMargin>
      </SubBox>
      <SubBox>
        <FlexDiv>
          <HeadingSubBox>
            좋은 친구들과
            <br />
            <b>맛있는 음식</b> 먹으며
            <br />
            모임 즐기기
          </HeadingSubBox>
        </FlexDiv>
        <FlexDiv>
          <TextSubBox>남은 2021년 청춘 여기서 불태우자{"!"}</TextSubBox>
        </FlexDiv>
        <FlexDiv>
          <img src="/landingPage/SubPic4.png" />
        </FlexDiv>
      </SubBox>
      <FlexDiv>
        <div style={{ position: "relative", margin: "2.25rem 0 7rem" }}>
          <img
            src="/landingPage/kakao.svg"
            style={{
              position: "absolute",
              left: "4.5rem",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          />
          <KakaoLogin
            token={process.env.REACT_APP_KAKAO_KEY!}
            onSuccess={kakaoSuccessCallback}
            onFail={() => console.log("kakao login fail")}
            onLogout={() => console.log("hi")}
            style={{
              width: "333px",
              height: "50px",
              padding: "1.25rem 0",
              background: "#FFE812",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bolder",
              cursor: "pointer",
              color: colors.Black,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(75, 88, 208, 0.5) 0px 25px 20px -20px",
            }}
          />
        </div>
      </FlexDiv>
      <Footer>
        <FooterInnerContainer>
          <b>팀 GO인물</b>
          <br />
          <SNSIconContainer>
            <a href="https://www.instagram.com/?hl=ko" target={"_blank"}>
              <BrandIcon src="/brands/instagram_logo.png" alt="instagram" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/service/service/KakaoTalk"
              target={"_blank"}
            >
              <BrandIcon
                marginLeft={"10px"}
                src="/brands/kakao_logo.png"
                alt="kakao"
              />
            </a>
            <a href="https://www.youtube.com/" target={"_blank"}>
              <BrandIcon
                marginLeft={"10px"}
                src="/brands/youtube_logo.png"
                alt="youtube"
              />
            </a>
          </SNSIconContainer>
          각종 문의 <b>네시모임 카카오톡 채널 / 인스타그램</b>
          <br />
          개인정보처리방침
          <br />
          마케팅 수신동의 이용약관
        </FooterInnerContainer>
      </Footer>
    </Container>
  );
}

const BrandIcon = styled.img<{ marginLeft?: string }>`
  width: 30px;
  height: 30px;
  margin-left: ${(props) => props?.marginLeft || "0px"};
  margin-top: 10px;
  margin-bottom: 7px;
`;

const SNSIconContainer = styled.div``;

const Footer = styled.div`
  background-color: #e7ecf3;
  width: 100%;
  height: 200px;
`;

const FooterInnerContainer = styled.div`
  padding-left: 21px;
  padding-top: 28px;
  font-size: 14px;
  line-height: 25px;
  color: #a7b0c0;
  b {
    font-weight: bold;
  }
`;

const FullContainerWithLeftAndRightMargin = styled(
  ContainerwithLeftRightMargin
)`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
`;

const SubBox = styled(FlexColumn)`
  height: 650px;
`;

const HeadingSubBox = styled.p`
  color: ${colors.Black};
  font-size: 32px;
  font-weight: bold;
  line-height: 42px;
  text-align: center;
  b {
    color: ${colors.MidBlue};
  }
`;

const TextSubBox = styled.p`
  color: ${colors.MidGray};
  font-size: 17px;
  text-align: center;
`;

const MainBox = styled.div`
  height: 100vh;
  position: relative;
`;
const MainDetail = styled(SubText)`
  font-size: 13px;
  margin: 5px 0;
  line-height: 20px;
  text-align: center;
`;
const MainInfo = styled.p`
  padding-top: 0.5vh;
  font-weight: normal;
  color: #5e5e5e;
  font-size: 15px;
  line-height: 20px;
  margin-left: 28px;
  b {
    color: ${colors.MidBlue};
  }
`;

const Heading = styled(ProcedureHeading)`
  padding-top: 8vh;
  margin-left: 28px;
  line-height: 37px;
  & + & {
    padding: 13px 0;
  }
`;

const Row = styled.div``;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBtn = styled(MainBtn)`
  margin: 1.25rem 0;
  filter: none;
  margin-left: auto;
  margin-right: auto;
`;

const InputIdPwd = styled.input`
  padding: 10px;
  width: 100%;
  margin: 5px 0;
  background: none;
  ::placeholder {
  }
`;

export default LandingPage;
