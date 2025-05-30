import { Form, Formik } from "formik";
import SelectField from "./form/SelectField";
import { Link } from "react-router-dom";
import TabCarousel from "./TabCarousel";
import ThemeButton from "./ThemeButton";

const RequestTableHeader = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between gap-4 pb-4">
                <Formik
                    initialValues={{ category: "", search: "" }}
                    onSubmit={() => { }}
                >
                    {() => (
                        <Form className="flex flex-col sm:flex-row md:min-w-64 flex-wrap text-grey gap-3 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px] w-full sm:w-auto">
                            <SelectField
                                className="border border-medium-stroke rounded-theme-r p-2 font-medium w-full sm:min-w-48"
                                parentClassName="flex-1 w-full sm:w-auto"
                                name="sort"
                                options={[
                                    { value: "sortby", label: "Sort By" },
                                    { value: "desc", label: "Desc" },
                                ]}
                            />
                            <SelectField
                                className="border border-medium-stroke rounded-theme-r p-2 font-medium w-full sm:min-w-48"
                                parentClassName="flex-1 w-full sm:w-auto"
                                name="filter"
                                options={[
                                    { value: "filterby", label: "Filter By" },
                                    { value: "name", label: "Name" },
                                ]}
                            />
                        </Form>
                    )}
                </Formik>
                <Link to="/admin/requests/add"><ThemeButton className="w-full sm:w-40 rounded-theme-r" variant="primary">Add Request</ThemeButton></Link>
            </div>
            <TabCarousel />
        </>
    )
};

export default RequestTableHeader;