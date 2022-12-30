import { Button, Card, Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Extra/AuthProvider';

const MyTask = () => {
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const { user } = useContext(AuthContext)
    const [alltask, setTask] = useState([])
    useEffect(() => {
        fetch(`https://task-server-developertanvir2019.vercel.app/my-task?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setTask(data)
            })
    }, [refresh])

    const handleDelete = id => {
        fetch(`https://task-server-sandy.vercel.app/my-task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete successfully')
                    setRefresh(!refresh)
                }
            })
    }

    const handleComplete = id => {
        const update = {
            status: 'completed'
        }
        fetch(`https://task-server-sandy.vercel.app/completed/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('task completed')
            })
    }


    return (
        <div className='mx-3'>
            <h2 className="text-4xl text-center text-cyan-500 font-semibold py-4">My All Task</h2>
            {
                loading &&
                <div className='flex justify-center mt-3'>
                    <Spinner
                        aria-label="Large spinner example"
                        size="lg"
                    />
                </div>
            }
            <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {
                    alltask.map(tas =>
                        <div className="max-w-sm">
                            <Card
                                imgAlt="image"
                                imgSrc={tas?.img}
                            >
                                <small>{tas?.date}</small>
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {tas?.task}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {tas?.details}
                                </p>
                                <div className='flex'>
                                    <Link to={`/edit/${tas._id}`}><Button gradientDuoTone="cyanToBlue">Update</Button></Link>
                                    <Button onClick={() => handleDelete(tas?._id)} className='mx-2' gradientDuoTone="cyanToBlue">Delete</Button>
                                    <Button onClick={() => handleComplete(tas?._id)} gradientDuoTone="cyanToBlue">Completed</Button>
                                </div>
                            </Card>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyTask;