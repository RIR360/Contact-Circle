export default function Loader() {

    return (
        <div
            className="inline-block h-8 w-8 m-4 animate-spin rounded-full 
            border-4 border-solid border-current border-r-transparent text-gray-300
            align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
                <i className="fa fa-circle text-orange-500"></i>
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden 
                !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    )

}