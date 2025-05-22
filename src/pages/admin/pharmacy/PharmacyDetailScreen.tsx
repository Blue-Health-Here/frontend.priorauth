import React, { useEffect, useRef, useState } from 'react'
import DataTable from '../../../components/common/DataTable'
import PharmacyDetailsCrad from './PharmacyDetailsCrad'
import { rquestDetailpageData } from '../../../utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchPharmacyDetails } from '../../../services/adminService'

const PharmacyDetailScreen: React.FC = () => {
  const [pharmacyDetails, setPharmacyDetails] = useState(null);
  const { pharmacyId } = useParams();
  const isPharmacyDetailFetched = useRef(false);
  const dispatch = useDispatch();
  // console.log(pharmacyId, "params");

  const fetchData = async () => {
    const response = await fetchPharmacyDetails(dispatch, pharmacyId); 
    setPharmacyDetails(response);
  }

  useEffect(() => {
    if (!isPharmacyDetailFetched.current) {
      fetchData();
      isPharmacyDetailFetched.current = true;
    }
  }, []);

  return (
    <div className="shadow-lg rounded-b-2xl">
      <PharmacyDetailsCrad details={pharmacyDetails} />
      <DataTable
        className="rounded-b-2xl rounded-t-none"
        title="Requests"
        columns={[
          { header: 'Medication', key: 'medication', width: '20%' },
          { header: 'Patient', key: 'patient', width: '20%' },
          { header: 'Prescriber', key: 'prescriber', width: '20%' },
          { header: 'Submitted On', key: 'submittedOn', width: '20%' },
          { header: 'Pharmacy', key: 'pharmacy', width: '20%' },
          { header: 'Status', key: 'status', width: '20%' },
        ]}
        data={rquestDetailpageData}
        customHeader
        isShadow={false}
        customHeaderButtonText="View All Requests"
        isPagination={true}
      />
    </div>
  )
}

export default PharmacyDetailScreen
