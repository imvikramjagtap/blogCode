import axios from "axios";
import { toast } from "react-toastify";
import { Api_URL } from "../API_URL";

export default function Admin({ allUser }) {
  const roleChangeHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${Api_URL}/api/users/` + e.target.id, {
        role: e.target.value,
      });
      toast.success("Role Updated");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      {allUser && (
        <div className="flex justify-center py-10 text-center">
          <table className="table-fixed w-[80%] rounded-lg">
            <thead className="bg-slate-500 text-slate-200 h-14 rounded-lg">
              <tr className="">
                <th className="">Username</th>
                <th className="">Account Creation Date</th>
                <th className="">Role</th>
              </tr>
            </thead>
            {allUser.map((use) => (
              <tbody className="" key={use._id}>
                <tr className="border h-10">
                  <td className="">{use.username}</td>
                  <td className="border">
                    {new Date(use.createdAt).toDateString()}
                  </td>
                  <td className="flex items-center py-2 justify-center gap-10">
                    <select
                      className="w-40 py-auto border rounded-lg"
                      id={use._id}
                      name="role"
                      onChange={roleChangeHandler}
                    >
                      <option value={use.role}>{use.role}</option>
                      <option value="admin">admin</option>
                      <option value="editor">editor</option>
                      <option value="user">user</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </>
  );
}
