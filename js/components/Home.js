import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectRoom, clearRoomsFilter, watchTravelingItems} from '../actions/HomeActions';
import {requestInitialData} from './homeThunks';
import {Drawer, ListItem, List, Subheader, FlatButton, Divider} from 'material-ui';
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
    left: '450',
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
  roomStateContainer: ({x,y}) => {
    return {
      position: 'absolute',
      marginLeft: (x / 2) + 'px',
      marginTop: (y / 3) + 'px'
    };
  },
  roomState: {
    marginRight: '4px',
    color: 'yellow',
    fontSize: '8px',
    transformOrigin: '50% 50%',
    animation: '0.5s ease-in',
    boxShadow: '1px 2px 3px 0px rgba(0,0,0,0.75)'
  },
  item: suspicious => {
    backgroundColor: 'red'
  },
  itemList: {
  },
  safe: {
  }
};

const Room = ({room, dispatch}) =>
    <div style={styles.room(room)} onClick={() => dispatch(selectRoom(room.id))}>
      {room.state === RoomState.HAS_ITEMS ? <div style={styles.roomStateContainer(room.size)}><Icon name="circle" style={styles.roomState} /></div> : null}
      <label>{room.name}</label>
    </div>

const Makmar = ({rooms, dispatch}) =>
  <div style={styles.makmar}>
    <img src="/resources/map.png" style={styles.makmarImage} />
    {rooms.map(room => <Room key={room.id} room={room} dispatch={dispatch}/>)}
  </div>

const Item = ({item}) =>
    <ListItem primaryText={item.name} style={styles.item(item.suspicious)}></ListItem>

const renderClearFilters = (roomsFilter, onClearFilters) => {
  if (roomsFilter) {
    return (
      <div>
        <ListItem onClick={onClearFilters}>Clear filters</ListItem>
        <Divider />
      </div>
    );
  }

  return null;
};

const ItemList = ({items, rooms, roomsFilter, dispatch}) =>
    <div style={styles.itemList}>
      <Drawer open={true}>
        <List>
          <Subheader>Items{roomsFilter ? " (Room " + roomsFilter + ")" : null}</Subheader>
          {renderClearFilters(roomsFilter, () => dispatch(clearRoomsFilter()))}
          {items.map(item => <Item key={item.id} item={item} dispatch={dispatch} />)}
        </List>
      </Drawer>
    </div>

const ItemsTraveling = ({items, dispatch}) =>
    <div style={styles.safe}>
      <Drawer open={true} openSecondary={true}>
        <List>
          <Subheader>Items traveling</Subheader>
          {items.map(item => <Item key={item.id} item={item} dispatch={dispatch} />)}
        </List>
      </Drawer>
    </div>

class Home extends React.Component {
  render() {
    const {rooms, items, roomsFilter, dispatch} = this.props;
    return (
      <div>
        <ItemList items={items.filter(item => roomsFilter ? item.roomId === roomsFilter : true)} rooms={rooms} roomsFilter={roomsFilter}
                  dispatch={dispatch}/>
        <Makmar rooms={rooms} dispatch={dispatch}/>
        <ItemsTraveling items={items.filter(item => item.roomId === "-1")} dispatch={dispatch} />
      </div>
    );
  }

  componentWillMount() {
    debugger;
    this.props.dispatch(requestInitialData());
    this.props.dispatch(watchTravelingItems());
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
