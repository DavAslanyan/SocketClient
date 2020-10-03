import selector from "./selector";

export const getPropsFromState = (state, fields) => {
    const selectorState = selector(state);
    const props={};
    fields.forEach(field=>{
        props[field]=selectorState?.[field]
    })
    return props;
};


export const mapStateToProps = state => selector(state);

