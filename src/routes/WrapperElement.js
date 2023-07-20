import React, {Suspense} from "react";

export const WrapperElement = (Component) => (props) => {
    return (
    <Suspense fallback={<div />} >
        <Component {...props} />
    </Suspense>);
};