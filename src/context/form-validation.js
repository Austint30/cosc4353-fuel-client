import React, { useContext, cloneElement, createContext } from "react";
import { Form } from "react-bootstrap";

export const FormValidatorContext = createContext({
    errors: {}
})

export const FormValidatorProvider = ({ children, validationData }) => {
    
    return <FormValidatorContext.Provider value={{
        errors: validationData.errors || {}
    }}>
        {children}
    </FormValidatorContext.Provider>
}

export const FormControlWrapper = ({ name, children }) => {
    const { errors } = useContext(FormValidatorContext);

    let feedback = [];

    if (errors[name]){
        let msg = errors[name]?.msg || errors[name] || null;
        feedback.push(<Form.Control.Feedback key={name} type="invalid">{msg}</Form.Control.Feedback>)
    }

    return <>
        {cloneElement(React.Children.only(children), { isInvalid: errors[name] ? true : false })}
        {feedback}
    </>
}