import React from 'react';
import Aux from '../../hoc/Aux';
import cssClasses from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidedrawer : false
        }
    }

    closeHandler = () => {
        this.setState({showSidedrawer: false})
    }

    toggleButton = () => {
        this.setState((prevState)=> {
            return {showSidedrawer : !prevState.showSidedrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleButton={this.toggleButton}/>
                { <SideDrawer closed={this.closeHandler} open={this.state.showSidedrawer}/>}
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;