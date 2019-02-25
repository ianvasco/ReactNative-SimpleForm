import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from "../actions/index";
import { SearchBar } from 'react-native-elements';

import CustomRow from './CustomRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export class CustomListview extends React.PureComponent {
  constructor(){
    super();
    this.count = 1;
    this.temp = {};
    this.state = {
      seed: 1,
      page: 1,
      loading: false,
      error: null,
      githubLoaded: false,
      search:'',
      data:[]
    };
    //arrayholder for searching through SearchBar
    this.arrayholder = [];
    this.searchFilterFunction = this.searchFilterFunction.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }
  componentDidUpdate() {
    //validates its lenght for first fetching
    if(this.props.candidateGithub.length === this.count){
      this.props.fetchData(this.props.candidateGithub[this.count-1].githubUser)
      .then(state => {
        console.log('updated state:', state);
      })
      .catch(err => {
        console.log('an error occured');
      });
      this.count++;
    }
  }

  renderSeparator() {
    //line separator for each row
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader() {
    const { search } = this.state;
    return (
      <SearchBar
        placeholder="Nombre del repositorio"
        lightTheme
        round
        onChangeText={this.searchFilterFunction}
        autoCorrect={false}
        value={search}
      />
    );
  };

  searchFilterFunction = search => {
    this.setState({search});

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
       const textData = search.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });
    this.setState({ data: newData });
  };

  render(){
    if(this.props.githubData.length===0){
      return <View />
    }

    if(this.count===this.props.candidateGithub.length+1){

      if(!this.state.githubLoaded){
        for (var key in this.props.githubData) {
          // skip loop if the property is from prototype
          if (!this.props.githubData.hasOwnProperty(key)) continue;

          this.temp = this.props.githubData[key];
            for (var prop in this.temp) {
                // skip loop if the property is from prototype
                if(!this.temp.hasOwnProperty(prop)) continue;
                this.props.data.push({
                  "lenguaje":this.temp[prop].language, "branch":this.temp[prop].default_branch,
                  "url":this.temp[prop].url, "name":this.temp[prop].name,
                  "description":this.temp[prop].description
                });
                this.arrayholder = this.props.data;
                this.setState({githubLoaded:true});
            }
            this.setState({data: this.props.data});
        }
    }
      return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.url}
            renderItem={({ item }) =>
              <CustomRow
                nombre={item.name}
                descripcion={item.description}
                branch={item.branch}
                url={item.url}
                lenguaje={item.lenguaje}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          />
        </View>
        </SafeAreaView>
      );
    } else {
      return <View />
    }
  };
}

function mapStateToProps(state) {
  return {
    candidateGithub: state.data.candidateForm,
    githubData: state.data.githubData,
    data: state.data.data
  };
}

export default connect(
  mapStateToProps,
  { fetchData }
)(CustomListview);
