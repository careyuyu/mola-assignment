import React, { Component } from 'react';
import './navbar.css'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top ">
                <div className="mr-auto navbar-nav">
                    <a className="nav-link-class active" href='/'>New Questions</a>
                    <a className="nav-link-class" href='http://localhost:8080/submissions/download'><i className="bi bi-download"></i> Download Responses</a>
                </div>
                <div className="navbar-nav changeFloat justify-content-end">

                </div>
            </nav>
        );
    }
}