import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow.jsx';
import { AppContext } from '../context/AppContext.jsx';

const ChatPage = () => {
  const { doctorId, doctorName } = useParams();
  const { userData, loadingUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingUser) {
      // Still loading user info, wait
      return;
    }

    if (!userData || !userData._id) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [loadingUser, userData, navigate]);

  if (loading) {
    return <div>Loading user info...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ChatWindow
        chatPartnerId={doctorId}
        chatPartnerName={decodeURIComponent(doctorName)}
      />
    </div>
  );
};

export default ChatPage;
