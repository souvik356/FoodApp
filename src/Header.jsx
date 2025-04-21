import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import foodology from "./assets/Foodology.png";
import userIcon from "./assets/User.png";
import { useEffect, useState } from "react";
import { account } from "./Appwrite/Appwrite";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "./Store/UserSlice";
import { SlLogout } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeAllItem, removeItem } from "./Store/AddToFavouriteSlice";

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showFavouriteModal, setShowFavouriteModal] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user.value);
  console.log("user from store", loggedInUser);
  const favouriteItems = useSelector((store) => store.favourite.value);
  console.log("favouriteItems", favouriteItems);

  const navigate = useNavigate();
  const location = useLocation();
  //  console.log(location);
  const handleLogOut = async () => {
    const result = await account.deleteSessions();
    console.log(result);
    navigate("/");
    dispatch(deleteUser());
    dispatch(removeAllItem())
  };

  const checkStateOfAuthentication = async () => {
    const user = await account.get();
    if (user) {
      console.log("User is logged in", user);
      dispatch(addUser({ id: user.$id, name: user.name, email: user.email }));
      navigate("/recipie");
    } else {
      dispatch(deleteUser());
      navigate("/");
    }
  };
  useEffect(() => {
    checkStateOfAuthentication();
  }, []);

  return (
    <>
      <div className="z-10 fixed w-full px-12 py-6 h-20 flex items-center justify-between bg-amber-200">
        <Link to="/recipie">
          <img className="w-24" src={foodology} />
        </Link>
        {location.pathname !== "/" && loggedInUser && (
          <div>
            <SearchBar />
          </div>
        )}

        {loggedInUser && (
          <div>
            <div className=" flex items-center gap-4">
              <h1>{`Hi, ${loggedInUser.name}`}</h1>

              <div className="relative flex items-center gap-1.5">
                <div
                  className="cursor-pointer"
                  onClick={() => setShowFavouriteModal(!showFavouriteModal)}
                >
                  <FaHeart size={25} />
                </div>

                {showFavouriteModal && (
                  <div className="absolute top-12 right-0 z-20 w-[24rem] p-4 bg-white border border-red-200 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                      Favourite Recipes
                    </h3>
                    {favouriteItems.length === 0 ? <h5 className="font-semibold text-black mb-2">No Favorite Item Found</h5> :favouriteItems.map((favData) => {
                      return (
                        <div className="mb-4" key={favData.id}>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <img className="w-16 rounded-xl" src={favData.image} />
                              <div>
                                <h4>{favData.name}</h4>
                                <h5 className="flex items-center gap-1">
                                  {favData.rating}
                                  <FaStar />
                                </h5>
                              </div>
                            </div>

                            <MdDelete onClick={()=>dispatch(removeItem(favData.id))} size={30} className="cursor-pointer" color="red"/>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <h3>{favouriteItems.length}</h3>
              </div>
              <img
                onClick={() => setShowUserInfo(!showUserInfo)}
                className="w-18 cursor-pointer"
                src={userIcon}
              />
            </div>

            {showUserInfo && (
              <div className="absolute w-22 h-9 flex items-center justify-center gap-1 p-1 bg- bg-amber-400 rounded right-4 top-19">
                <button onClick={handleLogOut} className="cursor-pointer">
                  Log-out
                </button>
                <SlLogout />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
