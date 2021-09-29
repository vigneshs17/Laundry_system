import React, {useState} from 'react';
import {Navbar, NavbarBrand, Button, NavItem, Nav} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';

class Header extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.state.isOpen = !this.state.isOpen;
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Laundry System</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/items">Items</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/invoices">Invoices</NavLink>
                        </NavItem>
                        
                    </Nav> 
                    
                </Navbar>
            </div>
        );
    }
};


export default Header;