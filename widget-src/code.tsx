// This is a counter widget with buttons to increment and decrement the number.

const { widget, timer } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Input } = widget

type Participant = {
  name: string;
  isDriver?: boolean;
  isNavigator?: boolean;
}

function Widget() {
  const [participants, setParticipants] = useSyncedState<Participant[]>('participants', []);
  const [isAddingParticipant, setIsAddingParticipant] = useSyncedState<boolean>('isAddingParticipant', false);

  const getColor = (participant: Participant) => {
    if (participant.isDriver) {
      return '#009B77';
    }
    if (participant.isNavigator) {
      return '#FFB81C';
    }
  }

  // Navigator -> driver

  const start = () => {
    if (participants.length < 1) {
      return; 
    }
    const currentDriver: Participant | undefined = participants.find(participant => participant.isDriver); 
    if (!currentDriver) {
      participants[0].isNavigator = true;
      participants[1].isDriver = true;
      setParticipants(participants);
      timer?.start(2);
      return;
    }
    const currentNavigatorIndex = participants.findIndex(participant => participant.isNavigator);
    const currentDriverIndex = participants.findIndex(participant => participant.isDriver); 
    participants[currentDriverIndex].isDriver = false;
    participants[currentDriverIndex].isNavigator = false;
    participants[currentNavigatorIndex].isDriver = true;
    participants[currentNavigatorIndex].isNavigator = false;
    if (currentNavigatorIndex <= 0) {
      participants[participants.length-1].isNavigator = true;
    } else {
      participants[currentNavigatorIndex-1].isNavigator = true;
    }
    setParticipants(participants); 
    timer?.start(600);
  }

  const Header = () => (
    <AutoLayout>
      <Text fontSize={32} horizontalAlignText={'center'} fill={'#ffffff'}>
        MobJam
      </Text>
      <SVG src={`
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
          <path fill="white" d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill="white" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
         </svg>
        `} onClick={() => setIsAddingParticipant(true)}></SVG>
      {isAddingParticipant ? <Input
        value={''}
        placeholder="Type name"
        onTextEditEnd={(e) => {
          participants.push({ name: e.characters });
          setParticipants(participants);
          setIsAddingParticipant(false);
        }}
        fontSize={13}
        fill="#7f1d1d"
        width={200}
        inputFrameProps={{
          fill: "#fee2e2",
          stroke: "#b91c1c",
          cornerRadius: 16,
          padding: 20,
        }}
        inputBehavior="wrap"
      /> : null}
      <SVG src={`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
          <path fill="white" d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
        </svg>
      `} onClick={start}></SVG>
    </AutoLayout>
  );

  return (
    <AutoLayout
      spacing={8}
      padding={16}
      cornerRadius={8}
      fill={'#000'}
      stroke={'#E6E6E6'}
      width={500}
      height={700}
    >
      <AutoLayout direction="vertical">
        <Header />

        <AutoLayout padding={5} direction="vertical">
          {participants.map(participant => (
            <AutoLayout fill={getColor(participant)}>
              <Text fontSize={32} horizontalAlignText={'center'} onClick={() => timer?.start(60)} fill={'#ffffff'}>
                {participant.name}
              </Text>
              {participant.isDriver ? <SVG src={`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-car-front" viewBox="0 0 16 16">
                <path fill="white" d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276Z"/>
                <path fill="white" d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.807.807 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155 1.806 0 4.037-.084 5.592-.155A1.479 1.479 0 0 0 15 9.611v-.413c0-.099-.01-.197-.03-.294l-.335-1.68a.807.807 0 0 0-.43-.563 1.807 1.807 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3H4.82Z"/>
              </svg>
              `}></SVG> : null}
              {participant.isNavigator ? <SVG src={`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16">
                <path fill-rule="evenodd" fill="white" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
              </svg>
              `}></SVG> : null}
              <SVG src={`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path fill="white" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" fill="white" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              `} onClick={() => {
                  const index = participants.indexOf(participant);
                  if (index !== -1) {
                    participants.splice(index, 1);
                    setParticipants(participants);
                  }
                }}></SVG>
            </AutoLayout>
          ))}
        </AutoLayout>
      </AutoLayout>

    </AutoLayout>
  )
}

widget.register(Widget)
