import React, { useState, useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';


const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    padding: 0,
  },
  content: {
    padding: '24px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
    paddingTop: '0',
    
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  instagramButton: {
    backgroundColor: '#000000',
    color: 'white',
  },
  whatsappButton: {
    backgroundColor: '#000000',
    color: 'white',
  },
  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};

function PersistentModal() {
  const [showModal, setShowModal] = useState(false);
  const [instagramClicked, setInstagramClicked] = useState(false);
  const [whatsappClicked, setWhatsappClicked] = useState(false);

  useEffect(() => {
    const instagramStatus = localStorage.getItem('instagramClickedNew') === 'true';
    const whatsappStatus = localStorage.getItem('whatsappClickedNew') === 'true';
    
    setInstagramClicked(instagramStatus);
    setWhatsappClicked(whatsappStatus);

    setShowModal(!(instagramStatus && whatsappStatus));
  }, []);

  const handleInstagramClick = () => {
    setInstagramClicked(true);
    localStorage.setItem('instagramClickedNew', 'true');
    checkAndCloseModal();
  };

  const handleWhatsAppClick = () => {
    setWhatsappClicked(true);
    localStorage.setItem('whatsappClickedNew', 'true');
    checkAndCloseModal();
  };

  const checkAndCloseModal = () => {
    if (instagramClicked && whatsappClicked) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} className='mx-16'>
        <div style={modalStyles.header} className='mt-8 justify-center items-center'>
          <img
            src="https://adslabs.devxoshakya.xyz/ads-labs-icon.svg"
            alt="Horizontal-image"
            style={{ width: '80%', height: 'auto', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            className='mx-auto'
          />
        </div>
        <div style={modalStyles.content} className='flex-col flex items-center justify-center'>
          <h3 className='font-bold mx-auto mb-4'> Access Restricted</h3>
          <p style={{ textAlign: 'center', marginBottom: '16px' }} className='text-sm font-semibold'>This website’s content is currently restricted. To gain access, please support our community by following our Instagram account and joining our WhatsApp group. Once you've completed these steps, refresh the page.</p>
        </div>
        <div style={modalStyles.footer} className='gap-4'>
          <Link to="https://instagram.com/adslabscore">
          <button
            onClick={handleInstagramClick}
            disabled={instagramClicked}
            style={{
              ...modalStyles.button,
              ...modalStyles.instagramButton,
              ...(instagramClicked ? modalStyles.disabledButton : {}),
            }}
          >
            <FaInstagram style={{ marginRight: '8px' }} />
            Instagram
          </button>
          </Link>
          <Link to="https://chat.whatsapp.com/H4iJ6Rh9IPf4xRJfEL7Z3T">
          <button
            onClick={handleWhatsAppClick}
            disabled={whatsappClicked}
            style={{
              ...modalStyles.button,
              ...modalStyles.whatsappButton,
              ...(whatsappClicked ? modalStyles.disabledButton : {}),
            }}
            className='cursor-pointer '
          >
            <FaWhatsapp style={{ marginRight: '8px' }} />
            WhatsApp
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PersistentModal;