import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import transactionAPI from '../../../helpers/transactionApi';
import TransactionFilters from '../../../components/admin/TransactionFilters';
import TransactionTable from '../../../components/admin/TransactionTable';
import TransactionStats from '../../../components/admin/TransactionStats';
import Pagination from '../../../components/admin/Pagination';

// Error Boundary Component - Removed to eliminate error displays

const AdminTransactionPage = () => {
    // Transaction data state
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 25
    });
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isStatsLoading, setIsStatsLoading] = useState(false);

    // Filter state
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        provider: '',
        userId: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 25
    });

    // Tax settings state (keeping existing functionality)
    const [taxModel, setTaxModel] = useState(false);
    const [taxData, setTaxData] = useState({
        revenueStreamCost: '',
        qosneWalletFee: ''
    });

    // Download transaction data
    const downloadData = useCallback((transaction) => {
        const fileData = JSON.stringify(transaction, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `transaction-${transaction.id}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Transaction data downloaded');
    }, []);

    // Fetch transactions with current filters
    const fetchTransactions = useCallback(async (newFilters = filters) => {
        setIsLoading(true);
        try {
            const params = {
                page: newFilters.page,
                limit: newFilters.limit,
                ...(newFilters.status && { status: newFilters.status }),
                ...(newFilters.provider && { provider: newFilters.provider }),
                ...(newFilters.userId && { userId: newFilters.userId }),
                ...(newFilters.startDate && { startDate: newFilters.startDate }),
                ...(newFilters.endDate && { endDate: newFilters.endDate })
            };

            const response = await transactionAPI.getAllTransactions(params);
            
            if (response.status_code === 200) {
                console.log('📊 Full response:', response);
                let transactionData = response.data.transactions || [];
                console.log('📊 Transaction data:', transactionData);
                console.log('📊 Pagination data:', response.data.pagination);
                
                // Apply client-side search filter if provided
                if (newFilters.search) {
                    const searchTerm = newFilters.search.toLowerCase();
                    transactionData = transactionData.filter(txn =>
                        (txn.id?.toString().includes(searchTerm)) ||
                        (txn.paymentId?.toLowerCase().includes(searchTerm)) ||
                        (txn.sender?.name?.toLowerCase().includes(searchTerm)) ||
                        (txn.sender?.firstName?.toLowerCase().includes(searchTerm)) ||
                        (txn.sender?.lastName?.toLowerCase().includes(searchTerm)) ||
                        (txn.sender?.email?.toLowerCase().includes(searchTerm)) ||
                        (txn.connectedWallet?.fullName?.toLowerCase().includes(searchTerm)) ||
                        (txn.connectedWallet?.accountEmail?.toLowerCase().includes(searchTerm)) ||
                        (txn.connectedWallet?.provider?.toLowerCase().includes(searchTerm)) ||
                        (txn.transactionRecipient?.recipientName?.toLowerCase().includes(searchTerm)) ||
                        (txn.amount?.toString().includes(searchTerm)) ||
                        (txn.currency?.toLowerCase().includes(searchTerm)) ||
                        (txn.provider?.toLowerCase().includes(searchTerm)) ||
                        (txn.type?.toLowerCase().includes(searchTerm)) ||
                        (txn.status?.toLowerCase().includes(searchTerm))
                    );
                }
                
                setTransactions(transactionData);
                const paginationData = {
                    currentPage: response.data.pagination?.currentPage || 1,
                    totalPages: response.data.pagination?.totalPages || 1,
                    totalCount: response.data.pagination?.totalCount || transactionData.length,
                    hasNextPage: response.data.pagination?.hasNextPage || false,
                    hasPrevPage: response.data.pagination?.hasPrevPage || false,
                    limit: response.data.pagination?.limit || newFilters.limit
                };
                console.log('📊 Setting pagination:', paginationData);
                setPagination(paginationData);
            } else if (response.status_code === 500) {
                // Handle server errors gracefully
                console.warn('Server error, using fallback data:', response.error);
                toast.error(`Server error: ${response.error || 'Backend is currently unavailable'}`);
                setTransactions(response.data.transactions || []);
                setPagination(response.data.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    totalCount: 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                    limit: newFilters.limit
                });
            } else {
                throw new Error(response.message || 'Failed to fetch transactions');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error(`Failed to load transactions: ${error.message}`);
            setTransactions([]);
            setPagination({
                currentPage: 1,
                totalPages: 0,
                totalCount: 0,
                hasNextPage: false,
                hasPrevPage: false,
                limit: newFilters.limit
            });
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // Fetch transaction statistics
    const fetchStats = useCallback(async () => {
        setIsStatsLoading(true);
        try {
            const params = {
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate }),
                ...(filters.provider && { provider: filters.provider })
            };

            const response = await transactionAPI.getTransactionStats(params);
            
            if (response.status_code === 200) {
                console.log('📈 Stats response:', response);
                console.log('📈 Stats data:', response.data);
                setStats(response.data);
            } else if (response.status_code === 500) {
                // Handle server errors gracefully
                console.warn('Server error fetching stats, using fallback data:', response.error);
                toast.error(`Stats unavailable: ${response.error || 'Backend is currently unavailable'}`);
                setStats(response.data || null);
            } else {
                throw new Error(response.message || 'Failed to fetch statistics');
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            toast.error(`Failed to load statistics: ${error.message}`);
            setStats(null);
        } finally {
            setIsStatsLoading(false);
        }
    }, [filters.startDate, filters.endDate, filters.provider]);

    // Update transaction status
    const handleStatusUpdate = useCallback(async (transactionId, newStatus, reason = '') => {
        try {
            const response = await transactionAPI.updateTransactionStatus(transactionId, newStatus, reason);
            
            if (response.status_code === 200) {
                // Update the transaction in the local state
                setTransactions(prev => 
                    prev.map(t => 
                        t.id === transactionId 
                            ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
                            : t
                    )
                );
                
                // Refresh stats to reflect the change
                fetchStats();
                
                return response;
            } else {
                throw new Error(response.message || 'Failed to update transaction status');
            }
        } catch (error) {
            console.error('Error updating transaction status:', error);
            throw error;
        }
    }, [fetchStats]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters) => {
        const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
        setFilters(updatedFilters);
    }, [filters]);

    // Handle pagination
    const handlePageChange = useCallback((newPage) => {
        const updatedFilters = { ...filters, page: newPage };
        setFilters(updatedFilters);
    }, [filters]);

    // Clear all filters
    const handleClearFilters = useCallback(() => {
        const clearedFilters = {
            search: '',
            status: '',
            provider: '',
            userId: '',
            startDate: '',
            endDate: '',
            page: 1,
            limit: 25
        };
        setFilters(clearedFilters);
    }, []);

    // Tax settings functions (keeping existing functionality)
    const handleTaxChange = (e) => {
        const { name, value } = e.target;
        setTaxData(prev => ({ ...prev, [name]: value }));
    };

    const fetchTaxSettings = async () => {
        try {
            const res = await fetch(`${transactionAPI.baseUrl}/tax-settings`);
            const json = await res.json();
            if (json.data) setTaxData(json.data);
        } catch (err) {
            toast.error('Failed to load tax settings');
        }
    };

    const saveTaxSettings = async () => {
        try {
            const res = await fetch(`${transactionAPI.baseUrl}/tax-settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taxData)
            });
            const result = await res.json();
            if (res.ok) toast.success('Tax settings saved');
            else toast.error(result.message);
        } catch (err) {
            toast.error('Save failed');
        } finally {
            setTaxModel(false);
        }
    };

    // Effects
    useEffect(() => {
        fetchTransactions(filters);
    }, [filters.page, filters.limit, filters.status, filters.provider, filters.userId, filters.startDate, filters.endDate]);

    useEffect(() => {
        // Debounce search to avoid too many API calls
        const timeoutId = setTimeout(() => {
            if (filters.search !== undefined) {
                fetchTransactions(filters);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filters.search]);

    useEffect(() => {
        fetchStats();
        fetchTaxSettings();
    }, [fetchStats]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTransactions(filters);
            fetchStats();
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchTransactions, fetchStats, filters]);

    try {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Transaction Monitoring</h1>
                        <p className="text-gray-600">Monitor and manage all payment transactions</p>
                    </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={() => {
                            fetchTransactions(filters);
                            fetchStats();
                        }}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                    </button>
                    <button 
                        onClick={() => setTaxModel(true)} 
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
                    >
                        Tax Settings
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <TransactionStats stats={stats} isLoading={isStatsLoading} />

            {/* Filters */}
            <TransactionFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isLoading={isLoading}
            />

            {/* Transaction Table */}
            <TransactionTable 
                transactions={transactions}
                isLoading={isLoading}
                onStatusUpdate={handleStatusUpdate}
                onDownload={downloadData}
            />

            {/* Pagination */}
            <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalCount={pagination.totalCount}
                limit={pagination.limit}
                onPageChange={handlePageChange}
                isLoading={isLoading}
            />

            {taxModel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 w-[22rem] rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Update Tax Model</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Revenue Stream Cost (%)</label>
                            <input type="text" name="revenueStreamCost" value={taxData.revenueStreamCost} onChange={handleTaxChange} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">QoSNE Wallet Monthly Fee (%)</label>
                            <input type="text" name="qosneWalletFee" value={taxData.qosneWalletFee} onChange={handleTaxChange} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>

                        <div className="flex space-x-2">
                            <button className="flex-1 bg-gray-200 px-4 py-2 rounded" onClick={() => setTaxModel(false)}>Cancel</button>
                            <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded" onClick={saveTaxSettings}>Save</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
        );
    } catch (error) {
        console.error('❌ Component render error:', error);
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Transaction Monitoring</h1>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default AdminTransactionPage;
