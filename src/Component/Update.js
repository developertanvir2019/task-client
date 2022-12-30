import { Button, Card, Label, Textarea, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';

const Update = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState({})
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://task-server-sandy.vercel.app/edit/${id}`)
            .then(res => res.json())
            .then(data => setData(data[0]))
    }, [id])
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const tasks = {
            task: form.task.value,
            date: form.date.value,
            details: form.taskDetails.value,
        }
        fetch(`https://task-server-sandy.vercel.app/task/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tasks)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('updated successfully')
                    navigate('/mytask')
                }
            })
    }
    return (
        <div>
            <div className="max-w-sm mx-auto mt-5">
                <Card>
                    <h3 className="text-4xl text-center text-cyan-400 py-3">Update your task</h3>
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email1"
                                    value="Your task title"
                                />
                            </div>
                            <TextInput
                                id="email1"
                                type="text"
                                defaultValue={data?.task}
                                required={true}
                                name='task'
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email2"
                                    value="Task details"
                                />
                            </div>
                            <Textarea
                                id="email2"
                                type="text"
                                defaultValue={data?.details}
                                required={true}
                                name='taskDetails'
                            />
                        </div>
                        <DatePicker name='date' selected={startDate} dateFormat="PP" onChange={(date) => setStartDate(date)} />
                        <Button gradientDuoTone="cyanToBlue" className='mt-4' type="submit">
                            Update Task
                        </Button>
                    </Form>
                </Card>
            </div>




        </div>
    );
};

export default Update;