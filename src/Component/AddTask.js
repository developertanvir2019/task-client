import { Button, Card, FileInput, Label, Spinner, Textarea, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../Extra/AuthProvider';
import { toast } from 'react-hot-toast';

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const image = form.image.files[0];
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=8361c702450c4d4223bcf02628cc126f`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {

                const tasks = {
                    task: form.task.value,
                    img: data?.data?.display_url,
                    date: form.date.value,
                    details: form.taskDetails.value,
                    userMail: user?.email,
                }

                fetch('https://task-server-developertanvir2019.vercel.app/tasks', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(tasks)
                }).then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            toast.success('task added successfully')
                            setLoading(false)
                            form.reset();
                        }
                        else {
                            toast.error(data.error)
                        }
                    })
                    .catch(err => {
                        toast.error(err.message)
                    })

            })


    };

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <div className="max-w-sm mx-auto mt-5">
                <Card>
                    <h3 className="text-4xl text-center text-cyan-400 py-3">Please Add you task</h3>
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
                                placeholder="your task"
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
                                placeholder=" please write your task details"
                                required={true}
                                name='taskDetails'
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
                        <DatePicker name='date' selected={startDate} dateFormat="PP" onChange={(date) => setStartDate(date)} />
                        {
                            !loading ?
                                <Button gradientDuoTone="cyanToBlue" className='mt-4' type="submit">
                                    Add Task
                                </Button> :
                                <Button gradientDuoTone="cyanToBlue">
                                    <Spinner aria-label="Spinner button example" />
                                    <span className="pl-3">
                                        Loading...
                                    </span>
                                </Button>
                        }
                    </Form>
                </Card>
            </div>




        </div>
    );
};

export default AddTask;