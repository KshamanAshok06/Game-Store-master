"use client"


import { DownloadIcon, PayFailed, PaySuccess } from './../assets/LogoSvgs'
import { Link, Navigate, useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";

import React, { useState, useEffect } from 'react';

const PaymentStatusCard = ({ orderStatus, returnHomeBtn, totalCost }) => {

    let status = orderStatus === 'Payment successful'

    const [progress, setProgress] = useState(0);

    const duration = 10; // Duration in seconds
    const intervalTiming = 100; // Interval timing in milliseconds

    const increment = 100 / (duration * 1000 / intervalTiming);


    useEffect(() => {
        if (!status) {
            let progress = 0;
            const timer = setInterval(() => {
                progress += increment;
                setProgress(Math.min(progress, 100));

                if (progress >= 100) {
                    clearInterval(timer);
                    returnHomeBtn()
                }
            }, intervalTiming);

            return () => {
                clearInterval(timer);
            };
        }
    }, [status]);
    const navigateHome = () => {
        // 👇️ navigate to /
        Navigate('/store');
    };


    return (
        <>
            <AnimatedPage>

                <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
                    <div id="Form_container" className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="light" />
                        {/* Existing background gradient div */}
                        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#000_100%)]"></div>
                        <div className='sm:w-[600px] w-full sm:h-max h-full
        flex flex-col items-center justify-center pt-3 pb-5 px-4 gap-y-5'>
                            <div id='Form-container' className='w-full h-max flex items-center justify-center text-[20px] font-medium'>
                                <p>Payment Successful </p>
                            </div>

                            <div className='w-max h-max flex items-center justify-center p-5 rounded-full  bg-[#1f853260] '>
                                <PaySuccess className=' text-green-500 ' />
                            </div>

                            {!status &&
                                <div className='w-full h-max flex items-center justify-center px-1 text-[18px]'>
                                    {orderStatus}
                                </div>}

                            {!status &&
                                <div className='w-full h-max flex items-center justify-center px-1 text-[18px]'>
                                    <div className=' w-max h-max px-3 py-1 border border-[#ffffff60] 
            rounded-lg text-[18px] relative overflow-hidden text-transparent'>
                                        Redirecting to Home
                                        <Link to="/store"><button
                                            className='absolute top-0 left-0 z-20 w-max h-max px-3 py-1  
                rounded-lg text-[18px] text-white'>
                                            Redirecting to STORE
                                        </button>
                                        </Link>
                                        <div style={{ width: `${progress}%`, }}
                                            className=' h-full bg-[#606060d7] absolute top-0 left-0 z-10 duration-100 ease-in' >
                                        </div>
                                    </div>
                                </div>}

                            {status &&
                                <div className='w-full h-max flex items-center sm:justify-between justify-center px-1 text-[18px]'>
                                    <p className='sm:block hidden'>Amount Paid</p>
                                    <p className='sm:block hidden'>₹{totalCost.toLocaleString('en-US')}</p>
                                    <p className='block sm:hidden text-[20px] font-medium'>
                                        INR {totalCost.toLocaleString('en-US')}</p>
                                </div>}

                            {status &&
                                <div className='w-full h-max flex sm:flex-row flex-col items-center 
        justify-between sm:px-1 text-[18px] sm:gap-y-0 gap-y-4'>
                                    <button className='w-max h-max bg-[#60606000] px-3 py-1 
            border border-[#ffffff60] rounded-lg text-[18px] flex items-center gap-x-1'>
                                        <DownloadIcon />
                                        Get Reciept
                                    </button>
                                    <button onClick={navigateHome}
                                        className='w-max h-max bg-[#606060d7] hover:bg-[#787878d7] px-3 py-1 
            border border-[#ffffff60] rounded-lg text-[18px] flex items-center gap-x-1'>
                                        Return Home
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="18" height="18"
                                            viewBox="0 0 24 24"><path fill="currentColor"
                                                d="M7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375t.887.375l8.4 8.425q.15.15.213.325T17.6 12q0 .2-.063.375t-.212.325L8.9 21.125q-.35.35-.863.35T7.15 21.1Z"></path>
                                        </svg>
                                    </button>
                                </div>}

                        </div>
                    </div>
                    <style jsx>{`
          #Form_container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.25rem;
          border-radius: 0.375rem;
          background-color: #111111;
          color: #eeeeee;
        }

        #Form_container:hover .light:before {
          box-shadow: 0 0 80px 30px #00ff00;
          opacity: 0.8;
        }

        .light {
          z-index: -1;
        }

        .light:before {
          border-radius: 0.375rem;
          transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
          content: "";
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          transform: scale(1);
          animation: flickering-light 4s infinite;
          box-shadow: 0 0 60px 10px #00ff00;
          opacity: 0.4;
        }
        @keyframes flickering-light {
            0% {
              opacity: 0.8;
            }
            3% {
              opacity: 0.4;
            }
            5% {
              opacity: 0.8;
            }
            15% {
              opacity: 0.4;
            }
            100% {
              opacity: 0.4;
            }
          }
      `}</style>
                </div>
            </AnimatedPage>
        </>
    )
}

export default PaymentStatusCard;