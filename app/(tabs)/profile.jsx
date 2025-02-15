import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });

  const [Items,setItems] =useState([]);
  useEffect(()=>
  {
    retreiveItems();
  },[]);

  const retreiveItems = async ()=>
  {
    try{
      const response = await axios.get(`${API_URL}/lost-and-found/items`);
      setItems(response.data);
    }catch(error)
    {
      console.error("Error fetching items:", error);
    }
  }

  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/lost-and-found/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data:{
          itemId
        },
      });

      setItems(items.filter((item) => item.item_id !== itemId)); 
      alert("Item deleted successfully.");
    } catch (error) {
     
      alert("Failed to delete item");
    }
  };

  
  const [passwordDetails, setPasswordDetails] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordDetails({ ...passwordDetails, [field]: value });
  };

  const saveChanges = () => {
    if (passwordDetails.newPassword && passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    setEditMode(false);
    setPasswordDetails({ newPassword: '', confirmPassword: '' });
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
   <ScrollView className="flex-1 bg-tertiary px-4 py-6">
    <View className="h-9 bg-tertiary"></View>
  <View className="flex-1 justify-center items-center">
    <View className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-600">Name</Text>
        {editMode ? (
          <TextInput
            className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
            value={userDetails.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
        ) : (
          <Text className="text-lg text-gray-800 mt-1">{userDetails.username}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-600">Email</Text>
        {editMode ? (
          <TextInput
            className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
            value={userDetails.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        ) : (
          <Text className="text-lg text-gray-800 mt-1">{userDetails.email}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-600">Phone</Text>
        {editMode ? (
          <TextInput
            className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
            value={userDetails.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
          />
        ) : (
          <Text className="text-lg text-gray-800 mt-1">{userDetails.phone}</Text>
        )}
      </View>

      {editMode && (
        <>
          <View className="mb-4 relative">
            <Text className="text-sm font-semibold text-gray-600">New Password</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
              secureTextEntry={!showPassword}
              value={passwordDetails.newPassword}
              onChangeText={(text) => handlePasswordChange("newPassword", text)}
            />
            <TouchableOpacity
              className="absolute right-3 top-8"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View className="mb-4 relative">
            <Text className="text-sm font-semibold text-gray-600">Confirm Password</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
              secureTextEntry={!showConfirmPassword}
              value={passwordDetails.confirmPassword}
              onChangeText={(text) => handlePasswordChange("confirmPassword", text)}
            />
            <TouchableOpacity
              className="absolute right-3 top-8"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      <TouchableOpacity
        className="bg-blue-600 rounded py-2 px-4 mt-4"
        onPress={() => (editMode ? saveChanges() : setEditMode(true))}
      >
        <Text className="text-white text-center font-medium">
          {editMode ? "Save Changes" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</ScrollView>

  );
};

export default Profile;

