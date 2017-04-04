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
    axios.get('/api/yelp')
      .then(function(response){
        console.log(response);
        const restaurants = response.data.businesses;
        this.setState({ restaurants: restaurants })
      }.bind(this));  
  }

  render () {
    return (
      <div>
        <RestaurantList restaurantItems={this.state.restaurants} />
      </div>
    )
  }
}

