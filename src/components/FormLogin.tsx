import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, FormHelperText, Button } from '@mui/material';

interface SignInFormValues {
  email: string;
  password: string;
}

interface FormProps {
  onSave: (values: any) => void;
  initialValues: SignInFormValues;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format email tidak valid')
    .required('Email harus diisi'),
  password: Yup.string()
    .nullable()
    .required('Password harus diisi'),
})

const FormLogin: React.FC<FormProps> = ({ onSave, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikBag) => {
        // same shape as initial values
        formikBag.setSubmitting(true);
        onSave(values);
        console.log(values);
      }}
    >
      {({ errors, touched, values, setFieldValue, handleSubmit }) => (
        <div className='grid gap-3'>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              color='info'
              type='email'
              onChange={(event) => {
                setFieldValue('email', event?.target?.value, true);
              }}
              style={{
                width: '100%'
              }}
            />
            {errors?.email && (
              <div className="pl-1">
                <FormHelperText error>
                  {errors?.email}
                </FormHelperText>
              </div>
            )}
          </div>
          <div>
            <TextField
              label="Password"
              variant="outlined"
              color='info'
              type='password'
              onChange={(event) => {
                setFieldValue('password', event?.target?.value, true);
              }}
              style={{
                width: '100%'
              }}
            />
            {errors?.password && (
              <div className="pl-1">
                <FormHelperText error>
                  {errors?.password}
                </FormHelperText>
              </div>
            )}
          </div>
          <Button
            variant='contained'
            onClick={() => handleSubmit()}
          >
            MASUK
          </Button>
        </div>
      )}
    </Formik>
  )
};
export default FormLogin;