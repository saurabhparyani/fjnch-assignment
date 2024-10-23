import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";
import { fetchCountries } from "./utils/api";
import "./global.css";

export interface Todo {
  user: string;
  country: string;
  description: string;
}

export interface Country {
  name: string;
  code: string;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    loadTodos();
    loadCountries();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const loadCountries = async () => {
    try {
      const fetchedCountries = await fetchCountries();
      setCountries(fetchedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SafeAreaView className={`flex-1 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <View className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Todo List
          </Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
        <ScrollView>
          <AddTodoForm
            countries={countries}
            saveTodos={saveTodos}
            todos={todos}
            darkMode={darkMode}
          />
          <TodoList todos={todos} saveTodos={saveTodos} darkMode={darkMode} />
        </ScrollView>
      </View>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
}
