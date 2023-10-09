



const conditionsArray =[
{code:1000,icon:require('../assets/weatherIcons/64x64/day/113.png')},
{code:1003,icon:require('../assets/weatherIcons/64x64/day/116.png')},
{code:1006,icon:require('../assets/weatherIcons/64x64/day/119.png')},
{code:1009,icon:require('../assets/weatherIcons/64x64/day/122.png')},
{code:1030,icon:require('../assets/weatherIcons/64x64/day/143.png')},
{code:1063,icon:require('../assets/weatherIcons/64x64/day/176.png')},
{code:1066,icon:require('../assets/weatherIcons/64x64/day/179.png')},
{code:1069,icon:require('../assets/weatherIcons/64x64/day/182.png')},
{code:1072,icon:require('../assets/weatherIcons/64x64/day/185.png')},
{code:1087,icon:require('../assets/weatherIcons/64x64/day/200.png')},
{code:1114,icon:require('../assets/weatherIcons/64x64/day/227.png')},
{code:1117,icon:require('../assets/weatherIcons/64x64/day/230.png')},
{code:1135,icon:require('../assets/weatherIcons/64x64/day/248.png')},
{code:1147,icon:require('../assets/weatherIcons/64x64/day/260.png')},
{code:1150,icon:require('../assets/weatherIcons/64x64/day/263.png')},
{code:1153,icon:require('../assets/weatherIcons/64x64/day/266.png')},
{code:1168,icon:require('../assets/weatherIcons/64x64/day/281.png')},
{code:1171,icon:require('../assets/weatherIcons/64x64/day/284.png')},
{code:1180,icon:require('../assets/weatherIcons/64x64/day/293.png')},
{code:1183,icon:require('../assets/weatherIcons/64x64/day/296.png')},
{code:1186,icon:require('../assets/weatherIcons/64x64/day/299.png')},
{code:1189,icon:require('../assets/weatherIcons/64x64/day/302.png')},
{code:1192,icon:require('../assets/weatherIcons/64x64/day/305.png')},
{code:1195,icon:require('../assets/weatherIcons/64x64/day/308.png')},
{code:1198,icon:require('../assets/weatherIcons/64x64/day/311.png')},
{code:1201,icon:require('../assets/weatherIcons/64x64/day/314.png')},
{code:1204,icon:require('../assets/weatherIcons/64x64/day/317.png')},
{code:1207,icon:require('../assets/weatherIcons/64x64/day/320.png')},
{code:1210,icon:require('../assets/weatherIcons/64x64/day/323.png')},
{code:1213,icon:require('../assets/weatherIcons/64x64/day/326.png')},
{code:1216,icon:require('../assets/weatherIcons/64x64/day/329.png')},
{code:1219,icon:require('../assets/weatherIcons/64x64/day/332.png')},
{code:1222,icon:require('../assets/weatherIcons/64x64/day/335.png')},
{code:1225,icon:require('../assets/weatherIcons/64x64/day/338.png')},
{code:1237,icon:require('../assets/weatherIcons/64x64/day/350.png')},
{code:1240,icon:require('../assets/weatherIcons/64x64/day/353.png')},
{code:1243,icon:require('../assets/weatherIcons/64x64/day/356.png')},
{code:1246,icon:require('../assets/weatherIcons/64x64/day/359.png')},
{code:1249,icon:require('../assets/weatherIcons/64x64/day/362.png')},
{code:1252,icon:require('../assets/weatherIcons/64x64/day/365.png')},
{code:1255,icon:require('../assets/weatherIcons/64x64/day/368.png')},
{code:1258,icon:require('../assets/weatherIcons/64x64/day/371.png')},
{code:1261,icon:require('../assets/weatherIcons/64x64/day/374.png')},
{code:1264,icon:require('../assets/weatherIcons/64x64/day/377.png')},
{code:1273,icon:require('../assets/weatherIcons/64x64/day/386.png')},
{code:1276,icon:require('../assets/weatherIcons/64x64/day/389.png')},
{code:1279,icon:require('../assets/weatherIcons/64x64/day/392.png')},
{code:1282,icon:require('../assets/weatherIcons/64x64/day/395.png')}

]


export function useWeatherIcon(code:number){

for (let index = 0; index < conditionsArray.length; index++) {
    if (code === conditionsArray[index].code) {
        return conditionsArray[index].icon
    }
    
}
 return 'null'
}