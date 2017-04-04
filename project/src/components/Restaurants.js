import React, { Component } from 'react'
import axios from 'axios'

function RestaurantList(props) {
  const restaurants = props.restaurantItems;
  const restaurantItems = restaurants.map((restaurant) =>
    <li>
      <img src={restaurant.image_url} />  
      <a href={restaurant.url}><h2>{restaurant.name}</h2></a>
      <span>{restaurant.rating}</span>
      <span>{restaurant.review_count}</span>
      <span>{restaurant.price}</span>
    </li>
  );
  return (
    <ul>{restaurantItems}</ul>
  )
}

export default class Restaurants extends Component {
  constructor(props) {
    super(props)

    this.state = { restaurants: [] }
  }

  componentDidMount() {
    this.getLocation()
  }

  getRestaurants(position) {
    axios.post('/api/yelp', {
      position: position
    })
      .then(function(response){
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
      console.log(pos)
      self.getRestaurants(pos);
      }, function() {
        handleLocationError(true);
      });
    } else {
      handleLocationError(false);
    }

    function handleLocationError(browserHasGeolocation) {
      browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.';
    }

  }

  render () {
    return (
      <div>
        <RestaurantList restaurantItems={this.state.restaurants} />
      </div>
    )
  }
}

