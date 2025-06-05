import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import SelectField from "../../../components/common/form/SelectField";
import ThemeButton from "../../../components/common/ThemeButton";

const TableHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 pb-6">
            <Formik
                initialValues={{ sort: "", filter: "" }}
                onSubmit={() => { }}
            >
                {() => (
                    <Form className="flex flex-col sm:flex-row w-full sm:w-auto gap-5">
                        <SelectField
                            className="border border-medium-stroke rounded-lg p-2 font-medium w-full sm:min-w-48 rounded-theme-r"
                            parentClassName="flex-1"
                            name="sort"
                            options={[
                                { value: "sortby", label: "Sort By" },
                                { value: "abstergo", label: "Abstergo" },
                            ]}
                        />
                        <SelectField
                            className="border border-medium-stroke rounded-lg p-2 font-medium w-full sm:min-w-48 rounded-theme-r"
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
            <Link to="/admin/pharmacies/add" className="w-full sm:w-auto">
                <ThemeButton className="w-full sm:w-40 rounded-theme-r" variant="primary">Add Pharmacy</ThemeButton>
            </Link>
        </div>
    )
};

export default TableHeader;