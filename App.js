//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TextInput, AsyncStorage} from 'react-native';
import brain from './Brain.js'
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
const win = Dimensions.get('window');
const ratio = win.width/(333 * 0.7);
const input_width = win.width * 0.3;
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
export default class App extends Component<Props> {
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      tax: '0.06',
      tip: '0.20',
      result: ''
    }
    AsyncStorage.getItem('tax').then((value) => {
      if (value) {
        this.setState({'tax': value})
      }
    })
    AsyncStorage.getItem('tip').then((value) => {
      if (value) {
        this.setState({'tip': value})
      }
    })
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  calculate(the_amount) {
    if (the_amount === "") {
      this.setState({
        result: ""
      })
    } else {
      this.returnTip(the_amount)
    }
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  returnTaxe(the_amount) {
    return brain.getTaxes(the_amount, this.state.tax);
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  returnTaxePlusAmount(the_amount) {
    return brain.getTaxesPlusAmount(the_amount, this.state.tax);
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  returnTip(the_amount) {
    const the_tip = brain.getTip(the_amount, this.state.tip);
    this.setState({
      result: `$${(Number(this.returnTaxePlusAmount(the_amount)) + the_tip).toFixed(2)}`
    })
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  changeTaxesOrTip(key, value) {
    AsyncStorage.setItem(key, value);
    this.setState({
      amount: '',
      result: ''
    })
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./src/logo.png')}
        />
        <View style={[{flexDirection:'row'}]}>
          <Text style={styles.text_amount}>AMOUNT</Text>
            <TextInput
              style = {[styles.input]}
              placeholder = "AMOUNT"
              keyboardType = 'numeric'
              onChangeText = {
                (amount) => { 
                  this.setState({amount}), 
                  this.calculate(amount) 
                } 
              }
              value={this.state.amount}
              placeholderTextColor = 'rgba(0, 0, 0, 0.1)'
            />
        </View>
        <View style={[{flexDirection:'row'}]}>
          <Text style={styles.text_top_spacing}>TAXES</Text>
          <TextInput
            style = {[styles.input, styles.input_space]}
            keyboardType = 'numeric'
            onChangeText = {
              (tax) => {
                this.setState({tax}),
                this.changeTaxesOrTip('tax', tax)
              }
            }
            value={this.state.tax}
          />
        </View>
        <View style={[{flexDirection:'row'}]}>
          <Text style={styles.text_top_spacing}>TIP</Text>
          <TextInput
            style={[styles.input, styles.input_space]}
            keyboardType = 'numeric'
            onChangeText = {
              (tip) => {
                this.setState({tip}),
                this.changeTaxesOrTip('tip', tip)
              }
            }
            value={this.state.tip}
          />
        </View>
        <View style={[{flexDirection:'row'}]}>
          <Text style={styles.text_top_spacing}>RESULT</Text>
          <Text style={[styles.text_result, styles.input_space]}> 
            {this.state.result} 
          </Text>
        </View>
      </View>
    );
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    marginTop: 40,
    width: 150,
    height: 148,
    marginRight: win.width / 2 - 75,
    marginBottom: 30
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    width: input_width,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 10,
    marginRight: win.width / 2 - (input_width / 2)
  },
  input_space: {
    marginTop: 10
  },
  text_result: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    width: input_width,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#FF0000",
    marginLeft: 10,
    marginRight: win.width / 2 - (input_width / 2),
    lineHeight: 25
  },
  text_amount: {
    marginTop: 14
  },
  text_top_spacing: {
    marginTop: 21
  }
});
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬


















