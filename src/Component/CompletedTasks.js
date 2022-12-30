import { Button, Card } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Extra/AuthProvider';

const CompletedTasks = () => {
    const [refresh, setRefresh] = useState(true)

    const handleDelete = (id) => {
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
    const handleNotComplete = id => {
        const update = {
            status: 'UnCompleted'
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
                toast.success('task is not completed')
                setRefresh(!refresh)
            })
    }

    const { user } = useContext(AuthContext);
    const [completedTask, setCompletedTask] = useState([])
    useEffect(() => {
        fetch(`https://task-server-developertanvir2019.vercel.app/my-task?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setCompletedTask(data)
            })
    }, [refresh])
    return (
        <div>
            <h1 className="text-4xl font-semibold text-cyan-500 text-center py-5">My complete task</h1>
            <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {
                    completedTask.filter(data => data?.status === 'completed').map(completedTask => (
                        <div key={completedTask._id} className="max-w-sm">
                            <Card
                                imgAlt="image"
                                imgSrc={completedTask?.img}
                            >
                                <small>{completedTask?.date}</small>
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {completedTask?.task}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {completedTask?.details}
                                </p>
                                <div className='flex'>
                                    <Button onClick={() => handleDelete(completedTask?._id)} className='mx-2' gradientDuoTone="cyanToBlue">Delete</Button>
                                    <Button onClick={() => handleNotComplete(completedTask?._id)} gradientDuoTone="cyanToBlue">Not Completed</Button>
                                </div>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CompletedTasks;