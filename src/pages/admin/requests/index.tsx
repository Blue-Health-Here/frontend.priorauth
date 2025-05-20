import React, { useEffect, useRef } from 'react'
import DataTable from '../../../components/common/DataTable'
import { requestsDumyLargeData } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { fetchAllRequests } from '../../../services/adminService'

const AdminRequests: React.FC = () => {
    const { reqsData } = useSelector((state: RootState) => state.adminReqs);
    const isReqsFetched = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isReqsFetched.current) {
            (async () => {
                await fetchAllRequests(dispatch);
            })();
            isReqsFetched.current = true;
        }
    }, []);

    console.log(reqsData);

    return (
        <DataTable
            title="Requests"
            columns={[
                { header: 'Medication', key: 'medication', width: '20%' },
                { header: 'Patient', key: 'patient', width: '20%' },
                { header: 'Prescriber', key: 'prescriber', width: '20%' },
                { header: 'Submitted On', key: 'submittedOn', width: '20%' },
                { header: 'Pharmacy', key: 'pharmacy', width: '20%' },
                { header: 'Status', key: 'request_status', width: '20%' },
            ]}
            data={requestsDumyLargeData}
            customHeaderButtonLink="/admin/requests/add"
            customHeader
            customHeaderButtonText='Add Request'
            isPagination={true}
            className='requests-table'
            onStatusChange={(rowData, newStatus) => {
                console.log(rowData, newStatus, "new row and status")
                // Make your API call here
                // Example:
                // updateRequestStatus(rowData.id, newStatus);
            }}
        />
    )
}

export default AdminRequests;