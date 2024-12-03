import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../assets/styles";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch the user data from the API
  useEffect(() => {
    fetch("https://674ebc64bb559617b26c6c2a.mockapi.io/api/v1/user")
      .then((response) => response.json())
      .then((data) => {
        const userData = data.find((item) => item.id === 7);
        setUser(userData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { age, info1, info2, info3, info4, location, match, name } = user;

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={require("../assets/images/07.jpg")} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon
                name="ellipsis-vertical"
                size={20}
                color={WHITE}
                style={styles.topIconRight}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={`${location.city}, ${location.country}`}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Icon name="ellipsis-horizontal" size={20} color={WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Icon name="chatbubble" size={20} color={WHITE} />
            <Text style={styles.textButton}>Trò chuyện</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
