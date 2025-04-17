import { Link } from "react-router";
import useGetItmes from "../../../hooks/useGetProducts";
import DeleteConfirmationModal from "../models/DeleteConfirmationModal";
import useModalState from "../../../hooks/useModalState";
import AddBookingModel from "../models/AddBookingModel";
export default function Bookings() {
  const {
    isOpen,
    selectedItem,
    isEditMode,
    isDeleteModalOpen,
    onClose,
    handleEdit,
    handleDelete,
    handleAdd,
  } = useModalState();
  const { data, isLoading, error, refetch } = useGetItmes("bookings");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">⚠️ Error: {error.message}</div>;
  }

  return (
    <div className="container m-auto min-h-[100vh] py-5">
      <div className="sm:flex sm:items-center ">
        <div className="sm:flex-auto flex items-center">
          <Link className="cursor-pointer" to="/admin">
            X
          </Link>
          <h1 className="ms-2 text-2xl font-semibold text-gray-900">Bookins</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            onClick={() => handleAdd()}
          >
            Add Booking
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    trip Id
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    userName
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    userEmail
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    userPhone
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    sitesBooked
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    totalPaid
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    paymentMethod
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    isConfirmed
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    notes
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((product, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product?.tripName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.userName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.userEmail}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.userPhone}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.sitesBooked}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.totalPaid}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.paymentMethod}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.isConfirmed ? "true" : "false"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.notes}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        refetch={refetch}
        message="Are you sure you want to delete this product? This action cannot be undone."
        model={"bookings"}
        doc={selectedItem}
      />
      <AddBookingModel
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        isEditMode={isEditMode}
        product={selectedItem}
      />
    </div>
  );
}
