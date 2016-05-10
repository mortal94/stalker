import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectRoom} from '../actions/HomeActions';
import {requestInitialData} from './homeThunks';
import {Drawer, ListItem, List, Subheader, AppBar} from 'material-ui';
import {Icon} from 'react-fa'
var R = require('ramda');

const RoomState = {
  EMPTY: 0,
  HAS_ITEMS: 1
};

const styles = {
  makmar: {
    position: 'relative'
  },
  makmarImage: {
    position: 'absolute',
    left: '550px',
    top: '125px',
    width: '1000px'
  },
  room: ({locationOnMap, size}) => {
    return {
      left: locationOnMap.x + 'px',
      top: locationOnMap.y + 'px',
      lineHeight: size.y + 'px',
      color: 'whitesmoke',
      textAlign: 'center',
      height: size.y + 'px',
      width: size.x + 'px',
      position: 'absolute',
      cursor: 'pointer'
    }
  },
  roomState: {
    marginRight: '4px'
  },
  itemList: {
  }
};

const Room = ({room, dispatch}) =>
    <div style={styles.room(room)} onClick={() => dispatch(selectRoom(room.id))}>
      {room.state === RoomState.HAS_ITEMS ? <Icon name="exclamation-circle" style={styles.roomState} /> : null}
      <label>{room.name}</label>
    </div>

const Makmar = ({rooms, dispatch}) =>
  <div style={styles.makmar}>
    <img src="/resources/map.png" style={styles.makmarImage} />
    {rooms.map(room => <Room key={room.id} room={room} dispatch={dispatch}/>)}
  </div>

const Item = ({item, room}) =>
    <ListItem primaryText={item.name}></ListItem>

function getRoomById(rooms, roomId) {
  return rooms.find(room => room.id === roomId);
}

const ItemList = ({items, rooms, roomsFilter, dispatch}) =>
    <div style={styles.itemList}>
      <Drawer open={true}>
        <List>
          <Subheader>Items</Subheader>
          {items.map(item => <Item key={item.id} item={item} room={getRoomById(rooms, item.roomId)} dispatch={dispatch} />)}
        </List>
      </Drawer>
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

export default connect(state => {
  return {
    ...state.Home,
    rooms: state.Home.rooms.map(room => {
      return {
        ...room,
        state: R.any(item => item.roomId === room.id)(state.Home.items) ? RoomState.HAS_ITEMS : RoomState.EMPTY
      };
    })
  };
})(Home)
