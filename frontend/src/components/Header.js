import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="navbar navbar-expand navbar-light bg-light">
                <a className="navbar-brand" href="/">Laundry System</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/items" className="link">
                            Items List
                        </NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink to="/users" className="link">
                            Users List
                        </NavLink>
                    </li>
                </ul>
                    </div> 
                
            </div>
        </header>
    );
};


export default Header;