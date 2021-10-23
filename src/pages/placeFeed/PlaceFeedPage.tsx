import styled from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PlaceFeedPage.css";
import { Option } from "react-dropdown";
import { colors, Container, SubText } from "../../styles/styles";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import routes from "../../routes";
import { useEffect, useState, useRef, Component } from "react";
import { useQuery } from "react-query";
import {
  getPlacesByLocation,
  PlaceLocation,
} from "../../lib/api/getPlacesByLocation";
import {
  CURRENT_USER,
  placeLocationoptions,
  CURRENT_PLACE,
} from "../../components/shared/constants";
import {
  GetMyRooms,
  GetPlacesByLocationOutput,
  IRoom,
} from "../../lib/api/types";
import PlaceFeedRowsContainer from "../../components/placeFeed/PlaceFeedContainer";
import storage from "../../lib/storage";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import queryString from "query-string";
import { getMyRooms } from "../../lib/api/getMyRooms";
import { SetLocalStorageItemWithMyRoom } from "../../lib/helper";
import PopUp from "../../components/UI/PopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faMinus } from "@fortawesome/free-solid-svg-icons";
import EventBanner from "../../components/UI/EventBanner";

interface Props extends RouteComponentProps {}

export default function PlaceFeedPage({ history, location }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const historyH = useHistory();
  const UrlSearch = location.search;
  const [page, setPage] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [popUpNoShow, setPopUpNoShow] = useState(true);
  const [
    selectedPlaceLocation,
    setSelectedPlaceLocation,
  ] = useState<PlaceLocation>(placeLocationoptions[0].value as PlaceLocation);
  const isLoggedIn = Boolean(
    queryString.parse(UrlSearch).isLoggedIn === "true"
  );
  const isSignup = Boolean(queryString.parse(UrlSearch).isSignup === "true");

  const HandleChangeLocation = (option: Option) => {
    storage.setItem(CURRENT_PLACE, option.value as PlaceLocation);
    setSelectedPlaceLocation(option.value as PlaceLocation);
  };

  const { data, isLoading, isError } = useQuery<
    GetPlacesByLocationOutput | undefined
  >(
    ["place", selectedPlaceLocation, page],
    () => getPlacesByLocation(selectedPlaceLocation, page),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const { data: myRoomsData } = useQuery<GetMyRooms | undefined>(
    ["room"],
    () => getMyRooms(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!myRoomsData?.myRooms || myRoomsData.myRooms.length === 0) return;
    SetLocalStorageItemWithMyRoom(myRoomsData.myRooms);
  }, [myRoomsData]);

  useEffect(() => {
    if (!storage.getItem(CURRENT_USER)) {
      toast.info("로그인하신 후에 이용해주세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
      history.push(routes.root);
      return;
    }

    if (isLoggedIn) {
      toast.success("다시 돌아오신 것을 환영합니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      historyH.replace(location.pathname);
    } else if (isSignup) {
      toast.success("가입이 완료되었습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      historyH.replace(location.pathname);
    }

    if (!storage.getItem(CURRENT_PLACE)) {
      storage.setItem(CURRENT_PLACE, selectedPlaceLocation);
    } else {
      setSelectedPlaceLocation(storage.getItem(CURRENT_PLACE));
    }

    if (storage.getItem("POP_UP") === "true") {
      setPopUp(true);
      setPopUpNoShow(false);
    }
  }, []);



  const OnScroll = () => {
    console.log(
      window.pageYOffset +
        window.innerHeight +
        " " +
        container.current?.clientHeight
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", OnScroll);
    return () => {
      window.removeEventListener("scroll", OnScroll);
    };
  }, []);

  return (
    <Container ref={container}>
      <PageTitle title="맛집 피드" />
      {/* Drop down */}
      <TopWrapper>
        <Top>
          <DropDownWrapper>
            <Dropdown
              controlClassName="drop-down-className"
              options={placeLocationoptions}
              value={selectedPlaceLocation}
              onChange={HandleChangeLocation}
            />
          </DropDownWrapper>
          <Link to={routes.request} style={{ textDecoration: "none" }}>
            <RequestP>맛집 모임 만들기 {"+"}</RequestP>
          </Link>
        </Top>
      </TopWrapper>

      {/* 이벤트 배너  */}
      <EventBanner bannerImageUrl={data?.eventBannerImageUrl} />

      {/* Places Feed Rows container */}
      <PlaceFeedRowsWrapper>
        <PlaceFeedRowsContainer
          hasError={isError}
          isLoading={isLoading}
          placeFeedDataArray={data?.places}
        />
      </PlaceFeedRowsWrapper>

      {/* Bottom Info text */}
      <BottomInfoTextContainer>
        <BottomInfoText>
          {"'"}연고이팅{"'"}은 대학친구들과 따뜻한 밥 한끼, 술 한잔 할 수 있는
          문화를 여러분들과 함께 만들어나갔으면 좋겠어요{"😊"}
          <br /> <br />
          아직 베타 서비스 단계로 여러분들의 피드백이 간절해요.
          <br />
          많이 많이 부탁드리겠습니다{"🙌"}
        </BottomInfoText>
      </BottomInfoTextContainer>
      <BottomNavBar selectedItem="places" />
      {popUp && !isLoading && (
        // change popup-onclose
        <PopUp isClose={!popUp}>
          <PopUpImg src="/popUps/HolloweenPopUp.png" />
          <NoShowTodaySpan
            onClick={() => {
              setPopUpNoShow(!popUpNoShow);
              storage.setItem("POP_UP", popUpNoShow + "");
            }}
          >
            <FontAwesomeIcon
              icon={popUpNoShow ? faCheckCircle : faCircle}
              color={popUpNoShow ? "#68E1FD" : "white"}
            />
            <span>다시는 보지 않겠습니다</span>
          </NoShowTodaySpan>
          <CloseButton onClick={() => setPopUp(false)}>닫기</CloseButton>
          <PopUpCTAButton>
            파티 입장하기
            <FontAwesomeIcon
              icon={faMinus}
              style={{ position: "absolute", right: "17.5px" }}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ position: "absolute", right: "15px" }}
            />
          </PopUpCTAButton>
        </PopUp>
      )}
    </Container>
  );
}

const CloseButton = styled.span`
  position: absolute;
  bottom: -20px;
  right: 5px;
  font-size: 13px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const NoShowTodaySpan = styled.span`
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: -25px;
  left: 5px;
  font-size: 18px;
  color: white;
  display: flex;
  justify-content: flex-start;
  span {
    font-size: 13px;
    color: white;
    text-align: cetner;
    margin-left: 5px;
  }
`;

const PopUpCTAButton = styled.div`
  background-color: white;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 185px;
  height: 30px;
  position: absolute;
  font-weight: bold;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 70px;
`;

const PopUpImg = styled.img`
  width: 320px;
  height: 430px;
  position: absolute;
  top: 0;
`;

const PopUpWrapper = styled.div`
  width: 320px;
  height: 430px;
  position: relative;
`;

const TopInfoTextContainer = styled.div`
  margin: 16px 25px 15px;
`;

const TopInfoText = styled(SubText)`
  font-size: 12px;
`;

const BottomInfoTextContainer = styled.div`
  margin: 36px auto;
  width: 330px;
`;

const BottomInfoText = styled(SubText)`
  color: ${colors.MidGray};
  font-size: 13px;
  line-height: 16px;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: --webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 22px 12px 0;
  justify-content: space-between;
  margin-top: 10px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const RequestP = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${colors.MidGray};
  padding-top: 8px;
`;

const PlaceFeedRowsWrapper = styled.div`
  min-height: 50vh;
`;
