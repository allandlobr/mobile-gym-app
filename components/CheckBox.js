import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CheckBox = () => {
  const [checked, onChange] = useState(true);

  function onCheckmarkPress() {
    onChange(!checked);
  }

  return (
    <Pressable style={styles.container} onPress={onCheckmarkPress}>
      <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </View>
      <Text style={styles.text}>Opção #120139</Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "coral",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "coral",
  },
  text: {
    marginLeft: 10,
    alignContent: "center",
  },
});
