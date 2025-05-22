import React from "react";
import { MedicationDetails } from "./MedicationDetails";
import { DataGrid } from "./MedicationDetails";

const RequestDetails: React.FC = () => {
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with buttons */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-bold text-gray-800">UBRELVY 50MG TAB</h2>
        <div className="flex gap-3">
          <button className="text-secondary-navy-blue bg-[#EBF1FF] hover:bg-blue-100 font-semibold text-xs sm:text-sm cursor-pointer rounded-md px-4 py-2 transition-colors border-0">
            Open Portal
          </button>
          <button className="text-white bg-primary-navy-blue hover:bg-blue-800 text-xs sm:text-sm cursor-pointer rounded-md px-6 py-3.5 transition-colors">
            Submit Progress Notes
          </button>
        </div>
      </div>

      {/* Main content area with cards and sections */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Medication Details Cards */}
        <div className="flex-1 max-w-3xl space-y-6">
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

        {/* Right side - DOS, Status, Notes, and Files sections */}
        <div className="md:w-110 flex-shrink-0 space-y-6">
          {/* DOS Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 sticky top-6">
            <div className="grid grid-cols-3 gap-4">
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
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CMM Key 2
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  BM8DJD89
                </p>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-[#EBF1FF] px-3 py-1">
              <h3 className="text-lg font-semibold text-gray-800">Status</h3>
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
                    Fax form is ready Submission to insurance is pending MD's signature
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

          {/* Notes Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-[#EBF1FF] px-3 py-1">
              <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
            </div>
            <div className="p-4">
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700">Notes</p>
              </div>
              <textarea
                className="w-full h-32 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text here..."
              />
            </div>
          </div>

          {/* Files Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-[#EBF1FF] px-3 py-1">
              <h3 className="text-lg font-semibold text-gray-800">Files</h3>
            </div>
            <div className="p-4 space-y-4">
              {/* Upload text (not a button) */}
              <p className="text-sm font-medium text-gray-800">Upload</p>
              
              {/* File drop area with solid border */}
              <div className="border border-gray-300 rounded-lg p-4 text-center bg-gray-50">
                <p className="text-sm text-gray-500">Drag files here or browse</p>
              </div>

              {/* File Categories */}
              <div className="space-y-4">
                {/* Progress Notes */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Upload Progress Notes</p>
                    <p className="text-xs text-gray-500">Fax Form To Be Signed By MD</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">No Attachments Available</span>
                    <button className="text-primary-navy-blue text-xs font-medium px-3 py-1 border border-primary-navy-blue rounded-md">
                      Attach Files
                    </button>
                  </div>
                </div>

                {/* Letter of Medical Necessity */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Letter of Medical Necessity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">No Attachments Available</span>
                    <button className="text-primary-navy-blue text-xs font-medium px-3 py-1 border border-primary-navy-blue rounded-md">
                      Attach Files
                    </button>
                  </div>
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