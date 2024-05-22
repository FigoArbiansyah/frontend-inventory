import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';

interface CategoryModalFormProps {
  visible: boolean;
  onClose: () => void;
  initialValues: any;
  onSave: (values: any) => void;
  loading: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .nullable()
    .required('Nama kategori harus diisi'),
  description: Yup.string()
    .nullable()
    .notRequired(),
});

const CategoryModalForm: React.FC<CategoryModalFormProps> = ({ visible, onClose, initialValues, onSave, loading }) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          // same shape as initial values
          formikBag.setSubmitting(true);
          onSave(values);
          formikBag.setSubmitting(false);
          formikBag.resetForm();
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
          values,
          setFieldValue,
          handleSubmit,
          isValid,
          dirty,
          isSubmitting,
          handleReset,
        }) => (
          <Dialog
            open={visible}
            onClose={onClose}
            fullWidth={true}
          >
            <DialogTitle>Tambah Kategori</DialogTitle>
            <DialogContent>
              <div className='grid gap-3 pt-3'>
                <div>
                  <TextField
                    label="Nama"
                    variant="outlined"
                    color='info'
                    type='text'
                    required
                    // value={values?.name}
                    onChange={(event) => {
                      setFieldValue('name', event?.target?.value, true);
                    }}
                    style={{
                      width: '100%'
                    }}
                  />
                  {errors?.name && (
                    <div className="pl-1">
                      <FormHelperText error>
                        {errors?.name?.toString()}
                      </FormHelperText>
                    </div>
                  )}
                </div>
                <div>
                  <TextField
                    label="Deskripsi"
                    variant="outlined"
                    color='info'
                    type='text'
                    name='description'
                    // value={values?.description}
                    onChange={(event) => {
                      setFieldValue('description', event?.target?.value, true);
                    }}
                    style={{
                      width: '100%'
                    }}
                  />
                  {errors?.description && (
                    <div className="pl-1">
                      <FormHelperText error>
                        {errors?.description?.toString()}
                      </FormHelperText>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <div className="p-3 flex gap-2">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleSubmit();
                    onClose();
                  }}
                  disabled={isSubmitting || !(dirty && isValid)}
                >
                  {loading ? 'LOADING' : 'SIMPAN'}
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </React.Fragment>
  );
}

export default CategoryModalForm;
