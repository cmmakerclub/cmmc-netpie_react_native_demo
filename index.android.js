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

    APPID = "HelloNETPIE";
    KEY = "EAHSjdbQZMtDlJD";
    SECRET = "ZdsVsuu7EkBPrlnmJwO08Rjb9";
    gearPrefix = "/" + this.APPID + "/gearname";

    constructor() {
        super();
        this.state = {
            msg: 'Connecting..',
            temp: '?',
            humid: '?'
        };

        let microgear = MicroGear.create({
            key: this.KEY,
            secret: this.SECRET
        });

        microgear.on('connected', () => {
            console.log('Connected...');
            microgear.subscribe("/HelloNETPIE/gearname/weather/temp");
            microgear.subscribe("/HelloNETPIE/gearname/weather/humid");
        });

        microgear.on('message', (topic, body) => {
            // console.log("topic = ", topic, "body=", body);
            if (topic == "/HelloNETPIE/gearname/weather/temp") {
                this.setState({temp: body});
            }
            else if (topic == "/HelloNETPIE/gearname/weather/humid") {
                this.setState({humid: body});
            }
        });

        microgear.on('closed', () => {
            console.log('Closed...');
        });

        microgear.on("error", (reason) => {
            console.log("reason = ", reason);
            this.setState({msg: reason});
        });

        this.microgear = microgear;
    }

    componentDidMount() {
        this.microgear.connect(this.APPID);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.labelSensor}>Temp : { this.state.temp } C</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.labelSensor}>Humid : { this.state.humid } %</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    header: {
        flex: 5,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 5,
        //backgroundColor: 'blue',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    labelSensor: {
        fontSize: 30,
        fontWeight: '100'
    }
});

AppRegistry.registerComponent('netpie_react_native_demo', () => netpie_react_native_demo);
