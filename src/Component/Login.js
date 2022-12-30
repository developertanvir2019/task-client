import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Extra/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { signin, signInWithGoogle, loading, setLoading } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signin(email, password)
            .then(res => {
                setLoading(false)
                toast.success('Log in successFully..')
                navigate(from, { replace: true })
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })

    }


    const handleGoogle = () => {
        setLoading(true)
        signInWithGoogle()
            .then(result => {
                setLoading(false)
                toast.success('login successfully ..')
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message))
    }
    return (
        <div className="max-w-sm sm:w-full mx-auto my-6">
            <Card>
                <h2 className="text-3xl font-semibold text-center text-cyan-600">Log in</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            name='email'
                            id="email1"
                            type="email"
                            placeholder="name@flowbite.com"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            name='password'
                            id="password1"
                            type="password"
                            required={true}
                        />
                    </div>
                    <div className="gap-0">
                        <Label>Forget password?
                        </Label>
                    </div>
                    {
                        !loading ?
                            <Button gradientDuoTone="cyanToBlue" type="submit">
                                Login
                            </Button> :
                            <Button gradientDuoTone="cyanToBlue">
                                <Spinner aria-label="Spinner button example" />
                                <span className="pl-3">
                                    Loading...
                                </span>
                            </Button>
                    }
                </form>
                <h3 className="">Don't have an account? <Link className='text-cyan-500 font-bold' to='/signup'>Signup</Link></h3>
                <div>
                    <h5 className="text-center font-semibold">Or signup using</h5>
                    <div className='flex justify-center text-3xl py-2 text-cyan-500'>
                        <FaGoogle onClick={handleGoogle}></FaGoogle>
                        <FaFacebook className='mx-3'></FaFacebook>
                        <FaGithub></FaGithub>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Login;