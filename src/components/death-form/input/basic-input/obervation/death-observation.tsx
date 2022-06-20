import { TextArea } from 'carbon-components-react';
import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ObsFieldProps {
    name: string;
    labelText: string;
    id: string;
    className?: string;
}

export const TextAreaInput: React.FC<ObsFieldProps> = ({ id, name, labelText, className }) => {
    const { t } = useTranslation();
    const [field, meta] = useField(name);

    return (
        <TextArea
            {...field}
            id={id}
            name={name}
            labelText={t("secondeCause", labelText)}
            cols={50}
            rows={4}
            value={field.value || ""}
        />
    );
};
