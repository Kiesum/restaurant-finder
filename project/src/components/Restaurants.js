import React, { Component } from 'react'
import axios from 'axios'
import { ref } from '../config/constants'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import AddRemoveButton from './AddRemoveButton'
import Favorites from './Favorites'


function RestaurantList(props) {
  const restaurants = props.restaurantItems;
  const restaurantItems = restaurants.map((restaurant) =>
    <li>
      <img src={restaurant.image_url} />  
      <a href={restaurant.url}><h2>{restaurant.name}</h2></a>
      <span>{restaurant.rating}</span>
      <span>{restaurant.review_count}</span>
      <span>{restaurant.price}</span>
      <AddRemoveButton restaurant={restaurant} />
    </li>
  );
  return (
    <ul>{restaurantItems}</ul>
  )
}

function setErrorMsg(error) {
  return {
    geolocationError: error.message,
    isLoading: false
  }
}

export default class Restaurants extends Component {
  constructor(props) {
    super(props)

    this.state = { restaurants: [],
                    isLoading: true,
                    geolocationError: null }
  }

  componentDidMount() {
    this.getLocation()
  }

  getRestaurants(position) {
    axios.post('/api/yelp', {
      position: position
    })
      .then(function(response){
        this.setState({ isLoading: false })
        const restaurants = response.data.businesses;
        this.setState({ restaurants: restaurants })
      }.bind(this)); 
  }

  getLocation() {
    var self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      self.getRestaurants(pos);
      }, function() {
        handleLocationError(true);
      });
    } else {
      handleLocationError(false);
    }

    function handleLocationError(browserHasGeolocation) {
      browserHasGeolocation ? self.setState(setErrorMsg({ message: 'Error: The Geolocation service failed.' })) : self.setState(setErrorMsg({ message: 'Error: Your browser doesn\'t support geolocation.' }));
    }
  }

  render () {
    return (
      <Tabs
        onSelect={this.handleSelect}
      >
        <TabList>
          <Tab>Restaurants</Tab>
          <Tab>Favorites</Tab>
        </TabList>
        <TabPanel>
          { this.state.isLoading ? <div className="loader-container"><div className="loader"></div><p>Loading restaurants near you</p></div> : null }
          <RestaurantList restaurantItems={this.state.restaurants} />
          {
            this.state.geolocationError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              &nbsp;{this.state.geolocationError}
            </div>
          }
        </TabPanel>
        <TabPanel>
          <Favorites />
        </TabPanel>
      </Tabs>
    )
  }
}

