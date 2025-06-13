import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../../../lib/axios";
import { DisplayErrors } from "../../../utils";
import { useQuery } from "@tanstack/react-query";
export default function AddBookingModel({
  isOpen,
  onClose,
  onSuccess,
  refetch,
  product,
  isEditMode,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      itinerary: "",
      duration: "",
      inclusions: [""],
      exclusions: [""],
      price: "",
      images: [""],
      videos: "",
      destination: "",
      type: "",
      availability: [{ date: "", availableSpots: "", pricePerPerson: "" }],
    },
  });
  const { data: trips } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await api.get("/trips");
      return response.data.data;
    },
  });
  const cleanData = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => {
        return (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0) &&
          !(typeof value === "number" && isNaN(value))
        );
      })
    );
  };
  const onSubmit = async (data) => {
    const cleanedData = cleanData(data);
    try {
      if (product && isEditMode) {
        await api.put(`/bookings/${product._id}`, cleanedData);
        toast.success("Booking updated successfully");
      } else {
        await api.post("/bookings", cleanedData);
        toast.success("Booking added successfully");
      }
      refetch();
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.log(error);
      DisplayErrors(error);
    }
  };
  useEffect(() => {
    if (isEditMode && product) {
      Object.entries(product).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset();
    }
  }, [product, isEditMode, setValue, reset]);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {isEditMode ? "Edit Product" : "Add Product"}
                    </Dialog.Title>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="userName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          userName
                        </label>
                        <input
                          type="text"
                          {...register("userName", {
                            required: "userName is required",
                            minLength: {
                              value: 2,
                              message: "userName must be at least 2 characters",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.userName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.userName.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            userEmail
                          </label>
                          <input
                            type="email"
                            {...register("userEmail")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.userEmail && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.userEmail.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="userPhone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            userPhone
                          </label>
                          <input
                            type="tel"
                            {...register("userPhone")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="totalPaid"
                            className="block text-sm font-medium text-gray-700"
                          >
                            totalPaid
                          </label>
                          <input
                            type="totalPaid"
                            {...register("totalPaid", {
                              required: "totalPaid is required",
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.totalPaid && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.totalPaid.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="sitesBooked"
                            className="block text-sm font-medium text-gray-700"
                          >
                            sitesBooked
                          </label>
                          <input
                            type="sitesBooked"
                            {...register("sitesBooked", {
                              required: "sitesBooked is required",
                              valueAsNumber: true,
                              maxLength: 10,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.sitesBooked && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.sitesBooked.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="trip"
                          className="block text-sm font-medium text-gray-700"
                        >
                          trip
                        </label>
                        <select
                          {...register("tripId", {
                            required: true,
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a trip</option>
                          {trips?.map((trip, index) => (
                            <option key={index} value={trip._id}>
                              {trip.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="paymentMethod"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Payment Mehtods
                        </label>
                        <select
                          {...register("paymentMethod", {
                            required: true,
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a paymentMethod</option>
                          <option value="credit_card">credit card</option>
                          <option value="usdt">USDT</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="notes"
                          className="block text-sm font-medium text-gray-700"
                        >
                          notes
                        </label>
                        <textarea
                          {...register("notes", {
                            required: "notes is required",
                            maxLength: {
                              value: 200,
                              message: "notes must be less than 200 characters",
                            },
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.notes && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.notes.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {isSubmitting
                        ? isEditMode
                          ? "Editing"
                          : "Adding..."
                        : isEditMode
                        ? "Edit"
                        : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg- md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
