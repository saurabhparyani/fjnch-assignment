import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Todo } from "../App";

interface TodoListProps {
  todos: Todo[];
  saveTodos: (todos: Todo[]) => void;
  darkMode: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  saveTodos,
  darkMode,
}) => {
  const deleteTodo = (index: number) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          const newTodos = todos.filter((_, i) => i !== index);
          saveTodos(newTodos);
        },
      },
    ]);
  };

  return (
    <View>
      {todos.map((todo, index) => (
        <View
          key={index}
          className={`mb-2 p-2 rounded ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <Text
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            {todo.description}
          </Text>
          <Text className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Assigned to: {todo.user}
          </Text>
          <Text className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Country: {todo.country}
          </Text>
          <TouchableOpacity onPress={() => deleteTodo(index)} className="mt-2">
            <Text className="text-red-500">Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
