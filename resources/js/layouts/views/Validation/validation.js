import React from "react";
import { isEmail, isEmpty } from "validator";

export const required = value => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">This field is required</small>
    );
  }
};

export const emailMail = value => {
  if (!isEmail(value)) {
    return (
      <small className="form-text text-danger">Invalid email format</small>
    );
  }
};

export const minLength = value => {
  if (value.trim().length < 6) {
    return (
      <small className="form-text text-danger">
        Password must be at least 6 characters long
      </small>
    );
  }
};
export const minFirstName = value => {
  if (value.trim().length < 1) {
    return (
      <small className="form-text text-danger">
        Firstname must be at least 1 character
      </small>
    );
  }
};
export const minLastName = value => {
  if (value.trim().length < 1) {
    return (
      <small className="form-text text-danger">
        Lastname must be at least 1 character
      </small>
    );
  }
};
export const minPhone = value => {
  if (value.trim().length < 9) {
    return (
      <small className="form-text text-danger">
        Phonenumber must be at least 9 characters
      </small>
    );
  }
};
export const minAddress = value => {
  if (value.trim().length < 6) {
    return (
      <small className="form-text text-danger">
        Address must be at least 6 characters
      </small>
    );
  }
};
export const maxPhone = value => {
  if (value.trim().length > 11) {
    return (
      <small className="form-text text-danger">
        Phonenumber must be less than 11 characters
      </small>
    );
  }
};
export const maxAddress = value => {
  if (value.trim().length > 255) {
    return (
      <small className="form-text text-danger">
        Address must be less than 255 characters
      </small>
    );
  }
};
export const maxLength = value => {
  if (value.trim().length > 60) {
    return (
      <small className="form-text text-danger">
        Password must be less than 60 characters
      </small>
    );
  }
};
export const maxFirstName = value => {
  if (value.trim().length > 60) {
    return (
      <small className="form-text text-danger">
        Firstname must be less than 60 characters
      </small>
    );
  }
};
export const maxLastName = value => {
  if (value.trim().length > 60) {
    return (
      <small className="form-text text-danger">
        LastName must be less than 60 characters
      </small>
    );
  }
};
export const specialValue = value => {
  if (
    !/[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/.test(
      value
    )
  ) {
    return (
      <small className="form-text text-danger">
        Password can not contain special characters
      </small>
    );
  }
};

export const maxNumber = value => {
  if (value > 10) {
    return <small className="form-text text-danger">Maximum is 10</small>;
  }
};

export const minNumber = value => {
  if (value < 0) {
    return <small className="form-text text-danger">Minimum is 0</small>;
  }
};

export const maxTeam = value => {
  if (value.trim().length > 60) {
    return (
      <small className="form-text text-danger">
        Team name must be less than 60 characters
      </small>
    );
  }
};
