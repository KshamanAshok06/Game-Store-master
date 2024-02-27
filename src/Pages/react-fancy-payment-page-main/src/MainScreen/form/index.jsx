import { useState } from "react";
import { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";




const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? "0" + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CForm({
  cardMonth,
  cardYear,
  onUpdateState,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  onCardInputFocus,
  onCardInputBlur,
  cardCvv,
  children,
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  // TODO: We can improve the regex check with a better approach like in the card component.
  const onCardNumberChange = (event) => {
    let { value, name } = event.target;
    let cardNumber = value;
    value = value.replace(/\D/g, "");
    if (/^3[47]\d{0,13}$/.test(value)) {
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
      // diner's club, 14 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    } else if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
        .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
    }

    setCardNumber(cardNumber.trimRight());
    onUpdateState(name, cardNumber);
  };

  const onCvvFocus = () => {
    onUpdateState("isCardFlipped", true);
  };

  const onCvvBlur = () => {
    onUpdateState("isCardFlipped", false);
  };
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
  const navigate = useNavigate()
  const navigatepay = () => {
    // 👇️ navigate to /
    navigate('/PaymentStatusCard');
  };

  return (
    

    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">

      <div className="w-full bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="-mb-36">{children}</div>
        <form className="pt-44 bg-base-300 md:pb-14 pb-5 px-5 md:px-14 rounded-xl space-y-4" >
          <div>
            <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4">
              Card Number
            </label>
            <input
              type="tel"
              name="cardNumber"
              className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none" autoComplete="off"
              onChange={onCardNumberChange}
              maxLength="19"
              ref={cardNumberRef}
              onFocus={(e) => onCardInputFocus(e, "cardNumber")}
              onBlur={onCardInputBlur}
              value={cardNumber}
              id="ccn"
            />
          </div>
          <div>
            <label htmlFor="cardName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4">
              Card Holder
            </label>
            <input
              type="text"
              className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none"
              autoComplete="off"
              name="cardHolder"
              onChange={handleFormChange}
              ref={cardHolderRef}
              onFocus={(e) => onCardInputFocus(e, "cardHolder")}
              onBlur={onCardInputBlur}
            />
          </div>

          <div className="flex gap-2 justify-between">
            <div className="w-3/4">
              <label htmlFor="cardMonth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4">
                Expiration Date
              </label>
              <div className="flex justify-between px 4 space-x-5">
                <select
                  className="rounded-lg  focus:ring-blue-500 focus:ring-opacity-50 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-2.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none"
                  value={cardMonth}
                  name="cardMonth"
                  onChange={handleFormChange}
                  ref={cardDateRef}
                  onFocus={(e) => onCardInputFocus(e, "cardDate")}
                  onBlur={onCardInputBlur}
                >
                  <option value="" disabled>
                    Month
                  </option>

                  {monthsArr.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <select
                  name="cardYear"
                  className="rounded-lg  focus:ring-blue-500 focus:ring-opacity-50 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-2.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none"
                  value={cardYear}
                  onChange={handleFormChange}
                  onFocus={(e) => onCardInputFocus(e, "cardDate")}
                  onBlur={onCardInputBlur}
                >
                  <option value="" disabled>
                    Year
                  </option>

                  {yearsArr.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-1/4">
              <label htmlFor="cardCvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4">
                CVV
              </label>
              <input
                type="tel"
                className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none"
                maxLength="4"
                autoComplete="off"
                name="cardCvv"
                onChange={handleFormChange}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                ref={cardCvv}
              />
            </div>
          </div>

          <div className="flex justify-center items-center py-5 px-10" >
            <button onClick={navigatepay} type="submit" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">
              <svg aria-hidden="true" className="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595" /><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14" /></svg>
              Pay with Visa
            </button>
          </div>


        </form>
      </div>
    </div>
  );
}
