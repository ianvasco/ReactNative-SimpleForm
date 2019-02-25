import React , { Component } from 'react';
import Expo, {AppLoading, Font} from 'expo';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';
import { addForm } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addForm: form => dispatch(addForm(form))
  };
}

  const validate = values => {
    const error= {};
    error.nombre= '';
    error.apellido= '';
    error.cedula='';
    error.fechaNacimiento='';
    error.email='';
    error.githubUser='';

    var nom = values.nombre;
    var apell = values.apellido;
    var ced = values.cedula;
    var fn = values.fechaNacimiento;
    var ema = values.email;
    var ghuser = values.githubUser;

    var birthdate_regex = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19\d{2}|200\d{1})$/ ;


    if(values.nombre === undefined){
      nom = '';
    }
    if(values.apellido === undefined){
      apell = '';
    }
    if(values.cedula === undefined){
      ced = '';
    }
    if(values.fechaNacimiento === undefined){
      fn = '';
    }
    if(values.email === undefined){
      ema = '';
    }
    if(values.githubUser === undefined){
      ghuser = '';
    }
    if(ema.length < 8 && ema !== ''){
      error.email= 'Muy corto';
    }
    if(!ema.includes('@') && ema !== ''){
      error.email= '@ no incluido';
    }
    if(isNaN(ced)){
      error.cedula='Campo numérico';
    }
    if(nom.length > 30){
      error.nombre= 'max 30 caracteres';
    }
    if(apell.length > 25){
      error.apellido= 'max 25 caracteres';
    }
    if(ced.length > 10){
      error.cedula= 'max 10 caracteres';
    }
    if(ced.length < 7 && ced !== ''){
      error.cedula= 'min 7 caracteres';
    }
    if(!(birthdate_regex.test(fn)) && fn !== '')
    {
      error.fechaNacimiento='formato incorrecto';
    }
    return error;
  };

class ConnectedForm extends Component {
  constructor(props){
    super(props);
    this.error=false;
    this.state={
      isReady: false,
      nombre: "",
      apellido: "",
      cedula: "",
      fechaNacimiento: "",
      email: "",
      githubUser: "",
      showComponent: true
    };
    this.renderInput = this.renderInput.bind(this);
    this._onPressButton = this._onPressButton.bind(this);
  }

  async componentWillMount() {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady: true});
    }
  renderInput({ input, label, type, meta: { touched, error, warning } }){
    var hasError= false;
    this.error=false;
    if(error !== undefined){
      hasError= true;
      this.error=true;
    };
    var state = {};
    state[input.name] = input.value;
    this.setState(state);
    return(
      <Item error= {hasError}>
      <View>
        <Text style={{color:'darkseagreen', fontWeight: 'bold'}}>{label}</Text>
      </View>
        <Input {...input} placeholder={label==="Fecha de Nacimiento"?"DD-MM-YYYY":label}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    );
  }
  _onPressButton(event) {
    event.preventDefault();
    const { nombre, apellido, cedula, fechaNacimiento, email, githubUser } = this.state;
    if(this.error === false && nombre !== '' && apellido !== '' && cedula !== '' && fechaNacimiento !== ''
        && email !== '' && githubUser !== ''){
      this.props.addForm({nombre, apellido, cedula, fechaNacimiento, email, githubUser});
      this.setState({showComponent:false});
    }
    else {
    this.setState({nombre: "",
    apellido: "",
    cedula: "",
    fechaNacimiento: "",
    email: "",
    githubUser: ""})
    }

  }
  render(){
     const { handleSubmit, reset } = this.props;
     if (!this.state.isReady || !this.state.showComponent) {
      return <AppLoading />;
    } if (this.state.showComponent){
    return (
      <Container>
        <Header>
          <Body>
            <Title>Formulario GitHub</Title>
          </Body>
        </Header>
        <Content padder>
          <Field name="nombre"
           component={this.renderInput}
           label="Nombre(s)"
           />
          <Field name="apellido"
           component={this.renderInput}
           label="Apellido(s)"
           />
          <Field name="cedula"
          component={this.renderInput}
          label="Cédula"
          />
          <Field name="fechaNacimiento"
          component={this.renderInput}
          label="Fecha de Nacimiento"
          />
          <Field name="email"
          component={this.renderInput}
          label="Email"
          />
          <Field name="githubUser"
           component={this.renderInput}
           label="Usuario GitHub"
           />

          <Button  block success
          onPress= {this._onPressButton}
          style={{backgroundColor: 'darkseagreen', marginTop:10, marginBottom: 10}}>
            <Text>Enviar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export {Form};

export default reduxForm({
  form: 'test',
  validate
})(Form);
