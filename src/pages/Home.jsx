import React from "react";
import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { TiWeatherSunny } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";
import { SiAuthelia } from "react-icons/si";


const apps = [
  { name: "Todo App", path: "/todo-app", icon: <LuListTodo /> },
  { name: "Weather App", path: "/weather-app", icon: <TiWeatherSunny /> },
  { name: "Auth App", path: "/auth-app", icon: <SiAuthelia /> },
];

const Main = () => {
  return (
    <div className="bg-purple-500  h-screen p-8">
      <div className="bg-white rounded-md shadow-md p-6">
        <div className="p-4 flex">
          <h2 className="text-lg font-semibold mb-4">My React Apps</h2>
        </div>
        <div className="flex">
          <div className="w-full p-4">
            <h3 className="text-sm font-semibold mb-2">App List</h3>
            <div className="flex flex-col">
              {apps.map((app, index) => (
                <Link to={app.path}>
                  <div className="mb-2 flex items-center justify-between border-2	p-2 rounded w-full  hover:border-blue-500">
                    <div  className="flex items-center">
                        <span className="bg-blue-500  text-white  p-4 rounded text-xl mr-4"> {app.icon}</span>
                        <span className="text-sm">{app.name}</span>
                    </div>
                    <FaChevronRight />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
