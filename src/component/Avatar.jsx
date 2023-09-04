
import { useState } from "react";
import default_contact_image from "../images/contact.webp"
import Card from "./Card";

export default function Avatar({ data = {} }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { name } = data;

    const handleOpenModal = () => {

        setIsModalOpen(true);

    };

    const handleCloseModal = () => {

        setIsModalOpen(false);
        
    };

    return (
        <div className="text-gray-600 flex-none fade-in">
            <div className="
                cursor-pointer transition
                hover:opacity-50
            " onClick={handleOpenModal}>
                <div className="flex justify-center">
                    <div className="
                        rounded-full overflow-hidden
                    ">
                        <img className="w-20" src={default_contact_image} alt="Contact Avatar"/>
                    </div>
                </div>
                <div className="font-bold mt-1">{name || "Person"}</div>
            </div>
            <Card isOpen={isModalOpen} data={data} onClose={handleCloseModal} />
        </div>
    )

}