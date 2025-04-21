import { useEffect, useState } from "react";
import RecipieCard from "./RecipieCard";
import { useDispatch, useSelector } from "react-redux";
import { addRecipie } from "./Store/Recipie";
import { Link } from "react-router-dom";

const Body = () => {
  // const [recepie,setReciepe] = useState([])
  const recepie = useSelector((store) => store?.recipie?.value);
  // console.log('recipie',recepie);
  const dispatch = useDispatch();

  const [pageNo, setPageNo] = useState(0);
  const PAGE_SIZE = 8;

  const getRecipe = async () => {
    const response = await fetch("https://dummyjson.com/recipes?limit=0");
    const jsonData = await response.json();
    // console.log(jsonData);
    dispatch(addRecipie(jsonData.recipes));
    // setReciepe(jsonData.recipes)
  };

  useEffect(() => {
    getRecipe();
  }, []);

  // console.log(recepie[1])
  const totalPages = recepie && Math.ceil(recepie?.length / PAGE_SIZE);
  // console.log('totalPages',totalPages)
  const start = pageNo * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const array = [...Array(totalPages).keys()];
  // console.log(array)
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  const handlePrevious = () => {
    setPageNo(pageNo - 1);
  };
  const handlePageChange = (page) => {
    setPageNo(page);
  };
  if (!recepie)
    return <div className="pt-26 text-2xl text-center">Loading....</div>;
  return (
    <>
      <div className=" bg-amber-50 pt-6 min-h-screen">
        <div className="container mx-auto pt-20 grid grid-cols-2 gap-4 md:grid-cols-4 place-items-center">
          {recepie.slice(start, end).map((data) => (
            <Link key={data.id} to={`/recipie/${data.id}`}>
              <RecipieCard key={data.id} name={data.name} image={data.image} />
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <div className="w-full flex items-center justify-center gap-16">
            <button
              className="cursor-pointer px-8 py-2 bg-amber-200 rounded"
              disabled={pageNo + 1 <= 1 ? true : false}
              onClick={handlePrevious}
            >
              Previous
            </button>
            {pageNo + 1}/{totalPages}
            <button
              className="cursor-pointer px-8 py-2 bg-amber-200 rounded"
              disabled={pageNo + 1 === totalPages ? true : false}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          <div className="w-full flex mt-4 items-center justify-center gap-4">
            {array.map((data) => (
              <span
                key={data}
                onClick={() => handlePageChange(data)}
                className="bg-amber-200 flex items-center justify-center cursor-pointer w-6 h-6 rounded"
              >
                {data + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
