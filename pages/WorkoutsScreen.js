import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Workout from "../components/Workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const WorkoutsScreen = ({ navigation }) => {
  const [workoutList, setWorkoutList] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const getWorkoutList = async () => {
    // await AsyncStorage.clear()
    const listName = "@workoutList";
    try {
      const jsonValue = await AsyncStorage.getItem(listName);
      if (jsonValue !== null) {
        setWorkoutList(JSON.parse(jsonValue));
      } else {
        setWorkoutList([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteWorkout = async (workoutName) => {
    const listName = "@workoutList";
    let temporaryWorkoutList = [...workoutList];

    const newWorkoutList = temporaryWorkoutList.filter(
      (workout) => workout.name !== workoutName
    );

    setWorkoutList(newWorkoutList);

    try {
      AsyncStorage.setItem(listName, JSON.stringify(newWorkoutList));
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getWorkoutList().catch((err) => console.log(err));
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        {workoutList?.map((workout) => (
          <Workout
            title={workout.name}
            onPress={() =>
              navigation.navigate("WorkoutDetails", {
                name: workout.name,
              })
            }
            onLongPress={() => deleteWorkout(workout.name)}
          />
        ))}
      </View>
      <Pressable
        onPress={() => navigation.navigate("WorkoutEdit", { name: null })}
      >
        <Text style={styles.cto}>Adicionar</Text>
      </Pressable>
    </>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    width: "90%",
  },
  cto: {
    backgroundColor: "blue",
    color: "white",
    padding: 16,
    margin: 16,
  },
});
