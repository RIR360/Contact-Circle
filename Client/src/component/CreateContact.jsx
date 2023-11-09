import Button from "./Button";
import Loader from "./Loader";
import contact_image from "../images/contact.jpeg";
import { useState } from "react";
import { uploadContact } from "../lib/fetcher";
import { Formik, Field, Form } from 'formik';

export default function CreateContact({ ownerCreating, onClose, toast, className }) {

  // data
  const [uploading, setuploading] = useState(false);

  return (

    <div className={`
      fixed flex top-0 left-0 bg-gray-200
      h-screen w-screen justify-center align-center
      px-4 z-50
    `}>
      <div className={`
        w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 overflow-auto
        rounded pb-4 px-4 my-10
        bg-white flex flex-col ${className}
      `}>
        <div>

          <Formik
            initialValues={{
              level: ownerCreating ? 0 : 1,
              locked: ownerCreating ? 1 : 0,
              name: "",
              title: "",
              bio: "",
              phone: "",
              email: ""
            }}
            onSubmit={async (values) => {

              setuploading(true);

              uploadContact(values).then((data) => {

                setuploading(false);
                onClose();

                if (data.status === "failed") {

                  toast("error", data.err.response.data?.info.toString());

                } else {

                  toast("success", "New contact has been created successfully!");

                }


              })

            }}
          >
            <Form className={uploading ? "animate-pulse" : ""}>

              <div className="pt-3 flex justify-between items-center text-sm">
                <div className="font-bold text-orange-600">
                  <div className="text-xl">
                    { ownerCreating ? 
                      <span className="mx-2">
                        <i className="fa fa-user mr-2"></i>
                      </span>
                    : <></>
                    }
                    LEVEL
                    <Field className="ml-2 w-16 font-bold"
                      name="level" placeholder="1" type="number" min="1" readOnly={ownerCreating}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Button handleClick={onClose}>
                    <i className="fa fa-close text-xl"></i>
                  </Button>
                </div>
              </div>

              <div className="text-center py-3">
                <Button type="submit" className="bg-orange-500 text-white text-sm">
                  {uploading ? <Loader className="mr-3"></Loader> :
                    <i className="fa fa-arrow-up mr-3"></i>
                  }
                  <span>Upload</span>
                </Button>
              </div>

              <div className="my-2 text-center">
                <div className="flex justify-center">
                  <div className="rounded-full overflow-hidden">
                    <img className="w-32" src={contact_image} alt="Contact Person" />
                  </div>
                </div>
                <Field className="text-center w-full mt-3 mb-2 font-bold text-xl"
                  name="name" placeholder="Person Name" required
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
                <div className="hidden"><Field className="" name="locked" /></div>
              </div>

            </Form>
          </Formik>
        </div>
      </div>
    </div>

  )


}