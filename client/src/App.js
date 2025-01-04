import React from 'react';
import RegisterPlayerForm from './components/RegisterPlayerForm';
import CreateAssetForm from './components/CreateAssetForm';
import AssetTable from './components/AssetTable';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>BATTLEGAME - React Demo Full CRUD</h1>
      <p>Demo gọi API Azure Functions in-memory</p>

      <RegisterPlayerForm />
      <CreateAssetForm />
      <AssetTable />
    </div>
  );
}

export default App;
