import { useState } from "react"

export default function FamilyMemberNode({ setAddingData, setViewingMember, setActiveMember, member, handleContextMenu }) {
  const [showChildren, setShowChildren] = useState(false)

  function handleClick() {
    setShowChildren((prev) => !prev)
    setViewingMember(member)
    setActiveMember(member)
    setAddingData(false)
  }

  function handleRightClick(e) {
    handleContextMenu(e)
    setActiveMember(member)
  }

  return (
    <>
      <li key={member._id}>
        <button onContextMenu={handleRightClick} onClick={handleClick} className="w-full text-start my-1 rounded-sm border border-transparent hover:border-blue-400 focus-within:bg-blue-200 focus-within:border-blue-400">
          {showChildren ? <i className="fa-sharp fa-solid fa-caret-down mx-1"></i> : <i className="fa-solid fa-caret-right mx-1"></i>}
          {member.name}
        </button>
        {member.children && showChildren &&
          <ul className="ml-1 border-l p-1">
            {member.children.map(child => {
              return <FamilyMemberNode setAddingData={setAddingData} setViewingMember={setViewingMember} setActiveMember={setActiveMember} key={child._id} member={child} handleContextMenu={handleContextMenu} />
            })}
          </ul>
        }
      </li>
    </>
  )
}