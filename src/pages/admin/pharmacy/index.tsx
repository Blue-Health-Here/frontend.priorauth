import React, { useEffect, useRef } from 'react';
import PharmacyCard from './PharmacyCard';
import { Formik, Form } from 'formik';
import Button from '../../../components/common/Button';
import SelectField from '../../../components/common/form/SelectField';
import { Link } from 'react-router-dom';
import { pharmacies, tabs } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAllPharmacies } from '../../../services/adminService';

const AdminPharmacies: React.FC = () => {
  const { pharmaciesData } = useSelector((state: RootState) => state.adminPharmacies);
  const isReqsFetched = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReqsFetched.current) {
      (async () => {
        await fetchAllPharmacies(dispatch);
      })();
      isReqsFetched.current = true;
    }
  }, []);

  return (
    <div className="bg-primary-white p-4 sm:p-5 rounded-2xl shadow-[0px 0px 12px 0px rgba(0, 0, 0, 0.04)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Formik
          initialValues={{ category: "", search: "" }}
          onSubmit={() => { }}
        >
          {() => (
            <Form className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
              <SelectField
                className="border border-medium-stroke rounded-lg p-2 font-medium w-full sm:min-w-48 rounded-theme-r"
                parentClassName="w-full sm:w-auto"
                name="sort"
                options={[
                  { value: "sortby", label: "Sort By" },
                  { value: "operational", label: "Operational" },
                ]}
              />
              <SelectField
                className="border border-medium-stroke rounded-lg p-2 font-medium w-full sm:min-w-48 rounded-theme-r"
                parentClassName="w-full sm:w-auto"
                name="filter"
                options={[
                  { value: "filterby", label: "Filter By" },
                  { value: "operational", label: "Operational" },
                ]}
              />
            </Form>
          )}
        </Formik>
        <Link to="/admin/pharmacies/add" className="w-full sm:w-auto">
          <Button title="Add Pharmacy" className="w-full sm:w-40 rounded-theme-r" />
        </Link>
      </div>
      <div className="flex overflow-x-auto whitespace-nowrap py-4 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base 
                 transition-colors duration-200 cursor-pointer font-secondary
                 ${tab.active
                ? 'border-b-2 border-primary-sky-blue text-secondary-black font-medium'
                : 'text-tertiary-black hover:text-secondary-black'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-6 bg-primary-background rounded-b-2xl">
        {pharmacies.map((pharmacy: any) => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
        ))}
      </div>
    </div>
  );
};

export default AdminPharmacies;