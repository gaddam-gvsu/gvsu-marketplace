import colors from "./Colors";
import {Platform} from "react-native";

export default {
    colors,
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? 'Roboto' : 'avenir',
    }
}