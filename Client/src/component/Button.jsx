export default function Button({handleClick, children}) {

    return (
        <button className="
            p-2 px-3 rounded
            hover:bg-gray-300
            fade-in
        " onClick={handleClick}>
            {children}
        </button>
    )

}