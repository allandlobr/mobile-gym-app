import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Diet = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.dietContainer}>
        <Text style={styles.dietTitle}>{title}</Text>
        <Ionicons style={styles.dietIcon} name="play" size={36} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default Diet;

const styles = StyleSheet.create({
  dietContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#3DD598",
    padding: 30,
    alignItems: "center",
    marginTop: 16,
    borderRadius: 8,
  },
  dietTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  dietIcon: {
    marginLeft: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
  },
});
