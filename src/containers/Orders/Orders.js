import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    };
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                this.setState({loading: false});
                const fetchData = [];
                for(let i in res.data) {
                    fetchData.push({...res.data[i],id:i});
                }
                this.setState({orders: fetchData});                console.log(res.data,fetchData);
            })
            .catch((err) => {
                this.setState({loading: false})
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map((item,index) => {
                    return <Order key={item.id} {...item} />
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);