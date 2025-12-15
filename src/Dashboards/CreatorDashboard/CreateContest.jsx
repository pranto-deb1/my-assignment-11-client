import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hoocks/UseAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { toast } from "react-toastify";

const CreateContest = () => {
  const { user } = UseAuth();
  const [selectDate, setSelectDate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = UseAxiosSecure();

  const handleCreateContest = async (data) => {
    if (!selectDate) {
      toast.error("Please select a deadline");
      return;
    }

    data.deadline = selectDate;
    data.createdAt = new Date();
    data.creatorEmail = user.email;

    try {
      const res = await axiosSecure.post("/contests", data);

      if (res.data?.insertedId) {
        toast.success("Contest created successfully");
        reset();
        setSelectDate(null);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto my-10">
      <form onSubmit={handleSubmit(handleCreateContest)} className="">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
          Enter Contest Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <input
              type="text"
              {...register("name")}
              placeholder="Contest Name"
              className="input w-full"
            />
            <input
              type="text"
              {...register("image")}
              placeholder="Contest Thumbnail URL"
              className="input w-full"
            />
            <input
              type="number"
              {...register("price")}
              placeholder="Contest Price"
              className="input w-full"
            />
            <input
              type="number"
              {...register("prize")}
              placeholder="Contest Prize"
              className="input w-full"
            />
            <textarea
              {...register("taskInstruction")}
              placeholder="Task Instructions"
              className="input w-full h-24 resize-none"
            ></textarea>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            <label className="label font-semibold">Contest Type</label>
            <select
              {...register("type")}
              className="select w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select Contest Type
              </option>
              <option value="Game Testing">Game Testing</option>
              <option value="Designing">Designing</option>
              <option value="Creation">Creation</option>
              <option value="Gaming">Gaming</option>
            </select>

            <label className="label font-semibold">Set Deadline</label>
            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="input w-full"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <input
            type="submit"
            value="Create Contest"
            className="btn btn-primary text-white px-8 py-3 font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
