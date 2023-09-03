export default function Level({level, children}) {

    return (
        <>
            <div className="mt-3">
                <span className="text-sm"> Level {level}</span>
            </div>
            <div className="
                p-4 text-center flex justify-center gap-10
                overflow-auto w-full transition 
                border-l-4 hover:border-orange-600
            ">
                {children}
            </div>
        </>
    )

}