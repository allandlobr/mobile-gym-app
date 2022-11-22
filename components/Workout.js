import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Workout = ({ title, onPress, onLongPress }) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.workoutContainer}>
        <Text style={styles.workoutTitle}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Workout;

const styles = StyleSheet.create({
  workoutContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#6952DC",
    padding: 30,
    alignItems: "center",
    marginTop: 16,
    borderRadius: 8,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  workoutIcon: {
    marginLeft: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
  },
});
