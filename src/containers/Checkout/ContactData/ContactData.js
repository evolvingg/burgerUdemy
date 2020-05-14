import React from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from  './ContactData.module.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'tanvi',
                address: {
                    street: 'test',
                    zipcode: '800020',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axiosInstance.post('/orders.json',order)
            .then( response => {
                this.setState({ loading: false });
            } )
            .catch( error => {
                this.setState({ loading: false });
            } );
console.log('{}{}',this.props.ingredients);

    }
    render() {
        let form = (                <form>
            <input className={cssClasses.Input} type="text" name="name" placeholder="Your name" />
            <input className={cssClasses.Input} type="email" name="email" placeholder="Your mail" />
            <input className={cssClasses.Input} type="text" name="street" placeholder="Street" />
            <input className={cssClasses.Input} type="text" name="postalCode" placeholder="postal code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your ContactData</h4>
                {form}
            </div>

        );
    }
}

export default ContactData;