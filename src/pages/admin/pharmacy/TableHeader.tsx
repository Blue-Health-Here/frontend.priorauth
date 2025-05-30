import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import SelectField from "../../../components/common/form/SelectField";
import ThemeButton from "../../../components/common/ThemeButton";

const TableHeader = () => {
    return (
        <>
            <div className="flex justify-between gap-4 pb-4">
                <Formik
                    initialValues={{ sort: "", filter: "" }}
                    onSubmit={() => { }}
                >
                    {() => (
                        <Form className="flex md:min-w-64 flex-wrap text-grey gap-3 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                            <SelectField
                                className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48 rounded-theme-r"
                                parentClassName="flex-1"
                                name="sort"
                                options={[
                                    { value: "sortby", label: "Sort By" },
                                    { value: "abstergo", label: "Abstergo" },
                                ]}
                            />
                            <SelectField
                                className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48 rounded-theme-r"
                                parentClassName="flex-1"
                                name="filter"
                                options={[
                                    { value: "filterby", label: "Filter By" },
                                    { value: "name", label: "Name" },
                                ]}
                            />
                        </Form>
                    )}
                </Formik>
                <Link to="/admin/pharmacies/add"><ThemeButton className="w-full sm:w-40 rounded-theme-r" variant="primary">Add Pharmacy</ThemeButton></Link>
            </div>
        </>
    )
};

export default TableHeader;