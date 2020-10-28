import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../../css/style'

class Screen2 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.route.name}</Text>
            </View>
        )
    }
}

export default Screen2;

