
import React from 'react';
import styled from 'styled-components';

import {Grid, Text} from './index';

const Input = (props) => {
    
    const {label, width, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit, margin} = props;
    
    if (multiLine) {
        return (
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                <ElTextarea
                rows={13}
                value={value}
                placeholder={placeholder}
                onChange={_onChange}
                ></ElTextarea>
            </Grid>
            );
        }


    
    return (
        <React.Fragment>
            <Grid>
            {label && <Text margin="0px">{label}</Text>}
            {is_submit ? (
                <ElInput
                type={type}
                placeholder={placeholder}
                onChange={_onChange}
                value={value}
                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        onSubmit(e);
                    }
                }} />
            ) : (
                <ElInput margin={margin} width={width} type={type} placeholder={placeholder} onChange={_onChange} />
            )}
            </Grid>
        </React.Fragment>
    );
};

Input.defaultProps = {
    multiLine:false,
    label: false,
    placeholder: "입력해주세요",
    type: "text",
    value:"",
    is_submit:false,
    width:false,
    margin:false,
    onSubmit: () => {},
    _onChange:() => {},
};

const ElTextarea = styled.textarea`
    border: 1px solid #212121;
    width: ${(props) => props.width};
    padding: 12px 4px;
    box-sizing: border-box;
`;

const ElInput = styled.input`
    border: 1px solid #24292e;
    border-radius: 8px;
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    padding: 12px 4px;
    box-sizing: border-box;
`;


export default Input;
