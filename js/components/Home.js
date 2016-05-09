import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectRoom} from '../actions/HomeActions';
import {requestInitialData} from './homeThunks';

const styles = {
  makmar: {
    backgroundImage: "url('/resources/map.png')",
    height: '100vh',
    width: '70%',
    backgroundRepeat: 'no-repeat'
  },
  room: ({locationOnMap, size}) => {
    return {
      marginLeft: locationOnMap.x + 'px',
      marginTop: locationOnMap.y + 'px',
      height: size.y + 'px',
      width: size.x + 'px',
      position: 'absolute'
    }
  },
  itemList: {
    right: 0,
    top: 0,
    position: 'absolute',
    width: '30%'
  }
};

const Room = ({room, dispatch}) =>
    <div>
      <button style={styles.room(room)} onClick={() => dispatch(selectRoom(room.id))}>{room.name}</button>
    </div>

const Makmar = ({rooms, dispatch}) =>
  <div style={styles.makmar}>
    {rooms.map(room => <Room key={room.id} room={room} dispatch={dispatch}/>)}
  </div>

const Item = ({item, room}) =>
    <li>{item.name}: {room.name}</li>

function getRoomById(rooms, roomId) {
  return rooms.find(room => room.id === roomId);
}

const ItemList = ({items, rooms, roomsFilter, dispatch}) =>
    <div style={styles.itemList}>
      {items.map(item => <Item key={item.id} item={item} room={getRoomById(rooms, item.roomId)} dispatch={dispatch} />)}
    </div>

class Home extends React.Component {
  render() {
    const {rooms, items, roomsFilter, dispatch} = this.props;
    return <div>
      <Makmar rooms={rooms} dispatch={dispatch}/>
      <ItemList items={items.filter(item => roomsFilter ? item.roomId === roomsFilter : true)} rooms={rooms}
                dispatch={dispatch}/>
    </div>
  }

  componentWillMount() {
    requestInitialData(this.props.dispatch);
  }
}

export default connect(state => state.Home)(Home)
