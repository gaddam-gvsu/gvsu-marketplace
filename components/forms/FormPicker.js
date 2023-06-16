import React from "react";
import { useFormikContext } from "formik";
import Picker from "../Picker";

function FormPicker({ items, name, numberOfColumns, placeholder, width, PickerItemComponent }) {
    const { setFieldValue, values } = useFormikContext();

    return (
        <>
            <Picker
                items={items}
                numberOfColumns={numberOfColumns}
                onSelectItem={(item) => setFieldValue(name, item)}
                PickerItemComponent={PickerItemComponent}
                placeholder={placeholder}
                selectedItem={values[name]}
                width={width}
            />
        </>
    );
}

export default FormPicker;



