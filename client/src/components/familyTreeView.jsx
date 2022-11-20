import { useState } from 'react'
import useContextMenu from '../hooks/useContextMenu'
import ContextMenu from './ContextMenu'
import FamilyMemberNode from './FamilyMemberNode'

export default function FamilyTreeView({ fetchData, activeMember, setSearchQuery, setAddingData, setViewingMember, setActiveMember, familyTreeRootArray }) {
  const [showMenu, menuX, menuY, setShowMenu, setMenuX, setMenuY] = useContextMenu()


  function handleContextMenu(e) {
    e.preventDefault()
    setShowMenu(true)
    setMenuX(e.pageX)
    setMenuY(e.pageY)
  }

  function handleAddFamilyButtonClick() {
    setAddingData(true)
  }

  function handlePrint() {
    document.documentElement.style.setProperty('--app-display', 'none')
    document.documentElement.style.setProperty('--print-tree-display', 'block')
    print()
  }

  return (
    <>
      <div className='col-start-1 col-end-4 row-start-1 row-end-2 p-4 h-min bg rounded-lg border-2 border-indigo-900'>
        <div className='border-b-2 text-indigo-900 border-indigo-900 text-center text-lg font-bold py-2'>
          Family Tree
        </div>
        <div className='flex flex-wrap gap-2'>
          <input type="text" placeholder='search' className='border border-slate-400 rounded-lg my-3 flex-1 shadow-md outline-none p-1 bg-zinc-100' />
          <button onClick={(e) => setSearchQuery(e.target.previousElementSibling.value)} className='text-slate-100 hover:bg-indigo-700 my-3 rounded-md px-2 bg-indigo-800 active:bg-indigo-900'>Search</button>
          <button onClick={() => setSearchQuery("")} className='text-slate-100 hover:bg-indigo-700 my-3 rounded-md px-2 bg-indigo-800 active:bg-indigo-900'>Reset</button>
        </div>
      </div>
      <div className='col-start-1 col-end-4 row-start-2 row-end-3 bg-zinc-200 p-1 rounded-sm overflow-auto'>
        {familyTreeRootArray.map((familyTreeRoot) => {
          return (
            <ul key={familyTreeRoot._id}>
              <FamilyMemberNode setAddingData={setAddingData} setViewingMember={setViewingMember} setActiveMember={setActiveMember} key={familyTreeRoot._id} member={familyTreeRoot} handleContextMenu={handleContextMenu} />
            </ul>
          )
        })}
      </div>
      <button onClick={handleAddFamilyButtonClick} className='bg-indigo-900 text-white row-start-3 row-end-5 col-start-1 col-end-4 h-min border-2 border-indigo-900 rounded-lg p-4 text-lg font-medium hover:bg-indigo-700 active:translate-y-1'>
        Add Family
      </button>
      <button onClick={handlePrint} className='bg-indigo-900 text-white row-start-5 h-min row-end-6 col-start-1 col-end-4 border-2 border-indigo-900 rounded-lg p-4 hover:bg-indigo-700 active:translate-y-1'>
        Print Family Tree
      </button>
      <ContextMenu setViewingMember={setViewingMember} fetchData={fetchData} activeMember={activeMember} setAddingData={setAddingData} showMenu={showMenu} menuX={menuX} menuY={menuY} />
    </>
  )
}