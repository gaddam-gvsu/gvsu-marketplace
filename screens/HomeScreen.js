import { Button, Text, View } from 'react-native';
import React, {useContext} from 'react';

import { AuthContext } from '../App';

export function HomeScreen() {
    const { user, signOut } = useContext(AuthContext);

    return (
        <View>
            <Text>{user.name}</Text>
            <Button title="Sign out" onPress={signOut} />
        </View>
    );
}
