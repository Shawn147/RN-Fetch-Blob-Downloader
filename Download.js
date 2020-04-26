import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import Image from "react-native-fast-image";
import { GlobalHeader, Icons } from "../components";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { inpAction, reportsAction } from "../redux/actions/userActions";
import { connect } from "react-redux";
import Ripple from "react-native-material-ripple";
import { FontColor } from "../components/theme";
class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  actualDownload = () => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${this.props.array.sub_name} report.pdf`,
        path: `${dirs.DownloadDir}/${this.props.array.sub_name} report.pdf`,
      },
    })
      .fetch("GET", `${this.props.array.file}`, {})
      .then((res) => {
        console.log("The file saved to ", res.path());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async downloadFile() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.downloadFile()}
          style={{
            width: 50,
            paddingVertical: 4,
            //   backgroundColor: 'red',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons.MaterialCommunityIcons
            name="file-download"
            size={22}
            color={"orange"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FontColor.red },
});
