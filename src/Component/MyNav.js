import { Button, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../src/Extra/favicon-removebg-preview.png'
import { AuthContext } from '../Extra/AuthProvider';

const MyNav = () => {
    const { user, logout } = useContext(AuthContext);
    const handleLogOut = () => {
        logout()
    }
    return (
        <Navbar
            className='mx-5 lg:mr-32'
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="/">
                <img
                    src={img}
                    className="mr-3 h-6 sm:h-9"
                    alt="Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    My-Task
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Link
                    to="/"
                    active={true}
                >
                    Add Task
                </Link>
                <Link to="/mytask">
                    My Task
                </Link>
                <Link to="/completedtask">
                    Completed Tasks
                </Link>
                {
                    user?.uid ?
                        <Link onClick={handleLogOut}><Button gradientDuoTone="cyanToBlue">Sign Out</Button></Link> :
                        <Link to='/login'><Button gradientDuoTone="cyanToBlue">Log in</Button></Link>
                }
            </Navbar.Collapse>

        </Navbar>
    );
};

export default MyNav;