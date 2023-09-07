import Button from "./Button";
import contact_image from "../images/contact.webp";

export default function Card ({ isOpen, onClose, onDelete, data = {} }) {

    if (!isOpen) return null;

    const { name, title, bio, phone, email, level } = data;

    return (
        <div className="
                fixed flex top-0 left-0 bg-gray-200
                h-screen w-screen justify-center align-center
                fade-in px-4 z-50
            ">
                <div className="
                    max-w-sm
                    rounded pb-4 px-4 my-10
                    bg-white flex flex-col
                    slide-in-top-delay
                ">
                    <div className="pt-3 flex justify-between items-center text-sm">
                        <div className="font-bold text-orange-600">
                            <div className="text-xl">LEVEL {level ?? "0"}</div>
                        </div>
                        <div className="flex items-center">
                            <Button ><i className="fa fa-pen"></i></Button>
                            <Button handleClick={onDelete}>
                                <i className="fa fa-trash text-red-600"></i
                            ></Button>
                            <Button handleClick={onClose}>
                                <i className="fa fa-close text-xl"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="my-2 text-center">
                        <div className="flex justify-center">
                            <div className="
                                rounded-full overflow-hidden
                            ">
                                <img className="w-32" src={contact_image} alt="Contact Person"/>
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
                                <i className="fa fa-info-circle text-orange-600"></i> Bio</h3>
                            <p>{bio || "No Information Provided"}</p>
                        </div>
                        <div className="mb-2">
                            <h3 className="text-l font-semibold">
                                <i className="fa fa-phone text-orange-600"></i> Phone</h3>
                            {phone?.length > 0 ? (
                                phone.map((info, index) => (
                                    <p key={index}>
                                        {info.number} ({info.type})
                                    </p>
                                ))
                                ) : (
                                <p>No Phone Provided</p>
                            )}
                        </div>
                        <div className="mb-2">
                            <h3 className="text-l font-semibold">
                                <i className="fa fa-envelope text-orange-600"></i> Email</h3>
                            {email?.length > 0 ? (
                                email.map((info, index) => (
                                    <p key={index}>
                                        {info.address} ({info.type})
                                    </p>
                                ))
                                ) : (
                                <p>No Email Provided</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )

}