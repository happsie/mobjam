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

  // Driver -> Navigator
  // The guy före driver -> driver

  const start = () => {
    if (participants.length < 1) {
      return; 
    }
    const currentDriver: Participant | undefined = participants.find(participant => participant.isDriver); 
    if (!currentDriver) {
      participants[0].isDriver = true;
      participants[1].isNavigator = true;
      setParticipants(participants);
      timer?.start(600);
      return;
    }
    console.log(participants.length);
    
    const currentDriverIndex = participants.findIndex(participant => participant.isDriver); 
    currentDriver.isDriver = false;
    currentDriver.isNavigator = false;
    participants[currentDriverIndex+1].isNavigator = false; 
    participants[2].isDriver = true; 
    /*
    if (currentDriverIndex-1 >= 0) {
      participants[currentDriverIndex-1].isDriver = true; 
    } else {
      participants[0].isDriver = true;
    }
    if (currentDriverIndex+1 <= participants.length) {
      participants[currentDriverIndex+1].isNavigator = false; 
    } else {
      participants[0].isNavigator = false; 
    }
    */
/*

    const driverIndex = participants.findIndex(participant => participant.isDriver === true); 
    console.log('driverindex', driverIndex);
    participants[driverIndex].isDriver = false;
    participants[driverIndex].isNavigator = true; 
    if (driverIndex > participants.length || driverIndex === 0) {
      participants[0].isDriver = true; 
    } else {
      participants[driverIndex-1].isNavigator = true;
    }
    //}
    */
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

  /*
  const [count, setCount] = useSyncedState('count', 0)

  if (count !== 0) {
    usePropertyMenu(
      [
        {
          itemType: 'action',
          propertyName: 'reset',
          tooltip: 'Reset',
          icon: `<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9026 1.43168C12.1936 1.47564 12.4822 1.54098 12.7663 1.62777L12.7719 1.62949C14.0176 2.0114 15.109 2.78567 15.8858 3.83854L15.8918 3.84665C16.5473 4.73808 16.9484 5.78867 17.058 6.88508L14.0863 4.88858L13.3259 6.02047L17.3852 8.74774L17.9079 9.09894L18.2994 8.60571L21.0056 5.19662L19.9376 4.34879L18.3531 6.34479C18.3424 6.27511 18.3306 6.20563 18.3179 6.13636C18.1135 5.02233 17.6601 3.96334 16.9851 3.04274L16.9791 3.03462C16.0303 1.74427 14.6956 0.794984 13.1714 0.326388L13.1658 0.32466C12.8171 0.217755 12.4627 0.137298 12.1055 0.0832198C10.899 -0.0994351 9.66061 0.0188515 8.50099 0.435448L8.4947 0.437711C7.42511 0.823053 6.46311 1.44778 5.6774 2.25801C5.38576 2.55876 5.11841 2.88506 4.87886 3.23416C4.85856 3.26376 4.83845 3.29351 4.81854 3.32343L5.94262 4.08294L5.94802 4.07484C5.96253 4.0531 5.97717 4.03146 5.99195 4.00993C6.71697 2.95331 7.75331 2.15199 8.95541 1.72013L8.9617 1.71788C9.33245 1.58514 9.71301 1.48966 10.098 1.43156C10.6957 1.34135 11.3039 1.34123 11.9026 1.43168ZM3.70034 6.39429L0.994141 9.80338L2.06217 10.6512L3.64663 8.65521C3.65741 8.72489 3.66916 8.79437 3.68187 8.86364C3.88627 9.97767 4.33964 11.0367 5.01467 11.9573L5.02063 11.9654C5.96945 13.2557 7.30418 14.205 8.82835 14.6736L8.83398 14.6753C9.18281 14.7823 9.53732 14.8628 9.89464 14.9168C11.101 15.0994 12.3393 14.9811 13.4988 14.5646L13.5051 14.5623C14.5747 14.1769 15.5367 13.5522 16.3224 12.742C16.614 12.4413 16.8813 12.115 17.1209 11.7659C17.1412 11.7363 17.1613 11.7065 17.1812 11.6766L16.0571 10.9171L16.0518 10.9252C16.0372 10.9469 16.0225 10.9686 16.0078 10.9902C15.2827 12.0467 14.2464 12.848 13.0444 13.2799L13.0381 13.2821C12.6673 13.4149 12.2868 13.5103 11.9018 13.5684C11.3041 13.6587 10.6958 13.6588 10.0971 13.5683C9.8062 13.5244 9.51754 13.459 9.23347 13.3722L9.22784 13.3705C7.98212 12.9886 6.89078 12.2143 6.11393 11.1615L6.10795 11.1534C5.45247 10.2619 5.05138 9.21133 4.94181 8.11492L7.91342 10.1114L8.6739 8.97953L4.61459 6.25226L4.09188 5.90106L3.70034 6.39429Z" fill="white"/>
          </svg>
          `,
        },
      ],
      () => {
        setCount(0)
      },
    )
  }

  return (
    <AutoLayout
      verticalAlignItems={'center'}
      spacing={8}
      padding={16}
      cornerRadius={8}
      fill={'#FFFFFF'}
      stroke={'#E6E6E6'}
    >
      <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
        onClick={() => {
          setCount(count - 1)
        }}
      ></SVG>
      <Text fontSize={32} width={42} horizontalAlignText={'center'}>
        {count}
      </Text>
      <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
        onClick={() => {
          setCount(count + 1)
        }}
      ></SVG>
    </AutoLayout>
  )
  */
}

widget.register(Widget)
