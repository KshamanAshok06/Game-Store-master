import React from 'react';
import Payment from './MainScreen/index.jsx';
import './index.css';

// Create the main application component
function PaymentCard() {
  return (

    
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <Payment />
    </div>

  );
}
export default PaymentCard;
// Render the App component in the DOM
