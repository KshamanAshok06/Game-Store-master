import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToAbout = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo("/store");
  });

  return null;
};

export default RedirectToAbout;
