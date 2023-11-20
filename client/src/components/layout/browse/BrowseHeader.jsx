import { Link, useNavigate } from "react-router-dom";
import { SIGN_OUT } from "../../../store/authSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { fetchContentBySearch } from "../../../store/contentSlice";
import netflixLogo from "../../../assets/logos/netflix_logo.png";
import netflixAvatar from "../../../assets/icons/netflix-avtar.jpg";
import Menu from "../../menu/Menu";

const BrowseHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const headerRef = useRef(null);
  const inputRef = useRef(null);
  const user = useSelector((state) => state?.auth?.userData);
  const IS_LOGGED_IN = useSelector((state) => state?.auth?.isLoggedIn);

  const scrollHandler = () => {
    if (window.scrollY > 10) {
      headerRef.current.style.backgroundColor = "black";
    } else {
      headerRef.current.style.backgroundColor = "transparent";
    }
  };

  useEffect(() => {
    if (IS_LOGGED_IN) {
      window.addEventListener("scroll", scrollHandler);
    }

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(fetchContentBySearch({ searchText, userId: user._id }));
  }, []);

  const handleSignInSignOut = async () => {
    if (!IS_LOGGED_IN) return navigate("/signin");
    const response = await dispatch(SIGN_OUT());
    if (response?.payload?.success) {
      navigate("/logout");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchContentBySearch({ searchText, userId: user._id }));
  };

  const openSearch = (e) => {
    inputRef.current.setAttribute("style", "width:100%");
  };

  const closeSearch = () => {
    inputRef.current.setAttribute("style", "width:0");
  };

  return (
    <header
      className="fixed top-0 z-50 flex h-16 w-full items-center justify-between px-4 text-white transition duration-300 ease-in-out md:h-20 md:px-8"
      ref={headerRef}
    >
      <div className="md:text-md flex gap-4 text-sm">
        <div className="w-16 md:w-24">
          <Link to="/">
            <img src={netflixLogo} alt="netflix logo" className="w-full" />
          </Link>
        </div>
      </div>

      <div className="group flex h-fit items-center gap-3">
        <div
          className="ml-2 flex border-2 border-white text-white"
          onMouseEnter={() => openSearch()}
          onMouseLeave={() => closeSearch()}
        >
          <div
            className="flex cursor-pointer  items-center gap-2 bg-black/50  px-1 py-1 text-white"
            onClick={handleSearch}
          >
            <AiOutlineSearch className="text-lg md:text-xl lg:text-2xl" />
          </div>

          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              className="h-full w-0 bg-black/50 text-white transition-all ease-in-out focus:outline-none"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            ></input>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 overflow-hidden rounded md:w-9 lg:w-10">
            <img src={netflixAvatar} className="object-contain" alt="avatar" />
          </div>

          <Menu>
            <ul className="rounded bg-netflix-black p-4">
              <li className="flex items-center gap-2 md:gap-3 lg:gap-4">
                <div className="w-6 overflow-hidden rounded md:w-7 lg:w-8">
                  <img
                    src={netflixAvatar}
                    className="object-contain"
                    alt="menu"
                  />
                </div>

                <div className="md:text-md text-sm lg:text-lg">
                  Mangesh Thakare
                </div>
              </li>
              <hr className="my-4" />
              {IS_LOGGED_IN && user?.role === "ADMIN" && (
                <Link to={"/admin"}>
                  <li className="flex cursor-pointer items-center gap-2 md:gap-3 lg:gap-4">
                    <RiAdminFill className="text-lg md:text-xl lg:text-2xl" />
                    <div className="md:text-md text-sm lg:text-lg">
                      Admin Dashboard
                    </div>
                  </li>
                </Link>
              )}
              <hr className="my-4" />
              <li
                className="flex cursor-pointer items-center gap-2 md:gap-3 lg:gap-4"
                onClick={() => handleSignInSignOut()}
              >
                <FaSignOutAlt className="text-lg md:text-xl lg:text-2xl" />
                <div className="md:text-md text-sm lg:text-lg">
                  Sign out of Netflix
                </div>
              </li>
            </ul>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default BrowseHeader;
