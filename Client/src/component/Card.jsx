import Button from "./Button";
import Loader from "./Loader";
import contact_image from "../images/contact.jpeg";
import { useEffect, useState } from "react";
import { getContact, updateContact } from "../lib/fetcher";
import { Formik, Field, Form } from 'formik';

export default function Card({ _id, onClose, onDelete, toast, className }) {

  // data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  function onEdit() {

    setEditing((prev) => prev === true ? false : true);

  }

  useEffect(() => {

    getContact(_id).then(data => {

      setData(data || []);
      setIsLoading(false);

      if (data.status === "failed") {

        toast("error", data.err.toString());

      }

    });

  }, [_id, toast, isLoading])

  const { name, title, bio, phone, email, level, locked } = data;

  return (

    <div className={`
      fixed flex top-0 left-0 bg-gray-200
      h-screen w-screen justify-center align-center
      px-4 z-30
    `}>
      <div className={`
        w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 overflow-auto
        rounded pb-4 px-4 my-10
        bg-white flex flex-col ${className}
      `}>
        {isLoading ? <div><Loader className="text-3xl text-orange-600 my-4"></Loader></div> :
          <div>
            {editing ?
              <Formik
                initialValues={data}
                onSubmit={async (values) => {

                  setUpdating(true);

                  updateContact(values).then((data) => {

                    setUpdating(false);
                    setEditing(false);
                    setIsLoading(true);

                    if (data.status === "failed") {

                      toast("error", data.err.toString());

                    } else {

                      toast("success", "A contact has been updated successfully!");

                    }

                  });

                }}
              >
                <Form className={updating ? "animate-pulse" : ""}>

                  <div className="pt-3 flex justify-between items-center text-sm">
                    <div className="font-bold text-orange-600">
                      <div className="text-xl">
                        LEVEL
                        <Field className="ml-2 w-16 font-bold"
                          name="level" placeholder="1" type="number" min="1"
                          disabled={ locked ? "disabled" : "" }
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      {!locked ? 
                        <Button handleClick={onDelete}>
                          <i className="fa fa-trash text-red-600"></i>
                        </Button>
                        : <></>
                      }
                      <Button handleClick={onEdit}>
                        <i className="fa fa-pen"></i>
                      </Button> 
                      <Button handleClick={onClose}>
                        <i className="fa fa-close text-xl"></i>
                      </Button>
                    </div>
                  </div>

                  <div className="text-center py-3">
                    <Button type="button" handleClick={onEdit} 
                    className="bg-gray-500 text-white mr-3 text-sm">
                      <i className="fa fa-cancel mr-3"></i>
                      <span>Cancel</span>
                    </Button>
                    <Button type="submit" className="bg-orange-500 text-white text-sm" >
                      {updating ? <Loader className="mr-3"></Loader> :
                        <i className="fa fa-arrow-up mr-3"></i>
                      }
                      <span>Update</span>
                    </Button>
                  </div>

                  <div className="my-2 text-center">
                    <div className="flex justify-center">
                      <div className="rounded-full overflow-hidden">
                        <img className="w-32" src={contact_image} alt="Contact Person" />
                      </div>
                    </div>
                    <Field className="text-center w-full mt-3 mb-2 font-bold text-xl"
                      name="name" placeholder="Person Name"
                    />
                    <Field className="text-center w-full" name="title" placeholder="Person Title" />
                  </div>

                  <div className="rounded flex-1 my-2 p-4 bg-gray-100 text-start">
                    <div className="mb-2">
                      <h3 className="text-l font-semibold">
                        <i className="fa fa-info-circle text-orange-600"></i> Bio</h3>
                      <Field className="w-full bg-transparent my-2" name="bio" as="textarea" placeholder="Person Bio" />
                    </div>
                    <div className="mb-2">
                      <h3 className="text-l font-semibold">
                        <i className="fa fa-phone text-orange-600"></i> Phone
                      </h3>
                      <Field className="w-full bg-transparent my-2" name="phone" placeholder="Person Phone" />
                    </div>
                    <div className="mb-2">
                      <h3 className="text-l font-semibold">
                        <i className="fa fa-envelope text-orange-600"></i> Email
                      </h3>
                      <Field className="w-full bg-transparent my-2" name="email" placeholder="Person Email" />
                    </div>
                  </div>

                </Form>
              </Formik>

              :
              
              <div className="fade-in">
                <div className="pt-3 flex justify-between items-center text-sm">
                    <div className="font-bold text-orange-600">
                      <div className="text-xl">
                        LEVEL {level ?? 1}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {!locked ? 
                        <Button handleClick={onDelete}>
                          <i className="fa fa-trash text-red-600"></i>
                        </Button>
                        : <></>
                      }
                      <Button handleClick={onEdit}>
                            <i className="fa fa-pen"></i>
                          </Button>
                      <Button handleClick={onClose}>
                        <i className="fa fa-close text-xl"></i>
                      </Button>
                    </div>
                  </div>
                <div className="my-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full overflow-hidden">
                      <img className="w-32" src={contact_image} alt="Contact Person" />
                    </div>
                  </div>
                  <h1 className="pt-3 font-bold text-xl">{name || "Person Name"}</h1>
                  <div>{title || "Person title"}</div>
                </div>
                <div className="
                  rounded flex-1 my-2 p-4 bg-gray-100 
                  text-start overflow-auto
                ">
                  <div className="mb-2">
                    <h3 className="text-l font-semibold">
                      <i className="fa fa-info-circle text-orange-600"></i> Bio
                    </h3>
                    <p className="py-2">{bio || "No Information Provided"}</p>
                  </div>
                  <div className="mb-2">
                    <h3 className="text-l font-semibold">
                      <i className="fa fa-phone text-orange-600"></i> Phone
                    </h3>
                    <p className="py-2">{phone}</p>
                  </div>
                  <div className="mb-2">
                    <h3 className="text-l font-semibold">
                      <i className="fa fa-envelope text-orange-600"></i> Email
                    </h3>
                    <p className="py-2">{email}</p>
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