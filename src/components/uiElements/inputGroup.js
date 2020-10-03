import React, {useState} from "react";
import {Select, TreeSelect} from "antd";
import "../../assets/styles/components/uiElements/inputGroup.scss";
//Import Images
import {ReactComponent as ArrowDownIcon} from '../../assets/images/icons/ic_arrow_down.svg';

const {Option} = Select;

// const customizeRenderEmpty = () => (
//     <div style={{textAlign: 'center'}}>
//         <Icon type={'dashboard'} style={{fontSize: 20}}/>
//         <p>Data Not Found</p>
//     </div>
// );

export function InputGroup(props) {
    const {
        label, type, inputType, name, className, placeholder, error, options, autocomplete = "on", onKeyDown,
        defValue, step, onChange, onSearch, value, minValue, maxLength, autoFocus, resizable, disabled
    } = props;
    const [selectOpen, toggleSelectVisibility] = useState(false);
    return <div className="custom-input-group" id={name}>

        {label && <label>{label}</label>}
        {inputType === "input" && type !== "number" && type !== "checkbox" && type !== "password" &&
        <>
            <input type={type} name={name} placeholder={placeholder} maxLength={maxLength}
                   value={value || ''} defaultValue={defValue} onChange={onChange} autoComplete={'off'}
                   autoFocus={autoFocus} onKeyDown={onKeyDown} disabled={!!disabled}
                   className={`${className} ${error ? "invalid" : ""}`}/>
            {props.children}
        </>}

        {inputType === "input" && type === "password" &&
        <>
            <input type={type} name={name} placeholder={placeholder} maxLength={maxLength}
                   value={value || ''} defaultValue={defValue} onChange={onChange}
                   autoFocus={autoFocus} autoComplete={autocomplete} onKeyDown={onKeyDown}
                   className={`${className} ${error ? "invalid" : ""}`}/>
            {props.children}
        </>}

        {inputType === "input" && type === "number" &&
        <input type={type} name={name} value={value || ''} min={minValue}
               step={step} onChange={onChange}
               placeholder={placeholder}
               className={`${className} ${error ? "invalid" : ""}`}/>}

        {inputType === "input" && type === "checkbox" &&
        <input type={type} name={name} checked={value} onChange={onChange}/>}

        {inputType === "textarea" &&
        <textarea name={name} placeholder={placeholder} value={value || ''}
                  defaultValue={defValue} onChange={onChange} maxLength={maxLength}
                  className={`${className} ${error ? "invalid" : ""} ${resizable ? "resizable" : ""}`}/>}

        {inputType === "select" && props.onPopupScroll &&

        <Select
            value={value}
            showSearch={props.showSearch ??true}
            defaultOpen={false}
            style={{width: '100%'}}
            placeholder={placeholder}
            onPopupScroll={props.onPopupScroll}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={false}
            getPopupContainer={() => document.getElementById(name)}
            onDropdownVisibleChange={(value) => toggleSelectVisibility(value)}
            suffixIcon={<ArrowDownIcon
                className={`custom-suffix-icon ${selectOpen ? 'rotate' : ''}`}
            />}
            className={`custom-select ${props.className || ''} ${error ? "invalid" : ""}`}
        >
            {!!value && props.onClear && <Option value={undefined}>Clear</Option>}
            {options && !!options.length && options.map((item, index) => {
                return <Option key={index}
                               value={item?.id}>{item?.name}</Option>
            })}
        </Select>
        }

        {inputType === "select" && !props.onPopupScroll &&
        // <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Select
            value={value}
            showSearch={props.showSearch ??true}
            defaultOpen={false}
            showArrow={true}
            mode={type || 'default'}
            style={{width: '100%'}}
            placeholder={placeholder}
            onChange={onChange}
            visible={true}
            onDropdownVisibleChange={(value) => toggleSelectVisibility(value)}
            suffixIcon={<ArrowDownIcon
                className={`custom-suffix-icon ${selectOpen ? 'rotate' : ''}`}
            />}
            notFoundContent={props.notFoundContent}
            optionFilterProp="children"
            filterOption={(input, option) =>{
              return   option.props.children && option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
            getPopupContainer={() => document.getElementById(name)}
            className={`custom-select ${props.className || ''} ${error ? "invalid" : ""}`}
        >
            {!!value && props.onClear && <Option value={undefined}>Clear</Option>}
            {options && !!options.length && options.map((item, index) => {
                return <Option key={index}
                               value={item?.id}
                               className={item.child ? 'child-option' : ''}>
                    {item?.name}
                </Option>
            })}
        </Select>
            // </ConfigProvider>
        }
        {inputType === "tree-select" &&
        // <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <div className={'tree-select-wrapper'}>
            <ArrowDownIcon
                className={`tree-suffix-icon ${selectOpen ? 'rotate' : ''}`}
            />
            <TreeSelect
                value={value}
                onChange={onChange}
                showSearch={false}
                treeCheckable={true}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                showCheckedStrategy={props.showCheckedStrategy || 'SHOW_ALL'}
                placeholder={placeholder}
                onDropdownVisibleChange={(value) => toggleSelectVisibility(value)}
                style={{width: '100%'}}
                getPopupContainer={() => document.getElementById(name)}
                className={`custom-select tree-select ${props.className || ''} ${error ? "invalid" : ""}`}
                treeData={options}/>
        </div>
            // </ConfigProvider>
        }
        {inputType === "wrapper" &&
        <> {props.children}</>
        }
    </div>
}
