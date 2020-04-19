import React from 'react';
import cssClasses from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

//approach2 : backdrop in modal file itself

class Modal extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
        if( nextProps.show !== this.props.show  || nextProps.children !== this.props.children ) { //if using purecomponent then more checks would be run here
            return true;
        }
        return false;
    }

    componentDidUpdate(){
        console.log('modal update:::');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={cssClasses.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
};

export default Modal;