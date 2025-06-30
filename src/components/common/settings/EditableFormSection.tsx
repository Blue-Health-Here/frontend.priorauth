import { Formik, Form } from "formik"
import ThemeButton from "@/components/common/ThemeButton"
import DataPoint from "./DataPoint"
import SectionTitleGrid from "./SectionTitleGrid"
import { FiCalendar, FiCheckCircle, FiClock, FiEdit, FiHome, FiMail, FiMapPin, FiPhone, FiUsers, FiXCircle } from "react-icons/fi"

interface Props {
    initialValues: any
    validationSchema: any
    onCancel: () => void
    onEdit: () => void
    onSubmit: (values: any) => void;
    profileData?: any;
    isEditingProfile?: any;
}

export default function EditableFormSection({ initialValues, validationSchema, onCancel, onSubmit, profileData, isEditingProfile, onEdit }: Props) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => (
                <Form className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">A</span>
                                </div>
                                {isEditingProfile && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <FiEdit className="w-3 h-3 text-primary-foreground" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <DataPoint
                                    name="name"
                                    data={profileData.name}
                                    isEditing={isEditingProfile}
                                    type="text"
                                />
                                <p className="text-sm text-muted-foreground">Medical Organization</p>
                            </div>
                        </div>

                        {!isEditingProfile ? (
                            <ThemeButton onClick={onEdit} variant="outline" className="gap-2">
                                <FiEdit className="w-4 h-4" />
                                Edit Details
                            </ThemeButton>
                        ) : (
                            <div className="flex gap-2">
                                <ThemeButton type="submit">
                                    <FiCheckCircle className="w-4 h-4" />
                                    Save Changes
                                </ThemeButton>
                                <ThemeButton type="button" variant="tertiary" onClick={onCancel}>
                                    Cancel
                                </ThemeButton>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DataPoint icon={<FiCalendar />} label="Joined Date" data={profileData.joinedDate} name="joinedDate" />
                            <DataPoint icon={<FiClock />} label="Last Request" data={profileData.lastRequest} name="lastRequest" />
                        </div>

                        <SectionTitleGrid title="Contact Information">
                            <DataPoint
                                icon={<FiPhone />}
                                label="Phone Number"
                                name="phoneNumber"
                                data={profileData.phoneNumber}
                                isEditing={isEditingProfile}
                                type="tel"
                            />
                            <DataPoint
                                icon={<FiMail />}
                                label="Email"
                                name="email"
                                data={profileData.email}
                                isEditing={isEditingProfile}
                                type="email"
                            />
                            <DataPoint
                                icon={<FiMapPin />}
                                label="Location"
                                name="location"
                                data={profileData.location}
                                isEditing={isEditingProfile}
                            />
                            <DataPoint
                                icon={<FiHome />}
                                label="Full Address"
                                name="fullAddress"
                                data={profileData.fullAddress}
                                isEditing={isEditingProfile}
                            />
                        </SectionTitleGrid>

                        <SectionTitleGrid title="Account Statistics">
                            <DataPoint icon={<FiCheckCircle />} label="Approved Requests" name="approvedRequests" data={profileData.approvedRequests} />
                            <DataPoint icon={<FiXCircle />} label="Denied Requests" name="deniedRequests" data={profileData.deniedRequests} />
                            <DataPoint icon={<FiUsers />} label="Prescribers" name="prescribers" data={profileData.prescribers} />
                        </SectionTitleGrid>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
