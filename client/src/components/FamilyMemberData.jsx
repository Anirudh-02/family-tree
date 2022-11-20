export default function FamilyMemberData({ viewingMember }) {
  return (
    <div className='flex-grow p-4 border-2 h-full border-indigo-900 rounded-lg'>
      <div className='text-center text-indigo-900 text-lg font-bold border-b-2 border-indigo-900 pb-2'>
        Family Member
      </div>
      {viewingMember ? (
        <div className="grid grid-cols-2">
          <div className="justify-self-center text-2xl my-4">
            <p className="my-4">Name</p>
            <p className="my-4">Spouse</p>
            <p className="my-4">Birth Year</p>
            <p className="my-4">Location</p>
            <p className="my-4">Address</p>
            <p className="my-4">Photo</p>
          </div>
          <div className="text-2xl my-4">
          <p className="my-4">: {viewingMember.name}</p>
          <p className="my-4">: {viewingMember.spouse}</p>
          <p className="my-4">: {viewingMember.birth_year}</p>
          <p className="my-4">: {viewingMember.location}</p>
          <p className="my-4">: {viewingMember.address}</p>
          <p>: <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png" alt="photo" /></p>
          </div>
        </div>
      ) : null}

    </div>
  )
}