import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import { FaUsers, FaUserSlash } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { FaDeleteLeft } from 'react-icons/fa6';

const AdminHomePage = () => {

    const [data, setData] = useState({ totalUser: [], totalTransaction: [], declineTransactions: [], unverifiedAccount: [], });
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [lastMonthEarnings, setLastMonthEarnings] = useState(0);

    const fetchDashboardData = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/admin/dashboard-stats`);
            const result = res.data.data;
            setData({
                totalUser: result.totalUser,
                totalTransaction: result.totalTransaction,
                declineTransactions: result.declineTransactions,
                unverifiedAccount: result.unverifiedAccount,
            });
            setTotalEarnings(parseFloat(result.totalEarnings).toFixed(2));
            setLastMonthEarnings(parseFloat(result.lastMonthEarnings).toFixed(2));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };


    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div>

            <div className="flex justify-between items-center gap-x-4 overflow-x-auto">

                <div className="min-w-[20rem] h-[5rem] rounded-xl border bg-[#34C759] flex items-center gap-x-4 text-white px-5">
                    <FaUsers className="text-[1.8rem]" />
                    <div>
                        <p className="text-[#F3F3F3]">Total User</p>
                        <p className="text-white text-2xl font-medium">{data?.totalUser?.length}</p>
                    </div>
                </div>

                <div className="min-w-[20rem] h-[5rem] rounded-xl border bg-[#FFCC00] flex items-center gap-x-4 text-white px-5">
                    <GrTransaction className="text-[1.8rem]" />
                    <div>
                        <p className="text-[#F3F3F3]">Total Transacations</p>
                        <p className="text-white text-2xl font-medium">{data?.totalTransaction?.length}</p>
                    </div>
                </div>

                <div className="min-w-[20rem] h-[5rem] rounded-xl border bg-[#FF3B30] flex items-center gap-x-4 text-white px-5">
                    <FaDeleteLeft className="text-[1.8rem]" />
                    <div>
                        <p className="text-[#F3F3F3]">Decline Transacations</p>
                        <p className="text-white text-2xl font-medium">{data?.declineTransactions?.length}</p>
                    </div>
                </div>

                <div className="min-w-[20rem] h-[5rem] rounded-xl border bg-[#5856D6] flex items-center gap-x-4 text-white px-5">
                    <FaUserSlash className="text-[1.8rem]" />
                    <div>
                        <p className="text-[#F3F3F3]">Unverified Account</p>
                        <p className="text-white text-2xl font-medium">{data?.unverifiedAccount?.length}</p>
                    </div>
                </div>

            </div>

            <div className="flex gap-4 mt-7">
                <div className="w-[25rem] h-[10rem] p-4 bg-[#30b0c7] rounded-xl text-white">
                    <p className="mb-2">Total Earnings</p>
                    <p className="text-[1.6rem] font-medium">${totalEarnings}</p>

                    <p className="mt-5 text-[#34ff67]">
                        {lastMonthEarnings > 0
                            ? `+${(((totalEarnings - lastMonthEarnings) / lastMonthEarnings) * 100).toFixed(2)}%`
                            : totalEarnings > 0
                                ? '+100.00%'
                                : '+0.00%'
                        }
                        <span className="text-white"> than last month</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AdminHomePage;