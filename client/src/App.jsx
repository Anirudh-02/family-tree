import { useEffect } from 'react'
import { useState } from 'react'
import AddFamilyMemberData from './components/AddFamilyMemberData'
import FamilyMemberData from './components/FamilyMemberData'
import FamilyTreeView from './components/familyTreeView'
import PrintedTree from './components/PrintedTree'

function App() {
  const [familyTreeRootArray, setFamilyTreeRootArray] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewingMember, setViewingMember] = useState(null)
  const [activeMember, setActiveMember] = useState(null)
  const [addingData, setAddingData] = useState(false)

  function addNewMember(memberData) {
    fetch(`${import.meta.env.VITE_API_URL}add`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memberData),
    })
      .then(res => res.json())
      .then((newMember) => {
        console.log(newMember);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const fetchData = function () {
    const abortController = new AbortController();
    fetch(`${import.meta.env.VITE_API_URL}get_trees`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageNumber: 0,
        searchQuery: searchQuery
      }),
      signal: abortController.signal
    })
      .then(res => res.json())
      .then((famTreeArr) => {
        setFamilyTreeRootArray(famTreeArr)
      })
      .catch((err) => {
        if (!abortController.signal.aborted) {
          console.error(err);
        }
      })

    return () => {
      abortController.abort()
    }
  }

  useEffect(fetchData, [searchQuery])

  if (familyTreeRootArray) {
    return (
      <><div className="App grid grid-cols-12 grid-rows-[1fr_100fr_1fr_1fr] gap-4 p-4 h-screen">
        <FamilyTreeView fetchData={fetchData} activeMember={activeMember} setSearchQuery={setSearchQuery} setAddingData={setAddingData} setViewingMember={setViewingMember} setActiveMember={setActiveMember} familyTreeRootArray={familyTreeRootArray}/>
        <div className='row-start-1 row-end-6 col-start-4 col-end-13'>
          {addingData ? <AddFamilyMemberData fetchData={fetchData} activeMember={activeMember} setAddingData={setAddingData} addNewMember={addNewMember} setActiveMember={setActiveMember} /> : <FamilyMemberData viewingMember={viewingMember} />}
        </div>
      </div>
        <div className='grid place-items-center print'>
          {activeMember ? <PrintedTree member={activeMember} /> : null}
        </div>
      </>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
}

export default App
