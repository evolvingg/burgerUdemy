import axios from 'axios';


const instance  = axios.create({
    baseURL: 'https://burger-menu-98a9d.firebaseio.com/'
});

export default instance;


//this url is where u want to send ur reuest to stor ur result in database