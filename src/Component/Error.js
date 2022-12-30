import { Button } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Extra/AuthProvider';

const Error = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className='flex justify-center items-center bg-black w-full h-screen'>
            <div>
                <h1 className='text-white text-8xl'>4<span className='text-red-500'>0</span>4</h1>
                <h3 className='text-white my-3 text-4xl'>page is not found</h3>
                <Link to={'/'}><Button color="purple">Go to home</Button></Link>

            </div>
        </div>
    );
};

export default Error;