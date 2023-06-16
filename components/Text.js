import React from 'react';
import {Text} from "react-native";
import defaultStyles from "../utils/DefaultStyles";

const CText = ({ children, style, ...otherProps }) => {
    return (
        <Text style={[defaultStyles.text, style]} {...otherProps} >{ children }</Text>
    );
};

export default CText;