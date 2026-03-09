import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Menu from './Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useMenuRoot from '../hooks/useMenuRoot';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DataSource, getData, saveData } from '../models/DataSource';
import Typography from '@mui/material/Typography';

function App() {
  const { root, onReplace } = useMenuRoot();
  const [dataSource, setDataSource] = useState<DataSource>(DataSource.Memory);
  const [dataSourceTarget, setDataSourceTarget] = useState<DataSource>(DataSource.Memory);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  console.log("datasource = " + DataSource[dataSource]);

  useEffect(() => {
    console.log("Reloading tree...");
    const tree = getData(dataSource);
    onReplace(tree);
  }, [dataSource]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  const onDataSourceChange = useCallback((event: SelectChangeEvent<DataSource>) => {
    setDataSource(event.target.value);
  }, [setDataSource]);

  const onDataSourceTargetChange = useCallback((event: SelectChangeEvent<DataSource>) => {
    setDataSourceTarget(event.target.value);
  }, [setDataSourceTarget]);

  const onSaveClick = useCallback(() => {
    saveData(dataSourceTarget, root);
  }, [dataSourceTarget, root]);

  return (
    <div className="App">
      <FormControl
        sx={{ display: "block", width: "150px", marginBottom: "30px" }}
      >
        <InputLabel id="select-storage-label">Storage</InputLabel>
        <Select
          size='small'
          value={dataSource}
          label="storage"
          labelId="select-storage-label"
          onChange={onDataSourceChange}
        >
          <MenuItem value={DataSource.Memory}>{DataSource[DataSource.Memory]}</MenuItem>
          <MenuItem value={DataSource.LocalStorage}>{DataSource[DataSource.LocalStorage]}</MenuItem>
          <MenuItem value={DataSource.SessionStorage}>{DataSource[DataSource.SessionStorage]}</MenuItem>
          <MenuItem value={DataSource.Cookies}>{DataSource[DataSource.Cookies]}</MenuItem>
          <MenuItem value={DataSource.IndexedDB}>{DataSource[DataSource.IndexedDB]}</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ marginBottom: "5px" }} size="large" variant={isMenuOpen ? "contained" : "outlined"} onClick={toggleMenu} endIcon={<ArrowDropDownIcon />}>
        Menu
      </Button>
      {isMenuOpen && <Menu menu={root} isDisplayed={isMenuOpen} direction={'downwards'} />}
      <br />
      <FormControl
        sx={{ width: "150px", marginTop: "30px", marginRight: "10px", marginBottom: "30px" }}
      >
        <InputLabel id="select-target-label">Target</InputLabel>
        <Select
          size='small'
          value={dataSourceTarget}
          label="target"
          labelId="select-target-label"
          onChange={onDataSourceTargetChange}
        >
          <MenuItem value={DataSource.Memory}>{DataSource[DataSource.Memory]}</MenuItem>
          <MenuItem value={DataSource.LocalStorage}>{DataSource[DataSource.LocalStorage]}</MenuItem>
          <MenuItem value={DataSource.SessionStorage}>{DataSource[DataSource.SessionStorage]}</MenuItem>
          <MenuItem value={DataSource.Cookies}>{DataSource[DataSource.Cookies]}</MenuItem>
          <MenuItem value={DataSource.IndexedDB}>{DataSource[DataSource.IndexedDB]}</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ marginTop: "32px" }} variant={"contained"} onClick={onSaveClick}>
        Save
      </Button>
      <br />
      <Typography>* Local Storage size limit is 5MB per origin. when it clears?</Typography>
      <Typography>* Session Storage size limit is 5MB-10MB per origin. when it clears?</Typography>
    </div>
  );
}

export default App;
