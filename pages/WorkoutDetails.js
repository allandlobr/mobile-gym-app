import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const WorkoutDetails = ({ route, navigation }) => {
  const { name } = route.params;

  const [workout, setWorkout] = useState(null);
  const [exercices, setExercices] = useState(null);

  const getWorkout = async () => {
    if (name === null) {
      navigation.goBack();
    } else {
      const listName = "@workoutList";
      try {
        const jsonValue = await AsyncStorage.getItem(listName);
        if (jsonValue) {
          const workoutList = JSON.parse(jsonValue);
          const workout = workoutList.find((workout) => workout.name === name);
          if (workout) {
            setWorkout(workout);
            setExercices(workout.exercices);
          } else {
            navigation.goBack();
          }
        } else {
          navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveWorkout = async () => {
    const listName = "@workoutList";
    const jsonValue = await AsyncStorage.getItem(listName);
    const workoutList = jsonValue === null ? [] : JSON.parse(jsonValue);

    try {
      if (name === null) {
        workoutList.push({ ...workout, exercices: [...exercices] });
        await AsyncStorage.setItem(listName, JSON.stringify(workoutList));
        navigation.goBack();
      } else {
        const newWorkoutList = workoutList.map((work) => {
          if (work.name === name) {
            return { ...workout, exercices: [...exercices] };
          }
          return work;
        });
        await AsyncStorage.setItem(listName, JSON.stringify(newWorkoutList));
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateWeigth = (value, weightIndex, exerciceIndex) => {
    let temporaryExercices = [...exercices];
    temporaryExercices[exerciceIndex].weights[weightIndex] = value;
    setExercices(temporaryExercices);
  };

  useEffect(() => {
    getWorkout().catch((err) => console.log("Erro"));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{workout?.name}</Text>
      <Text>{workout?.weekday.label}</Text>

      <ScrollView style={{ height: 400 }}>
        {exercices?.map((exercice, index) => {
          return (
            <View>
              <View style={styles.exerciceName}>
                <Text>{exercice.name}</Text>
              </View>
              <View style={styles.weightsContainer}>
                {exercice.weights.map((weight, weightIndex) => (
                  <TextInput
                    style={styles.weightTextInput}
                    editable={true}
                    value={weight}
                    onChangeText={(value) =>
                      updateWeigth(value, weightIndex, index)
                    }
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Pressable onPress={saveWorkout}>
        <Text style={styles.cto}>Salvar</Text>
      </Pressable>
    </View>
  );
};

export default WorkoutDetails;

const styles = StyleSheet.create({
  container: {
    marginVertical: "10%",
    marginHorizontal: "5%",
    width: "90%",
  },
  weightsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  quantityButton: {
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
  },
  cto: {
    backgroundColor: "blue",
    color: "white",
    padding: 16,
    marginTop: 8,
  },
  exerciceName: {
    marginVertical: 16,
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  removeExercice: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "red",
  },
  nameTextInput: {
    marginVertical: 16,
    borderWidth: 1,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  exerciceNameTextInput: {
    borderWidth: 1,
    width: "80%",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  weightTextInput: {
    width: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  buttonsContainer: {
    marginTop: 20,
  },
});
