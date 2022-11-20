import { useState } from "react"

export default function AddFamilyMemberData({ fetchData, activeMember, setAddingData, addNewMember, setActiveMember }) {
  const [memberData, setMemberData] = useState({
    name: "",
    spouse: "",
    birth_year: "",
    location: "",
    address: "",
    parent: activeMember?._id || null
  })
  const [dataValidity, setDataValidity] = useState()
  const [nameInvalid, setNameInvalid] = useState(false)

  function handleClick() {
    if (isNaN(memberData.birth_year)) {
      setDataValidity(false)
      return
    }
    if (!memberData.name.trim()) {
      setNameInvalid(true)
      return
    }
    if (!memberData.birth_year.trim()) {
      setDataValidity(false)
      return
    }
    addNewMember(memberData)
    setAddingData(false)
    setActiveMember(null)
    fetchData()
  }

  return (
    <div className='flex-grow p-4 border-2 h-full border-indigo-900 rounded-lg'>
      <div className='text-center text-indigo-900 text-lg font-bold border-b-2 border-indigo-900 pb-2'>
        Family Member
      </div>
      <div className="grid place-items-center">
        <div className="justify-self-center text-2xl my-4">
          <input className="my-4 outline-none bg-slate-200 rounded-md p-2 shadow-md" value={memberData.name} onChange={(e) => setMemberData({ ...memberData, name: e.target.value })} placeholder="name" type="text" /><br></br>
          {nameInvalid ? <p className="italic text-red-500 text-sm">Enter a valid name</p> : null}
          <input className="my-4 outline-none bg-slate-200 rounded-md p-2 shadow-md" value={memberData.spouse} onChange={(e) => setMemberData({ ...memberData, spouse: e.target.value })} placeholder="spouse" type="text" /><br></br>
          <input className="my-4 outline-none bg-slate-200 rounded-md p-2 shadow-md" value={memberData.birth_year} onChange={(e) => setMemberData({ ...memberData, birth_year: e.target.value })} placeholder="birth year" type="text" /><br></br>
          {dataValidity === false ? <p className="italic text-red-500 text-sm">Enter a valid year</p> : null}
          <input className="my-4 outline-none bg-slate-200 rounded-md p-2 shadow-md" value={memberData.location} onChange={(e) => setMemberData({ ...memberData, location: e.target.value })} placeholder="location" type="text" /><br></br>
          <input className="my-4 outline-none bg-slate-200 rounded-md p-2 shadow-md" value={memberData.address} onChange={(e) => setMemberData({ ...memberData, address: e.target.value })} placeholder="address" type="text" /><br></br>
          <input className="my-4 outline-none bg-slate-200 rounded-md p-2 shadow-md" type="file" src="" alt=""/><br />
          <button onClick={handleClick} className="bg-indigo-900 text-white py-2 px-4 hover:bg-indigo-700 active:translate-y-1 rounded-lg">Add</button>
        </div>
      </div>
    </div>
  )
}