import React, { useState } from 'react';
import PharmacyCard from './PharmacyCard';
import Pagination from '../../../components/common/Pagination';
import { Formik, Form } from 'formik';
import Button from '../../../components/Button/Button';
import SelectField from '../../../components/common/form/SelectField';
import { pharmacies, tabs } from '../../../constants';
import { Link } from 'react-router-dom';

const AdminPharmacies: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className="bg-primary-background rounded-2xl shadow-xs min-h-[calc(100vh-15rem)]">
        <div className="bg-primary-white p-5 rounded-t-2xl">
          <div className="flex flex-col md:flex-col lg:flex-row gap-4">
            <h1 className="text-lg md:text-xl font-semibold flex-1 text-nowrap lg:text-2xl">
              Pharmacies
            </h1>
            <Formik
              initialValues={{ category: "", search: "" }}
              onSubmit={() => { }}
            >
              {() => (
                <Form className="flex md:min-w-64 flex-wrap pb-6 text-grey gap-3 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                  <SelectField
                    className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48"
                    parentClassName="flex-1"
                    name="sort"
                    options={[
                      { value: "sortby", label: "Sort By" },
                      { value: "operational", label: "Operational" },
                    ]}
                  />
                  <SelectField
                    className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48"
                    parentClassName="flex-1"
                    name="filter"
                    options={[
                      { value: "filterby", label: "Filter By" },
                      { value: "operational", label: "Operational" },
                    ]}
                  />
                  <Button title="Add Pharmacy" className="w-full sm:w-48" isSmall />
                </Form>
              )}
            </Formik>
          </div>

          <div className="flex flex-wrap overflow-x-auto whitespace-nowrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base 
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
        </div>
        <Link to="/admin/pharmacies/details">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3 md:p-6">
            {pharmacies.map(pharmacy => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        </Link>
      </div>
        <Pagination
          currentPage={currentPage}
          totalEntries={4}
          entriesPerPage={4}
          onPageChange={setCurrentPage}
        />
    </>
  );
};

export default AdminPharmacies;
