import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface CategoryTableProps {
  rows: []|any;
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: 'iter', headerName: 'No', type: 'number', width: 90 },
  { field: 'name', headerName: 'Kategori', width: 175 },
  { field: 'description', headerName: 'Deskripsi', width: 300 },
];

const CategoryTable: React.FC<CategoryTableProps> = ({ rows, loading }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row?.iter}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        loading={loading}
      />
    </div>
  );
}

export default CategoryTable;
