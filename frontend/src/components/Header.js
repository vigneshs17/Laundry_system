import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Laundry System</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample02">
                    <NavLink to="/items" className="link" activeClassName="active" exact>
                        Items List
                    </NavLink>
                    <NavLink to="/users" className="link" activeClassName="active" exact>
                        Users List
                    </NavLink>
                    </div> 
                
            </nav>
        </header>
    );
};


export default Header;