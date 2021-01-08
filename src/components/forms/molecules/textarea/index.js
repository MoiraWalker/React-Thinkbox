import React from 'react';
import { Label } from "../../atoms";
import './index.scss';

export const TextArea = ({name, placeholder, cols, rows, label }) => {
  return (
      <div className="text-area">
          <Label name={name} >{label}</Label>
          <textarea placeholder={placeholder} rows={rows} cols={{cols}} id={name} name={name} />
      </div>
  );
};