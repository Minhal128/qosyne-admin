import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import config from '../../../config';

const AdminUserPage = () => {
    const [data, setData] = useState([]);
    const [currentView, setCurrentView] = useState("table");
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailContent, setEmailContent] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAccountSuspend = async (userId) => {
        try {
            await fetch(`${config.baseUrl}/user/toggle-deletion/${userId}`, { method: 'PATCH' });
            toast.success("Account Suspended");
            setData(prev => prev.map(user => user.id === userId ? { ...user, isDeleted: true } : user));
        } catch (error) {
            toast.error("Failed to suspend account");
        }
    };

    const handleReactivateAccount = async (userId) => {
        try {
            await fetch(`${config.baseUrl}/user/toggle-deletion/${userId}`, { method: 'PATCH' });
            toast.success("Account Reactivated");
            setData(prev => prev.map(user => user.id === userId ? { ...user, isDeleted: false } : user));
        } catch (error) {
            toast.error("Failed to reactivate account");
        }
    };

    const handleSendEmail = async () => {
        if (!selectedUser) return;
        try {
            const res = await fetch(`${config.baseUrl}/user/send-mail/${selectedUser.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: "talha@yopmail.com",
                    subject: "Message from Qosyne",
                    htmlContent: `<p>${emailContent}</p>`
                })
            });
            const result = await res.json();
            if (res.ok) toast.success("Email sent successfully");
            else toast.error(result.message);
        } catch (error) {
            toast.error("Failed to send email");
        } finally {
            setShowEmailModal(false);
            setEmailContent('');
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${config.baseUrl}/user/all`);
                const result = await res.json();
                setData(result.data);
                setFilteredUsers(result.data);
            } catch (err) {
                toast.error("Failed to fetch users");
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const results = data.filter(user =>
            user.name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.phoneNumber?.toLowerCase().includes(term) ||
            user.designation?.toLowerCase().includes(term) ||
            user.dateOfBirth?.toLowerCase().includes(term) ||
            user.connectedWallets?.some(wallet => wallet.provider?.toLowerCase().includes(term)) ||
            (user.isDeleted ? 'suspended' : 'active').includes(term)
        );
        setFilteredUsers(results);
    }, [searchTerm, data]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md">
                <div className="flex items-center space-x-2">
                    <button className="bg-[#F2F2F2] rounded-md px-5 py-2 text-sm">Filter</button>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="rounded-md bg-[#F9F9F9] px-3 w-[15rem] py-2 outline-none border" />
                </div>
                <div className="flex items-center space-x-2">
                    <div className='flex items-center gap-x-3 bg-[#FBFBFB] rounded-full p-2'>
                        <button onClick={() => setCurrentView("table")} className={`${currentView === "table" ? "bg-white border" : "text-[#616161]"} py-1 px-6 rounded-full text-sm`}>Table</button>
                        <button onClick={() => setCurrentView("charts")} className={`${currentView === "charts" ? "bg-white border" : "text-[#616161]"} py-1 px-6 rounded-full text-sm`}>Charts</button>
                    </div>
                    <button className="bg-[#F2F2F2] rounded-md px-5 py-2 text-sm">Sort</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">User</th>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">Contact Info</th>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">DOB</th>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">Designation</th>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">Wallet</th>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">Status</th>
                            <th className="py-2 px-4 border-b text-start text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map(user => (
                            <tr key={user?.id}>
                                <td className="py-2 px-4 border-b flex items-center space-x-2">
                                    {user?.pic && <img src={user?.pic} className="w-10 h-10 rounded-full object-cover" />}
                                    <div>
                                        <div className="text-sm font-semibold">{user?.name}</div>
                                        <div className="text-xs text-gray-500">{user?.email}</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b text-sm">{user?.phoneNumber || "-"}</td>
                                <td className="py-2 px-4 border-b text-sm">{user?.dateOfBirth || "-"}</td>
                                <td className="py-2 px-4 border-b text-sm">{user?.designation || "-"}</td>
                                <td className="py-2 px-4 border-b text-sm">{user?.connectedWallets?.map(i => (i?.provider + " "))}</td>
                                <td className="py-2 px-4 border-b text-sm">
                                    <span className={`px-2 py-1 rounded-md text-xs ${user.isDeleted ? 'bg-red-200 text-red-700' : 'bg-[#DCEDFF] text-[#007AFF]'}`}>
                                        {user.isDeleted ? 'Suspended' : 'Active'}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b text-sm flex gap-1 flex-col">
                                    {!user.isDeleted ? (
                                        <>
                                            <button onClick={() => handleAccountSuspend(user.id)} className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs">
                                                Suspend
                                            </button>
                                            <button onClick={() => { setSelectedUser(user); setShowEmailModal(true); }} className="bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs">
                                                Send Email
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleReactivateAccount(user.id)} className="bg-[#DCEDFF] text-[#007AFF] px-2 py-1 rounded text-xs">
                                            Reactivate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 w-[22rem] rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Send Email to {selectedUser?.email}</h2>
                        <textarea
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            placeholder="Write your message..."
                            rows={6}
                            className="w-full border px-3 py-2 text-sm rounded"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setShowEmailModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleSendEmail} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserPage;
