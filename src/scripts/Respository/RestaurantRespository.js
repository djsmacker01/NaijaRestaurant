
import { Restaurant } from '../models/Restaurant.js';
import { cuisine } from '../models/cuisine.js';


export class RestaurantRespository {
  constructor() {
    this.restaurants = [
      new Restaurant(1, 'Max_Food', 'Lagos', cuisine.lagos),
      new Restaurant(2, 'Mr Chef', 'Ibadan', cuisine.kano),
      new Restaurant(3, 'Iya Rainbow', 'Lagos', cuisine.lagos),
      new Restaurant(4, 'Chi-Chi', 'Imo', cuisine.imo),
      new Restaurant(5, 'Luka-Cateen', 'Jos', cuisine.jos)
    ];
     

  }

 
  get RestaurantRespository() {
    return this.restaurants;
  }

  set setRestaurants(res) {
    this.restaurants.push(res);
  }
}