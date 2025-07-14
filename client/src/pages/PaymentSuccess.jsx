import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const PaymentSuccess = () => {
  const { axios, getToken } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const bookingId = query.get("bookingId");

  useEffect(() => {
    const markAsPaid = async () => {
      try {
        const { data } = await axios.post(
          "/api/bookings/mark-paid",
          { bookingId },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        if (data.success) {
          toast.success("Payment successful and booking marked as paid.");
        } else {
          toast.error(data.message);
        }
        navigate("/my-bookings");
      } catch (err) {
        toast.error("Error updating payment status.");
        navigate("/my-bookings");
      }
    };

    if (bookingId) markAsPaid();
    else navigate("/my-bookings");
  }, [bookingId]);

  return <p className="text-center py-20 text-xl">Processing Payment...</p>;
};

export default PaymentSuccess;
