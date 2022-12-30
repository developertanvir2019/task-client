import { Button, Card, FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Extra/AuthProvider';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const password = form.password.value;
        const email = form.email.value;
        //for upload image in imgBb and save firebase user...
        const formData = new FormData()
        formData.append('image', image)
        console.log(formData);

        const url = `https://api.imgbb.com/1/upload?key=8361c702450c4d4223bcf02628cc126f`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                createUser(email, password)
                    .then(result => {
                        updateUserProfile(name, data.data.display_url)
                            .then(() => {
                                setLoading(false)
                                toast.success('login successfully ..')
                                navigate(from, { replace: true });
                            })
                        console.log(result)
                    })
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
        <div className="max-w-sm mx-auto my-6">
            <Card>
                <h2 className="text-3xl font-semibold text-center text-cyan-600">Sign UP</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="text"
                                value="Your Name"
                            />
                        </div>
                        <TextInput
                            name='name'
                            id="text"
                            type="text"
                        />
                    </div>
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
                    <div id="fileUpload">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="file"
                                value="Upload file"
                            />
                        </div>
                        <FileInput
                            id="file"
                            required={true}
                            name='image'
                        />
                    </div>
                    {
                        !loading ?
                            <Button gradientDuoTone="cyanToBlue" type="submit">
                                SignUp
                            </Button> :
                            <Button gradientDuoTone="cyanToBlue">
                                <Spinner aria-label="Spinner button example" />
                                <span className="pl-3">
                                    Loading...
                                </span>
                            </Button>
                    }
                </form>
                <h3 className="">Already have an account? <Link className='text-cyan-500 font-bold' to='/login'>Login</Link></h3>
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

export default Signup;