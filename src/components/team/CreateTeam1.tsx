import styled from "styled-components";
import { MidInput } from "../../styles/styles";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam1({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <Label mandatory={true} labelName="클럽 이름" />
      <OnlineInput
        placeholder="개성있는 클럽 이름을 적어주세요!"
        type="text"
        name="clubName"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        value={state.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "setName", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.name?.length}/30</CancelWordCount>
      <Label mandatory={true} labelName="만나는 정기모임 요일 및 시간" />
      <Label mandatory={true} labelName="주 활동지역 (복수 선택 가능)" />
      <Label mandatory={true} labelName="클럽 나이대" />
      <Label mandatory={true} labelName="클럽 활동테마" />
      <Label mandatory={true} labelName="리더 자기소개" />
    </Container>
  );
}

const CancelWordCount = styled.div`
  color: #c4cbd8;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: end;
`;

const Container = styled.div``;

const OnlineInput = styled(MidInput)`
  width: 100%;
`;
