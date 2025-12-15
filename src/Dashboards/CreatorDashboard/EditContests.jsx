import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hoocks/UseAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const EditContests = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [selectDate, setSelectDate] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (contest && contest._id) {
      setValue("name", contest.name);
      setValue("image", contest.image);
      setValue("price", contest.price);
      setValue("prize", contest.prize);
      setValue("taskInstruction", contest.taskInstruction);
      setValue("type", contest.type);

      if (contest.deadline) {
        const deadlineDate = new Date(contest.deadline);
        setSelectDate(deadlineDate);
      }
    }
  }, [contest, setValue]);

  const handleUpdateContest = async (data) => {
    if (!selectDate) {
      toast.error("Please select a deadline");
      return;
    }

    const updatedContest = {
      ...data,
      deadline: selectDate,
      status: contest.status || "pending",
      creatorEmail: user.email,
    };

    try {
      const res = await axiosSecure.patch(
        `/edit-contests/${id}`,
        updatedContest
      );

      if (res.data?.modifiedCount > 0) {
        toast.success("Contest updated successfully");
        navigate("/creator-dashboard/my-contests");
      } else {
        toast.info("No changes were made or update failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong during update");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Loading contest details...</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto my-10">
      <form onSubmit={handleSubmit(handleUpdateContest)} className="">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
          Edit Contest: {contest?.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Contest Name"
              className="input w-full input-bordered"
            />
            <input
              type="text"
              {...register("image", { required: true })}
              placeholder="Contest Thumbnail URL"
              className="input w-full input-bordered"
            />
            <input
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
              placeholder="Contest Price"
              className="input w-full input-bordered"
            />
            <input
              type="number"
              {...register("prize", { required: true, valueAsNumber: true })}
              placeholder="Contest Prize"
              className="input w-full input-bordered"
            />
            <textarea
              {...register("taskInstruction")}
              placeholder="Task Instructions"
              className="textarea w-full h-24 resize-none textarea-bordered"
            ></textarea>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            <label className="label font-semibold">Contest Type</label>
            <select
              {...register("type", { required: true })}
              className="select w-full select-bordered"
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
              className="input w-full input-bordered"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <input
            type="submit"
            value="Update Contest"
            className="btn btn-primary text-white px-8 py-3 font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default EditContests;
