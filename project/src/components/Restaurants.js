import React, { Component } from 'react'
import axios from 'axios'
import { ref } from '../config/constants'
import FavoriteButton from './FavoriteButton'
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
      <FavoriteButton restaurant={restaurant} />
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

  addEntry() {
    var postsRef = ref.child("posts");

    var newPostRef = postsRef.push();
    newPostRef.set({
      author: "gracehop",
      title: "Announcing COBOL, a New Programming Language"
    });
  }

  render () {
    return (
      <div>
        <RestaurantList restaurantItems={this.state.restaurants} />
        <Favorites />
      </div>
    )
  }
}

