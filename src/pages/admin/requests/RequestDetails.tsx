import React, { useState } from "react";
import { MedicationDetails } from "./MedicationDetails";
import { DataGrid } from "./MedicationDetails";
import ProgressNotesModal from "./ProgressNotesModal";

const RequestDetails: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const medicationData: DataGrid = [
    [
      ["Rx#", "669516-0"],
      ["NDC", "00642-7470-01"],
      ["Days", "28"],
    ],
    [
      ["Qty", "28"],
      ["Medication Dosing", "-"],
      ["Drug Dosage Form", "Tablet"],
    ],
  ];

  const patientData: DataGrid = [
    [
      ["Patient Name", "CHENG,MICHELLE"],
      ["Member ID", "728597627"],
      ["DOB", "05-30-2000"],
    ],
    [
      ["Patient Address", "50 LOCKWOOD DR"],
      ["Patient City", "CLIFTON"],
      ["Patient ZipCode", "07013"],
    ],
  ];

  const insuranceData: DataGrid = [
    [
      ["Insurance", "AMERIGROUP"],
      ["From", "-"],
      ["Insurance Phone", "833-207-3115"],
    ],
    [
      ["Help Desk Number", "1-800-454-3730"],
      ["PCN", "WP"],
      ["BIN", "020107"],
    ],
    [
      ["Group", "WKPA"],
      ["", ""],
      ["", ""],
    ],
  ];

  const pharmacyData: DataGrid = [
    [
      ["Pharmacy", "Silvercare Pharmacy"],
      ["Fax Number", "(866)-407-2417"],
      ["Prescriber", "VIERA, RUBIA"],
    ],
    [
      ["NPI", "1063228229"],
      ["Prescriber Address", "1033 US HWY STE 102"],
      ["Prescriber City", "CLIFTON"],
    ],
    [
      ["Prescriber ZipCode", "07013-2448"],
      ["Prescriber Phone", "963-779-7979"],
      ["Prescriber Fax", "973-779-7979"],
    ],
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <ProgressNotesModal isOpen={isModalOpen} onClose={closeModal} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <h2 className="text-lg font-bold text-gray-800">UBRELVY 50MG TAB</h2>
        <div className="flex gap-3 self-end sm:self-auto">
          <button className="text-secondary-navy-blue bg-[#EBF1FF] hover:bg-blue-100 font-semibold text-xs sm:text-sm cursor-pointer rounded-md px-3 sm:px-4 py-2 transition-colors border-0">
            Open Portal
          </button>
          <button
            onClick={openModal}
            className="text-white bg-primary-navy-blue hover:bg-blue-800 text-xs sm:text-sm cursor-pointer rounded-md px-4 sm:px-6 py-2 sm:py-3.5 transition-colors"
          >
            Submit Progress Notes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:flex-1 lg:max-w-3xl space-y-6">
          <MedicationDetails title="Medication" data={medicationData} />
          <MedicationDetails title="Patient Information" data={patientData} />
          <MedicationDetails
            title="Insurance Information"
            data={insuranceData}
          />
          <MedicationDetails
            title="Pharmacy and Prescriber"
            data={pharmacyData}
          />
        </div>

        <div className="w-full lg:w-110 lg:flex-shrink-0 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 lg:sticky lg:top-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  DOS
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  5/5/2025
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CMM Key
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">-</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CMM Key 2
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  BM8DJD89
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-[#EBF1FF] px-3 py-0.5">
              <h3 className="text-md font-semibold text-gray-800">Status</h3>
            </div>
            <div className="space-y-6 px-4 pb-4 pt-6">
              <div className="border-l-2 border-gray-300 pl-3">
                <span className="inline-block bg-[#F5F5F5] text-sm font-medium text-[#7A7A7A] px-3 py-1 rounded-md">
                  Process Appeal
                </span>
              </div>

              <div className="border-l-2 border-gray-300 pl-3">
                <p className="text-xs text-gray-500 mb-1">25-02-2025</p>
                <div>
                  <span className="inline-block bg-[#DBFFEF] text-sm font-medium text-[#19AD4B] px-3 py-1 rounded-md">
                    Updated Progress Sent
                  </span>
                  <p className="text-xs text-gray-600 mt-2 pl-1">
                    Fax form is ready Submission to insurance is pending MD's
                    signature
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-gray-300 pl-3">
                <p className="text-xs text-gray-500 mb-1">25-02-2025</p>
                <span className="inline-block bg-[#E0F2FE] text-sm font-medium text-[#0369A1] px-3 py-1 rounded-md">
                  Process Appeal
                </span>
              </div>

              <div className="border-l-2 border-gray-300 pl-3">
                <p className="text-xs text-gray-500 mb-1">25-02-2025</p>
                <span className="inline-block bg-[#FFE5E0] text-sm font-medium text-[#C2410C] px-3 py-1 rounded-md">
                  Error In Initiation
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-[#EBF1FF] px-3 py-0.5">
              <h3 className="text-md font-semibold text-gray-800">Notes</h3>
            </div>
            <div className="p-4">
              <div className="mb-2">
                <p className="text-sm font-medium text-[#7A7A7A]">Notes</p>
              </div>
              <textarea
                className="w-full h-32 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text here..."
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-[#EBF1FF] px-3 py-0.5">
              <h3 className="text-md font-semibold text-gray-800">Files</h3>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm font-medium text-[#7A7A7A]">Upload</p>

              <div className="border border-gray-300 rounded-lg p-4 text-center ">
                <p className="text-sm text-gray-500">
                  Drag files here or browse
                </p>
              </div>

              <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                      Upload Progress Notes
                    </p>
                    <div className="p-[1.5px] rounded-md bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]">
                      <div className="bg-white p-1 rounded-md flex items-center justify-center">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <defs>
                            <linearGradient
                              id="arrowGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#F8A8AA" />
                              <stop offset="25%" stopColor="#FFA5E0" />
                              <stop offset="50%" stopColor="#FFDFD7" />
                              <stop offset="75%" stopColor="#FFB126" />
                              <stop offset="100%" stopColor="#FF512B" />
                            </linearGradient>
                          </defs>
                          <path
                            stroke="url(#arrowGradient)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#7A7A7A]">
                  Fax Form To Be Signed By MD
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 p-3 py-3.5 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-gray-500">
                      No Attachment Available
                    </p>
                  </div>
                  <button className="flex items-center justify-center gap-1 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-3 sm:py-[14px] rounded-lg transition-colors">
                    Attach Files
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#7A7A7A]">
                  Letter of Medical Necessity
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 p-3 py-3.5 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-gray-500">
                      No Attachment Available
                    </p>
                  </div>
                  <button className="flex items-center justify-center gap-1 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-3 sm:py-[14px] rounded-lg transition-colors">
                    Attach Files
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;