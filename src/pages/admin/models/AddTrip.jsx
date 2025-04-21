import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../../../lib/axios";
import { DisplayErrors } from "../../../utils";
export default function AddTripModel({
  isOpen,
  onClose,
  onSuccess,
  refetch,
  trip,
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
      itinerary: [""],
      duration: "",
      inclusions: [""],
      exclusions: [""],
      price: "",
      images: [""],
      video: "",
      destination: "",
      tripRoute: [""],
      type: "",
      availability: [{ date: "", availableSpots: "", spotsNumber: "" }],
      ratingsAverage: "",
      ratingQuantity: "",
      tripLanguage: "",
    },
  });

  const {
    fields: availabilityFields,
    append: appendAvailability,
    remove: removeAvailability,
  } = useFieldArray({
    control,
    name: "availability",
  });
  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control,
    name: "itinerary",
  });
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });
  const {
    fields: tripRouteFields,
    append: appendTripRoute,
    remove: removeTripRoute,
  } = useFieldArray({
    control,
    name: "tripRoutes",
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
      if (trip && isEditMode) {
        await api.put(`/trips/${trip._id}`, cleanedData);
        toast.success("Trip updated successfully");
      } else {
        await api.post("/trips", cleanedData);
        toast.success("Trip added successfully");
      }
      refetch();
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      DisplayErrors(error);
    }
  };
  useEffect(() => {
    if (isEditMode && trip) {
      Object.entries(trip).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset();
    }
  }, [trip, isEditMode, setValue, reset]);
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
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          {...register("title", {
                            required: "Title is required",
                            minLength: {
                              value: 2,
                              message: "Title must be at least 2 characters",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          {...register("description", {
                            required: "Description is required",
                            maxLength: {
                              value: 200,
                              message:
                                "Description must be less than 200 characters",
                            },
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          {...register("price", {
                            required: "Price is required",
                            valueAsNumber: [true, "price must be number"],
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.price.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="video"
                          className="block text-sm font-medium text-gray-700"
                        >
                          video
                        </label>
                        <input
                          type="file"
                          {...register("video")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3 text-gray-700">
                          Availability
                        </label>

                        {availabilityFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                          >
                            <input
                              type="date"
                              {...register(`availability.${index}.date`)}
                              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                            <input
                              type="number"
                              {...register(
                                `availability.${index}.availableSpots`
                              )}
                              placeholder="Spots"
                              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                {...register(
                                  `availability.${index}.spotsNumber`
                                )}
                                placeholder="Spots Number"
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                              <button
                                type="button"
                                onClick={() => removeAvailability(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            appendAvailability({
                              date: "",
                              availableSpots: "",
                              pricePerPerson: "",
                            })
                          }
                          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
                        >
                          + Add Availability
                        </button>
                      </div>

                      <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3 text-gray-700">
                          Trip Route
                        </label>

                        {tripRouteFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                          >
                            <input
                              type="text"
                              placeholder="Day"
                              {...register(`tripRoute.${index}.location`)}
                              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                              type="text"
                              placeholder="duration"
                              {...register(`tripRoute.${index}.duration`)}
                              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                              type="text"
                              placeholder="activity"
                              {...register(`tripRoute.${index}.activity`)}
                              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="col-span-2 flex gap-2">
                              <input
                                type="text"
                                placeholder="icon"
                                {...register(`tripRoute.${index}.icon`)}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={() => removeTripRoute(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            appendTripRoute({
                              day: "",
                              description: "",
                            })
                          }
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                          + Add Route
                        </button>
                      </div>
                      <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3 text-gray-700">
                          Itinerary
                        </label>

                        {itineraryFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                          >
                            <input
                              type="text"
                              placeholder="Day"
                              {...register(`itinerary.${index}.day`)}
                              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="col-span-2 flex gap-2">
                              <input
                                type="text"
                                placeholder="Description"
                                {...register(`itinerary.${index}.description`)}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={() => removeItinerary(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            appendItinerary({
                              day: "",
                              description: "",
                            })
                          }
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                          + Add Itinerary
                        </button>
                      </div>

                      <div>
                        <label
                          htmlFor="imageCover"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cover Image URL
                        </label>
                        <input
                          type="text"
                          {...register("imageCover", {
                            required: "image cover is required",
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="destination"
                          className="block text-sm font-medium text-gray-700"
                        >
                          destination
                        </label>
                        <input
                          type="text"
                          {...register("destination")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Trip type
                        </label>
                        <input
                          type="text"
                          {...register("type")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="tripLanguage"
                          className="block text-sm font-medium text-gray-700"
                        >
                          trip Language
                        </label>
                        <input
                          type="text"
                          {...register("tripLanguage")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="duration"
                          className="block text-sm font-medium text-gray-700"
                        >
                          duration
                        </label>
                        <input
                          type="text"
                          {...register("duration")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label>Images</label>
                        {imageFields?.map((field, index) => (
                          <div key={field.id} className="flex gap-2">
                            <input {...register(`images.${index}`)} />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => appendImage("")}>
                          + Add
                        </button>
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
