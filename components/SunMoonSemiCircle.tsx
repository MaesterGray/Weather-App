import React,{useEffect,useState} from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import useForecastWeatherData from 'hooks/getForecastData';
import useCurrentWeatherData from 'hooks/getCurrentData';
import { useLocalSearchParams } from 'expo-router';


type props = {
  city:string
}

const SunMoonSemiCircle = ({city}:props) => {

  const [rising,setrising] = useState('')
  const [setting,setsetting] = useState('')
  const Todaydata = useForecastWeatherData(1,city)
  const [presentRoute,setPresentRoute] = useState(useLocalSearchParams())

  useEffect(()=>{
  // Convert the rising and setting values to numbers
  if (presentRoute.route!=='Tomorrow'&& Todaydata.isLoading===false) {
    setrising(parseFloat(Todaydata.data.forecast.forecastday[0].astro.sunrise))
    setsetting(parseFloat())
  }
  const risingHours = parseFloat(rising);
  const settingHours = parseFloat(setting)
  })
;

  // Calculate the angle for the sun and moon based on the rising and setting times
  const sunAngle = 180 * (risingHours / 24); // Assuming rising is in hours (0-24)
  const moonAngle = 180 * (settingHours / 24); // Assuming setting is in hours (0-24)

  return (
    <View>
      <Svg width="200" height="200">
        {/* Semi-circle */}
        <Circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />

        {/* Sun */}
        <Path
          d={`M100 100 L${100 + 80 * Math.cos((90 - sunAngle) * (Math.PI / 180))} ${100 + 80 * Math.sin((90 - sunAngle) * (Math.PI / 180))}`}
          stroke="yellow"
          strokeWidth="2"
        />
        <SvgText
          x={100 + 90 * Math.cos((90 - sunAngle) * (Math.PI / 180))}
          y={100 + 90 * Math.sin((90 - sunAngle) * (Math.PI / 180))}
          textAnchor="middle"
          fill="yellow"
        >
          Sun
        </SvgText>

        {/* Moon */}
        <Path
          d={`M100 100 L${100 + 80 * Math.cos((90 - moonAngle) * (Math.PI / 180))} ${100 + 80 * Math.sin((90 - moonAngle) * (Math.PI / 180))}`}
          stroke="gray"
          strokeWidth="2"
        />
        <SvgText
          x={100 + 90 * Math.cos((90 - moonAngle) * (Math.PI / 180))}
          y={100 + 90 * Math.sin((90 - moonAngle) * (Math.PI / 180))}
          textAnchor="middle"
          fill="gray"
        >
          Moon
        </SvgText>
      </Svg>

      {/* Display rising and setting times */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Rising: {rising} hours</Text>
        <Text>Setting: {setting} hours</Text>
      </View>
    </View>
  );
};

export default SunMoonSemiCircle;
