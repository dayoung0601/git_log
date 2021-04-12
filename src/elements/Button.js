import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const { _onClick, is_float, radius, color, children, margin, width, bg, padding, size, border} =props;

    const styles = {
        margin:margin,
        width:width,
        padding:padding,
        size: size,
        radius: radius,
        bg:bg,
        border:border,
        color:color,
    }

    return (
        <ElButton onClick={_onClick} {...styles}>
            {children}
        </ElButton>
    );
};


Button.defaultProps = {
    children:null,
    _onClick: () => {},
    margin: false,
    width: "100%",
    size: "10px",
    padding: "12px 0px",
    radius: "4px",
    bg:"#24292e",
    border:false,
    color:false,
}

const ElButton = styled.button`
    width: ${(props) => props.width};
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    font-size: ${(props) => props.size};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.radius};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Button;