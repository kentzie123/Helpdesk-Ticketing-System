import React, { useContext, useState, useEffect, useCallback, use } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //============================= STATE =============================
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [authUser, setauthUser] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [rolePrivilege, setRolePrivilege] = useState({});
  const [pagePrivilege, setPagePrivilege] = useState([]);
  const [privilegeLoaded, setPrivilegeLoaded] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [selectedTicketComment, setSelectedTicketComment] = useState(null);
  const [showDeleteTicketCommentModal, setShowDeleteTicketCommentModal] = useState(false);
  const [deleteTicketModal, setDeleteTicketModal] = useState(false);

  const [deleteNotificationToastResponse, setDeleteNotificationToastResponse] = useState('');

  const [createTicketRatingResponse, setCreateTicketRatingResponse] = useState('');
  const [createTicketResponse, setCreateTicketResponse] = useState('');
  const [createArticleResponse, setCreateArticleResponse] = useState('');
  
  const [editArticleResponse, setEditArticleResponse] = useState('');
  const [editTicketResponse, setEditTicketResponse] = useState('');

  const [deleteTicketResponse, setDeleteTicketResponse] = useState('');
  const [deleteArticleResponse, setDeleteArticleResponse] = useState('');

  const [showRateTicketModal, setShowRateTicketModal] = useState(false);

  


  //======================== FORGOT PASSWORD ========================
  const [resetPassView, setResetPassView] = useState('s1');
  const [resetPassToken, setResetPassToken] = useState('');
  const [resetPassVerificationCode, setResetPassVerificationCode] = useState('');
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);

  const [resetCodeEmail, setResetCodeEmail] = useState('');

  //============================ SIGNUP =============================

  //============================ FETCH ==============================

  const fetchPagePrivilege = async (roleId) => {
    try {
      const res = await api.get(`/privilege/${roleId}`);
      setPagePrivilege(res.data);
    } catch (err) {
      console.error('Error fetching page privileges:', err);
    }
  };

  const fetchTickets = async (user) => {
    try {
      const res = await api.get(`/tickets/by-role`, {
        params: {
          role: user.role,
          fullname: user.fullname,
          userID: user.userID
        }
      });
      setTickets(res.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };


  

  


  //======================== DELETE HANDLERS ==========================


  

  

const deleteSelectedTicketsHandler = async (selectedTickets) => {
  try {
    const res = await api.delete('/tickets/bulk-delete', {
      data: { ticketIds: selectedTickets }, // 🛠️ Proper placement
    });
    setSelectedTickets([]);
    setDeleteTicketResponse('Tickets deleted successfully');
    setTickets(prev => prev.filter(ticket => !selectedTickets.includes(ticket._id)));
  } catch (err) {
    console.error('Error deleting selected tickets:', err);
    setDeleteTicketResponse('Error deleting tickets');
  }
};




  //============================ PROVIDER =============================
  return (
    <AppContext.Provider value={{
      createTicketRatingResponse, setCreateTicketRatingResponse,
      createArticleResponse, setCreateArticleResponse,
      createTicketResponse, setCreateTicketResponse,
      deleteTicketModal, setDeleteTicketModal,
      editTicketResponse, setEditTicketResponse,
      editArticleResponse, setEditArticleResponse,
      deleteArticleResponse, setDeleteArticleResponse,
      deleteTicketResponse, setDeleteTicketResponse,
      fetchPagePrivilege,
      fetchTickets,
      pagePrivilege, setPagePrivilege,
      privilegeLoaded, setPrivilegeLoaded,
      rolePrivilege, setRolePrivilege,
      selectedTicket, setSelectedTicket,
      resetPassView, setResetPassView,
      tickets, setTickets,
      authUser, setauthUser,
      users, setUsers,
      loading, setLoading,
      isResetPasswordSuccess, setIsResetPasswordSuccess,
      resetCodeEmail, setResetCodeEmail,
      resetPassToken, setResetPassToken,
      resetPassVerificationCode, setResetPassVerificationCode,
      showRateTicketModal, setShowRateTicketModal,
      selectedTicketComment, setSelectedTicketComment,
      showDeleteTicketCommentModal, setShowDeleteTicketCommentModal,
      deleteNotificationToastResponse, setDeleteNotificationToastResponse,
      selectedUser, setSelectedUser,
      showDeleteUserModal, setShowDeleteUserModal,
      deleteSelectedTicketsHandler,
      selectedTickets, setSelectedTickets
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };