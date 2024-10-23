import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Todo } from "../App";

interface Country {
  name: string;
  code: string;
}

interface AddTodoFormProps {
  countries: Country[];
  saveTodos: (todos: Todo[]) => void;
  todos: Todo[];
  darkMode: boolean;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  countries,
  saveTodos,
  todos,
  darkMode,
}) => {
  const [user, setUser] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    if (!user || !country || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (description.length > 120) {
      Alert.alert("Error", "Description must be 120 characters or less");
      return;
    }

    const newTodo: Todo = { user, country, description };
    saveTodos([...todos, newTodo]);
    setUser("");
    setCountry("");
    setDescription("");
    Alert.alert("Success", "Todo added successfully");
  };

  return (
    <View className="mb-4">
      <TextInput
        className={`border p-2 rounded mb-2 ${
          darkMode
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        }`}
        placeholder="User"
        placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
        value={user}
        onChangeText={setUser}
      />
      <Picker
        selectedValue={country}
        onValueChange={(itemValue: string) => setCountry(itemValue)}
        style={{
          backgroundColor: darkMode ? "#1F2937" : "#F3F4F6",
          color: darkMode ? "#FFFFFF" : "#000000",
        }}
      >
        <Picker.Item label="Select a country" value="" />
        {countries.map((country: Country) => (
          <Picker.Item
            key={country.code}
            label={country.name}
            value={country.name}
          />
        ))}
      </Picker>
      <TextInput
        className={`border p-2 rounded mb-2 ${
          darkMode
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        }`}
        placeholder="Description (max 120 characters)"
        placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
        value={description}
        onChangeText={setDescription}
        maxLength={120}
        multiline
      />
      <TouchableOpacity onPress={addTodo} className="bg-blue-500 p-2 rounded">
        <Text className="text-white text-center">Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};
