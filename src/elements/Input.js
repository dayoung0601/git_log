// Input.js
import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";


const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine } = props;

  if (multiLine) {
    return (
      <React.Fragment>
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea
            placeholder={placeholder}
            onChange={_onChange}
            rows={10}
          />
        </Grid>
      </React.Fragment>
    );
  } 

  return (
    <React.Fragment>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
