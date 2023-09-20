export default function Button({className, handleClick, type, children}) {

    return (
        <button className={`
            p-2 px-3 rounded
            hover:bg-gray-300
            fade-in ${className}
        `} onClick={handleClick} type={type}>
            {children}
        </button>
    )

}