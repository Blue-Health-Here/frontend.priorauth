import { Form, Formik } from "formik";
import SelectField from "./form/SelectField";
import Button from "./Button";
import { Link } from "react-router-dom";

const RequestTableHeader = () => {
    return (
        <div className="flex justify-between gap-4 pb-4">
            <Formik
                initialValues={{ category: "", search: "" }}
                onSubmit={() => { }}
            >
                {() => (
                    <Form className="flex md:min-w-64 flex-wrap text-grey gap-3 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                        <SelectField
                            className="border border-medium-stroke rounded-theme-r p-2 font-medium min-w-48"
                            parentClassName="flex-1"
                            name="sort"
                            options={[
                                { value: "sortby", label: "Sort By" },
                                { value: "operational", label: "Operational" },
                            ]}
                        />
                        <SelectField
                            className="border border-medium-stroke rounded-theme-r p-2 font-medium min-w-48"
                            parentClassName="flex-1"
                            name="filter"
                            options={[
                                { value: "filterby", label: "Filter By" },
                                { value: "operational", label: "Operational" },
                            ]}
                        />
                    </Form>
                )}
            </Formik>
            <Link to="/admin/requests/add"><Button title="Add Request" className="w-full sm:w-40 rounded-theme-r" /></Link>
        </div>
    )
};

export default RequestTableHeader;