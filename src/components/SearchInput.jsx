import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";

export default function SearchInput() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pins, setPins] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchSearchData = async () => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${search}`
    );
    console.log(response.data.items);
    setData(response.data.items);
  };

  const addUserToPins = (user) => {
    setPins([...pins, user]);
    const newData = data.filter((item) => item.id !== user.id);
    setData(newData);
    setSearch("");
  };

  const removeUserFromPins = (user) => {
    const newPins = pins.filter((item) => item.id !== user.id);
    setPins(newPins);
  };
  
  useEffect(() => {
    search && fetchSearchData();
  }, [search]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-[40%] w-[60%] h-[30vh] p-6 ">
        <p className="text-xl mb-2">Search users here</p>
        <div className="h-auto w-auto border border-gray-900 p-2 focus:border-black flex flex-wrap">
          {pins.map((item) => (
            <button
              className="bg-gray-100 border p-2 m-2 flex items-center gap-2"
              key={item.id}
            >
              <p>{item.login}</p>
              <p onClick={()=>removeUserFromPins(item)}>
                <ImCross />
              </p>
            </button>
          ))}
          <input
            onChange={handleChange}
            type="text"
            className=" w-full outline-none"
            placeholder="search here"
          />
        </div>
        {search.length != 0 && (
          <div className="w-full h-[30vh] shadow-lg mt-4 p-2 overflow-y-scroll">
            {data.map((item) => (
              <div
                key={item.id}
                onClick={() => addUserToPins(item)}
                className="w-full mt-1 h-auto flex gap-5 p-1 cursor-pointer items-center justify-center"
              >
                <div className="md:w-[4%] md:h-[4%] w-[6%] h-[6%]">
                  <img
                    className="w-full h-full rounded-full"
                    src={item.avatar_url}
                    alt=""
                  />
                </div>
                <div className="w-[90%] h-[10%]">
                  <h1 className="font-semibold">{item.login}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
