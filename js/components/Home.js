import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import * as HomeActions from '../actions/HomeActions';
import styles from '../../css/app.css';

const Makmar = ({rooms}) =>
  <img src="/resources/map.png" />
;

class Home extends Component {
  render() {
    const {rooms, dispatch} = this.props;
    return (
      <main className={styles.main}>
        <Makmar rooms={rooms} />
      </main>
    );
  }
}

export default connect(state => state.Home.makmar)(Home)
