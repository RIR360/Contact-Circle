
import default_contact_image from "../images/contact.jpeg"

export default function Avatar({ open, data = {} }) {

    const { name, _id } = data;

    return (
        <div className="flex-none fade-in">
            <div className="
                cursor-pointer transition
                hover:opacity-50
            " onClick={() => open(_id)}>
                <div className="flex justify-center">
                    <div className="
                        rounded-full overflow-hidden
                    ">
                        <img className="w-20" src={default_contact_image} alt="Contact Avatar"/>
                    </div>
                </div>
                <div className="font-bold mt-1">{name || "Person"}</div>
            </div>
        </div>
    )

}