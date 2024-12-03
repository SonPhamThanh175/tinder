import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { Icon, Message } from "../components";
import axios from "axios";
import styles, { DARK_GRAY } from "../assets/styles";

const Messages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Predefined list of images
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

  useEffect(() => {
    axios
      .get("https://674ebc64bb559617b26c6c2a.mockapi.io/api/v1/user")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.containerMessages}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data} // Use the fetched data
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              <Message
                image={images[index]} // Use images[index] here
                name={item.name}
                lastMessage={item.message}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Messages;
