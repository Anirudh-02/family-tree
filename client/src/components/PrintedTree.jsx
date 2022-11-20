export default function PrintedTree({ member }) {

  return (
    <>
      <li key={member._id} className="list-none">
        <button value={member._id} className="w-full text-start my-1">
          ---{member.name}
        </button>
        {member.children &&
          <ul className="ml-4 border-l border-black">
            {member.children.map(child => {
              return <PrintedTree key={child._id} member={child}/>
            })}
          </ul>
        }
      </li>
    </>
  )
}