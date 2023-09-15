export default function Alert({ message }) {

    return (
        <div className={`
        bg-gray-100 border-t-4 border-orange-500 rounded-b 
        px-4 py-3 shadow-md my-3
    `} role="alert">
            <p className="font-bold">
                <i className="fa fa-circle-info mr-3 text-orange-600"></i>
                <span>{message}</span>
            </p>
        </div>
    )

}