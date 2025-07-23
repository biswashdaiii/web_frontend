import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import { AppContext } from '../context/AppContext.jsx';

const ChatPage = () => {
  const { doctorId, doctorName } = useParams();
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userData?._id) {
      navigate('/login');
    }
  }, [userData, navigate]);

  if (!userData?._id) {
    return <div>Redirecting to login...</div>;
  }

  if (!doctorId || !doctorName) {
    return <div>Invalid chat parameters.</div>;
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
