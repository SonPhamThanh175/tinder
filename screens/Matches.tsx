import React, { useState, useEffect } from "react";
import DEMO from "../assets/data/demo"; // Bạn có thể bỏ qua nếu không dùng DEMO

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { CardItem, Icon } from "../components";
import styles, { DARK_GRAY } from "../assets/styles";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    require("../assets/images/01.jpg"),
    require("../assets/images/02.jpg"),
    require("../assets/images/03.jpg"),
    require("../assets/images/04.jpg"),
    require("../assets/images/05.jpg"),
    require("../assets/images/06.jpg"),
    require("../assets/images/07.jpg"),
    require("../assets/images/08.jpg"),
    require("../assets/images/09.jpg"),
    require("../assets/images/10.jpg"),
  ];

  // Fetch data từ Mock API
  useEffect(() => {
    fetch("https://674ebc64bb559617b26c6c2a.mockapi.io/api/v1/user")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.containerMatches}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Matches</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={matches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              <CardItem
                image={images[index]}
                name={item.name}
                isOnline={item.isOnline}
                hasVariant
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Matches;
