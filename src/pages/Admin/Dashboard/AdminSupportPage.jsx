import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import config from '../../../config';

const AdminSupportPage = () => {
    const [supportData, setSupportData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSupport, setFilteredSupport] = useState([]);

    const fetchSupportRequests = async () => {
        try {
            const res = await fetch(`${config.baseUrl}/support/all`);
            const json = await res.json();
            setSupportData(json.data || []);
            setFilteredSupport(json.data || []);
        } catch (err) {
            toast.error('Failed to fetch support requests');
        }
    };

    useEffect(() => {
        fetchSupportRequests();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = supportData.filter(item =>
            item.name?.toLowerCase().includes(term) ||
            item.email?.toLowerCase().includes(term) ||
            item.subject?.toLowerCase().includes(term) ||
            item.message?.toLowerCase().includes(term) ||
            item.transactionId?.toString().includes(term)
        );
        setFilteredSupport(filtered);
    }, [searchTerm, supportData]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search support requests..."
                    className="rounded-md bg-[#F9F9F9] px-3 w-[20rem] py-2 outline-none border"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-md font-medium">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">ID</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">User</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">Email</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">Subject</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">Message</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">Transaction ID</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSupport.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-sm text-gray-500">
                                    No support requests found.
                                </td>
                            </tr>
                        ) : (
                            filteredSupport.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b text-sm">{item.id}</td>
                                    <td className="py-2 px-4 border-b text-sm">{item.name}</td>
                                    <td className="py-2 px-4 border-b text-sm">{item.email}</td>
                                    <td className="py-2 px-4 border-b text-sm">{item.subject}</td>
                                    <td className="py-2 px-4 border-b text-sm whitespace-pre-line max-w-md">{item.message.slice(0, 100)}...</td>
                                    <td className="py-2 px-4 border-b text-sm">{item.transactionId || '—'}</td>
                                    <td className="py-2 px-4 border-b text-sm">{new Date(item.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSupportPage;
