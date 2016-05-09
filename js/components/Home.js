import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectRoom} from '../actions/HomeActions';
import {requestInitialData} from './homeThunks';
import {Drawer, ListItem, List, Subheader, AppBar} from 'material-ui';

const styles = {
  makmar: {
    backgroundImage: "url('/resources/map.png')",
    backgroundSize: 'contain',
    height: '100vh',
    flex: '80',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  },
  room: ({locationOnMap, size}) => {
    return {
      backgroundColor: 'green',
      left: locationOnMap.x + 'px',
      top: locationOnMap.y + 'px',
      height: size.y + 'px !important',
      width: size.x + 'px !important',
      position: 'absolute',
      border: 'solid',
      cursor: 'pointer'
    }
  },
  itemList: {
  }
};

const Room = ({room, dispatch}) =>
    <div style={styles.room(room)} onClick={() => dispatch(selectRoom(room.id))}>
      <label>{room.name}</label>
    </div>

const Makmar = ({rooms, dispatch}) =>
  <div style={{display: 'flex'}}>
    <div style={{flex:20}}>
    </div>
    <div style={styles.makmar}>
      {rooms.map(room => <Room key={room.id} room={room} dispatch={dispatch}/>)}
    </div>
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
      <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
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
