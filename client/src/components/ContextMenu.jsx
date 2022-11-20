export default function ContextMenu({ setViewingMember, fetchData, activeMember, setAddingData, showMenu, menuX, menuY }) {
    function deleteFamilyMember() {
        fetch(`${import.meta.env.VITE_API_URL}delete`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberId: activeMember
            })
        })
            .then(res => res.text())
            .then(res => {
                fetchData()
                setViewingMember(null)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function handlePrint() {
        document.documentElement.style.setProperty('--app-display', 'none')
        document.documentElement.style.setProperty('--print-tree-display', 'block')
        print()
      }

    return (
        showMenu ? (
            <div className="inline-block absolute border border-gray-500 bg-gray-200 p-1" style={{ top: menuY, left: menuX }}>
                <button onClick={() => setAddingData(true)} className="italic">Add Family Member</button><br />
                <button onClick={deleteFamilyMember} className="italic">Delete Family Member</button><br />
                <button onClick={handlePrint} className="italic">Print Family Member</button>
            </div>
        ) : null
    )
}