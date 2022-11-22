import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./pages/HomeScreen";
import WorkoutsScreen from "./pages/WorkoutsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutDetails from "./pages/WorkoutDetails";
import { SelectProvider } from "@mobile-reality/react-native-select-pro";
import WorkoutEdit from "./pages/WorkoutEdit";

const Tab = createBottomTabNavigator();
const WorkoutStack = createNativeStackNavigator();

const WorkoutTab = () => {
  return (
    <WorkoutStack.Navigator initialRouteName="Workouts">
      <WorkoutStack.Screen name="Workouts" component={WorkoutsScreen} />
      <WorkoutStack.Screen name="WorkoutDetails" component={WorkoutDetails} />
      <WorkoutStack.Screen name="WorkoutEdit" component={WorkoutEdit} />
    </WorkoutStack.Navigator>
  );
};

export default function App() {
  return (
    <SelectProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={() => ({
              tabBarIcon: ({ size, color }) => {
                return <Ionicons name="home" size={size} color={color} />;
              },
            })}
          />
          <Tab.Screen
            name="Workout"
            component={WorkoutTab}
            options={() => ({
              tabBarIcon: ({ size, color }) => {
                return (
                  <FontAwesome5 name="dumbbell" size={size} color={color} />
                );
              },
              headerShown: false,
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SelectProvider>
  );
}
