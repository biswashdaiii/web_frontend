import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, backendUrl } = useContext(AdminContext);

  useEffect(() => {
  if (aToken) {
    getAllDoctors(); 
  }
}, [aToken]);


  return (
    <div>
      {doctors.length === 0 && <p>No doctors found</p>}

      {doctors.map((doc) => {
        // Build full image URL using backendUrl + '/uploads/' + filename
        const imageUrl = doc.image ? `${backendUrl}/uploads/${doc.image}` : '/default-doctor.png';

        return (
          <div key={doc._id} style={{ marginBottom: '20px' }}>
            <h3>{doc.name}</h3>
            <img
              src={imageUrl}
              alt={doc.name}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-doctor.png'; // fallback if image fails
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DoctorList;
