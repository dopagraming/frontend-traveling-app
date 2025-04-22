import { Link } from "react-router";
import useGetItmes from "../../../hooks/useGetProducts";
import AddTripModel from "../models/AddTrip";
import DeleteConfirmationModal from "../models/DeleteConfirmationModal";
import useModalState from "../../../hooks/useModalState";
import AddCategoryModel from "../models/AddCategoryModel";
export default function ManageCategories() {
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
  const { data, isLoading, error, refetch } = useGetItmes("categories");

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
          <h1 className="ms-2 text-2xl font-semibold text-gray-900">
            Categories
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            onClick={() => handleAdd()}
          >
            Add Trip
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto overflow-y-auto max-h-[80vh] sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    title
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((category) => (
                  <tr key={category._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {category?.title}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(category)}
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
        message="Are you sure you want to delete this Category? This action cannot be undone."
        model={"categories"}
        doc={selectedItem}
      />
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        isEditMode={isEditMode}
        category={selectedItem}
      />
    </div>
  );
}
