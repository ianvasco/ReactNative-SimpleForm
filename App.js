import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import {Provider} from 'react-redux';
import Form from './components/Form';
import CustomListview from './components/CustomListview';
import store from './store';



export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <Form />
          <CustomListview />
      </Provider>
    );
  }
}
