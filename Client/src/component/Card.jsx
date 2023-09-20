import Button from "./Button";
import Loader from "./Loader";
import contact_image from "../images/contact.webp";
import { useEffect, useState } from "react";
import { getContact } from "../lib/fetcher";
import { Formik, Field, Form } from 'formik';

export default function Card({ id, onClose, onDelete }) {

    // data
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    function onEdit() {

        setEditing((prev) => prev === true ? false : true);

    }

    useEffect(() => {

        getContact(id).then(data => {

            setData(data[0]);
            setIsLoading(false);

        });

    }, [id, isLoading])

    const { name, title, bio, phone, email, level } = data;

    return (

        <div className="
            fixed flex top-0 left-0 bg-gray-200
            h-screen w-screen justify-center align-center
            fade-in px-4 z-50
        ">
            <div className="
                max-w-sm overflow-auto
                rounded pb-4 px-4 my-10
                bg-white flex flex-col
                slide-in-top-delay
            ">
                {isLoading ? <Loader></Loader> :
                    <div>

                        <div className="pt-3 flex justify-between items-center text-sm">
                            <div className="font-bold text-orange-600">
                                <div className="text-xl">LEVEL {level ?? "0"}</div>
                            </div>
                            <div className="flex items-center">
                                <Button handleClick={onDelete}>
                                    <i className="fa fa-trash text-red-600"></i>
                                </Button>
                                <Button handleClick={onEdit}>
                                    <i className="fa fa-pen"></i>
                                </Button>
                                <Button handleClick={onClose}>
                                    <i className="fa fa-close text-xl"></i>
                                </Button>
                            </div>
                        </div>

                        {editing ?
                            <Formik
                                initialValues={data}
                                onSubmit={(values) => {
                                    alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                <Form>

                                    <div className="text-center py-3">
                                        <Button type="button" handleClick={onEdit}>
                                            <i className="fa fa-cancel text-xl mr-3"></i>
                                            <span>Cancel</span>
                                        </Button>
                                        <Button type="submit">
                                            <i className="fa fa-arrow-up text-xl mr-3"></i>
                                            <span>Update</span>
                                        </Button>
                                    </div>

                                    <div className="my-2 text-center">
                                        <div className="flex justify-center">
                                            <div className="
                                                rounded-full overflow-hidden"
                                            >
                                                <img className="w-32" src={contact_image} alt="Contact Person" />
                                            </div>
                                        </div>
                                        <Field className="text-center w-full mt-3 mb-2 font-bold text-xl"
                                            name="name" placeholder="Person Name"
                                        />
                                        <Field className="text-center w-full" name="title" placeholder="Person Title" />
                                    </div>

                                    <div className="rounded flex-1 my-2 p-4 
                                        bg-gray-100 text-start">
                                        <div className="mb-2">
                                            <h3 className="text-l font-semibold">
                                                <i className="fa fa-info-circle text-orange-600"></i> Bio</h3>
                                            <Field className="w-full" name="bio" as="textarea" placeholder="Person Bio" />
                                        </div>
                                        <div className="mb-2">
                                            <h3 className="text-l font-semibold">
                                                <i className="fa fa-phone text-orange-600"></i> Phone
                                            </h3>
                                            <Field className="w-full" name="phone" placeholder="Person Phone" />
                                        </div>
                                        <div className="mb-2">
                                            <h3 className="text-l font-semibold">
                                                <i className="fa fa-envelope text-orange-600"></i> Email
                                            </h3>
                                            <Field className="w-full" name="email" placeholder="Person Email" />
                                        </div>
                                    </div>

                                </Form>
                            </Formik>
                            :
                            <div className="fade-in">
                                <div className="my-2 text-center">
                                    <div className="flex justify-center">
                                        <div className="
                                            rounded-full overflow-hidden
                                        ">
                                            <img className="w-32" src={contact_image} alt="Contact Person" />
                                        </div>
                                    </div>
                                    <h1 className="pt-3 font-bold text-xl">{name || "Person Name"}</h1>
                                    <div>{title || "Person title"}</div>
                                </div>
                                <div className="
                                    rounded flex-1 my-2 p-4 bg-gray-100 text-start
                                    overflow-auto
                                ">
                                    <div className="mb-2">
                                        <h3 className="text-l font-semibold">
                                            <i className="fa fa-info-circle text-orange-600"></i> Bio
                                        </h3>
                                        <p>{bio || "No Information Provided"}</p>
                                    </div>
                                    <div className="mb-2">
                                        <h3 className="text-l font-semibold">
                                            <i className="fa fa-phone text-orange-600"></i> Phone
                                        </h3>
                                        <p>{phone}</p>
                                    </div>
                                    <div className="mb-2">
                                        <h3 className="text-l font-semibold">
                                            <i className="fa fa-envelope text-orange-600"></i> Email
                                        </h3>
                                        <p>{email}</p>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>
        </div>

    )


}