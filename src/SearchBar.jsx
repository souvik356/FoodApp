import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TypeAnimation } from "react-type-animation";
import { FaBowlFood } from "react-icons/fa6";
import { HiTrendingUp } from "react-icons/hi";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [recipie, setRecipie] = useState("");
  const [data, setData] = useState([]);
  const [showRecommendationBox, setShowRecommendationBox] = useState(false);
  const getRecommendation = async () => {
    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${recipie}`
    );
    const jsonData = await data.json();
    setData(jsonData.recipes);
  };
  useEffect(() => {
    const timer = setTimeout(getRecommendation, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [recipie]);
  return (
    <>
      <div className="">
        <div className="relative bg-white w-xl h-12 rounded-xl p-2 flex items-center gap-5">
          <div>
            <CiSearch size={25} />
          </div>
          
          {!showRecommendationBox && (<span className="w-full h-full">
            <TypeAnimation
              sequence={[
                "Search'Pizza'",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                " Search'Biryani'",
                1000,
                "Search'Butter-Chicken'",
                1000,
                "Search'Daal-Makhani'",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{}}
              repeat={Infinity}
            />
          </span>)}

          <input
            onChange={(e) => setRecipie(e.target.value)}
            value={recipie}
            type="text"
            className=" outline-none w-full h-full"
            onFocus={() => setShowRecommendationBox(true)}
            onBlur={() => setTimeout(()=>setShowRecommendationBox(false),200)}
          />
        </div>
        {showRecommendationBox && (
          <div className="w-xl absolute bg-white mt-1 flex gap-1 flex-col max-h-[250px] overflow-y-scroll p-2 rounded-2xl shadow-2xl">
            {data.length === 0
              ? "No Item found"
              : data.map((data) => (
                <Link to={`/recipie/${data.id}`} key={data.id} className="flex bg-red-400 items-center justify-between cursor-pointer hover:bg-gray-200 p-1.5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div>
                      <FaBowlFood size={25} color="bisque-500"/>
                    </div>
                  <span key={data.id} className="">
                    {data.name}
                  </span>
                  </div>

                  <div>
                      <HiTrendingUp size={25} />
                  </div>
                </Link>
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
