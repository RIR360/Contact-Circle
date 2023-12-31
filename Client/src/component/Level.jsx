import Avatar from "./Avatar";
export default function Level({level, opener, children}) {

  if (!children) return <></>;

  return (
    <>
      <div className="mt-3">
          <span className="text-sm"> Level {level}</span>
      </div>
      <div className="
          p-4 overflow-auto flex justify-center
          transition border-l-4 hover:border-orange-600 
      ">
        <div className="flex text-center gap-10">
          {children.map((contact) =>

            <Avatar key={contact._id} data={contact} open={opener} />

          )}
        </div>
      </div>
    </>
  )

}