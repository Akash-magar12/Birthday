import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Birthday = () => {
  const people = [
    {
      id: 0,
      name: "Bertie Yates",
      age: 29,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 1,
      name: "Hester Hogan",
      age: 32,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 2,
      name: "Larry Little",
      age: 36,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 3,
      name: "Sean Walsh",
      age: 34,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 4,
      name: "Lola Gardner",
      age: 29,
      image: "https://randomuser.me/api/portraits/women/90.jpg",
    },
  ];
  const [data, setData] = useState(people);
  function handledelete(idx) {
    let filtered = data.filter((val) => val.id !== idx); // Use strict equality
    setData(filtered);
  }
  const handleRemoveAll = () => {
    setData([]);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // Add formState
  const onSubmit = (formData) => {
    setData((prev) => [
      ...prev,
      {
        ...formData,
        id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 0,
      },
    ]);
    reset();
  };
  return (
    <div className="lg:w-[40%] rounded h-fit  bg-[#dadada] p-4 text-black">
      <h1 className="mb-4 font-semibold">{data.length} Birthdays Today</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex mb-6 items-center gap-2  flex-wrap"
      >
        <div className="w-full  flex flex-col gap-1">
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            className="text-xs py-1 w-full rounded pl-2 outline-none"
            type="text"
            placeholder="Enter Name"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="w-[40%] flex flex-col gap-1">
          <input
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 1, message: "Age must be positive" },
            })}
            className="text-xs py-1 rounded pl-2 w-full outline-none"
            type="number"
            placeholder="Age"
          />
          {errors.age && (
            <span className="text-red-500 text-xs">{errors.age.message}</span>
          )}
        </div>
        <div className="flex-grow">
          <input
            {...register("image", {
              required: "Image URL is required",
              validate: {
                isUrl: (val) =>
                  val.startsWith("http") ||
                  "Image URL must start with http/https",
              },
            })}
            className="text-xs py-1 rounded pl-2 w-full outline-none"
            type="text"
            placeholder="Give image URL"
          />
          {errors.image && (
            <span className="text-red-500 text-xs">{errors.image.message}</span>
          )}
        </div>
        <input
          className="text-xs  cursor-pointer bg-blue-500 text-white px-3 py-1 rounded outline-none"
          type="submit"
          value="Create"
        />
      </form>
      {data && data.length > 0 ? (
        data.map((val) => (
          <div key={val.id} className="flex mb-4 items-center justify-between ">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-black overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={val.image}
                  alt={`Portrait of ${val.name}`}
                />
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-sm font-semibold leading-none tracking-tight">
                  {val.name}
                </h2>
                <p className="text-sm leading-none tracking-tight">
                  {val.age} years
                </p>
              </div>
            </div>
            <button
              onClick={() => handledelete(val.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <h1>No Birthdays</h1>
      )}
      {data.length > 0 && (
        <button
          onClick={handleRemoveAll}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Remove All
        </button>
      )}
    </div>
  );
};

export default Birthday;
