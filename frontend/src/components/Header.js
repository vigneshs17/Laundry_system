import React, {useState} from 'react';
import {Navbar, NavbarBrand, Button, NavItem, Nav} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import './Header.css';
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
                    <NavbarBrand className="nav-brand" href="/">Laundry System</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/items"><Button className="btn btn-header" color="primary">Items</Button></NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/invoices"><Button className="btn btn-header" color="primary">Invoices</Button></NavLink>
                        </NavItem>
                        
                    </Nav> 
                    
                </Navbar>
            </div>
        );
    }
};


export default Header;