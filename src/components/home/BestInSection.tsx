import React from 'react'
import RestaurantCard from '../cards/RestaurantCard'

const BestInSection = () => {
    const [restaurants, setRestaurants] = React.useState([
        {
            name: 'Restaurant 1',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            rating: 4.5,
            address: '123 Main St, City',
            category: 'Italian',
            isOpen: true,
            id: '1'
        },
        {
            name: 'Restaurant 2',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            rating: 4.0,
            address: '456 Elm St, City',
            category: 'Chinese',
            isOpen: false,
            id: '2'
        },
        {
            name: 'Restaurant 3',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            rating: 4.2,
            address: '789 Oak St, City',
            category: 'Mexican',
            isOpen: true,
            id: '3'
        },
        {
            name: 'Restaurant 4',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            rating: 4.7,
            address: '321 Pine St, City',
            category: 'Indian',
            isOpen: true,
            id: '4'
        },
        {
            name: 'Restaurant 5',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            rating: 4.1,
            address: '654 Maple St, City',
            category: 'Thai',
            isOpen: false,
            id: '5'
        },
        {
            name: 'Restaurant 6',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            rating: 4.6,
            address: '987 Birch St, City',
            category: 'Japanese',
            isOpen: true,
            id: '6'
        }
    ]);

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='text-center mb-12'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Best Restaurants in Rabat</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover the top-rated restaurants in Rabat, offering a variety of cuisines and exceptional dining experiences. Whether you're craving Italian, Chinese, or Japanese, we've got you covered!
                </p>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        id={restaurant.id}
                        name={restaurant.name}
                        address={restaurant.address}
                        rating={restaurant.rating}
                        category={restaurant.category}
                        isOpen={restaurant.isOpen}
                        imageUrl={restaurant.imageUrl}
                    />
                ))}
            </div>
            
            <div className='text-center mt-12'>
                <button className='btn-primary'>
                    View All Restaurants
                </button>
            </div>
        </div>
    )
}

export default BestInSection