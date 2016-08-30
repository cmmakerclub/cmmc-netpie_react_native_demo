/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

let MicroGear = require('react-native-cmmc-microgear');

class netpie_react_native_demo extends Component {

    APPID = "CMMC";
    KEY = "Qiah96b7mdcmtvq";
    SECRET = "bt81P9VyTilLkdMJrN9c10Jph";

    constructor() {
        super();
        this.state = {
            msg: 'Connecting..',
            topic: ''
        };

        this.microgear = MicroGear.create({
            key: this.KEY,
            secret: this.SECRET
        });

        this.microgear.on('connected', () => {
            console.log('Connected...');
            this.microgear.subscribe("/CMMC/gearname/+/temp");
            setInterval(() => {
                this.microgear.chat('mygear', 'Hello world.');
            }, 400);
        });

        this.microgear.on('message', (topic, body) => {
            // console.log('incoming : ' + topic + ' : ' + body);
            this.setState({msg: body});
        });

        this.microgear.on('closed', () => {
            console.log('Closed...');
        });

        this.microgear.on("error", (reason) => {
            console.log("reason = ", reason);
            this.setState({msg: reason});
        });
    }

    componentDidMount() {
        this.microgear.connect(this.APPID);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.dataText}>
                    {this.state.msg }
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    dataText: {
        fontSize: 80,
        textAlign: 'center',
    },
});

AppRegistry.registerComponent('netpie_react_native_demo', () => netpie_react_native_demo);
