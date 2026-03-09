import MenuRootWrapper from '../data/menus-data';
import { TreeNode } from './TreeNode';

export enum DataSource {
  'Memory',
  'LocalStorage',
  'SessionStorage',
  'Cookies',
  'IndexedDB'
}

function getDataFromLocalStorage() {
  const serializedTree = localStorage.getItem('treeData');
  if (serializedTree === null) {
    return null;
  }

  try {
    const treeObject = JSON.parse(serializedTree);
    return treeObject;
  } catch (error) {
    console.error("Could not parse tree from local storage:", error);
    return null;
  }
}

function getDataFromSessionStorage() {
  const serializedTree = sessionStorage.getItem('treeData');
  if (serializedTree === null) {
    return null;
  }

  try {
    const treeObject = JSON.parse(serializedTree);
    return treeObject;
  } catch (error) {
    console.error("Could not parse tree from session storage:", error);
    return null;
  }
}


export function getData(dataSource: DataSource) {
  switch (dataSource) {
    case DataSource.Memory:
      return MenuRootWrapper.root;
    case DataSource.LocalStorage:
      return getDataFromLocalStorage();
    case DataSource.SessionStorage:
      return getDataFromSessionStorage();
    case DataSource.Cookies:
      return null;
    case DataSource.IndexedDB:
      return null;
    default:
      throw Error("No such datasource exists");
  }
}

function saveToMemory(treeObject: TreeNode) {
  MenuRootWrapper.root = treeObject;
}

function saveDataToLocalStorage(treeObject: TreeNode) {
  try {
    const serializedTree = JSON.stringify(treeObject);
    localStorage.setItem('treeData', serializedTree);
  } catch (error) {
    console.error("Could not save tree to local storage:", error);
  }
}

function saveDataToSessionStorage(treeObject: TreeNode) {
  try {
    const serializedTree = JSON.stringify(treeObject);
    sessionStorage.setItem('treeData', serializedTree);
  } catch (error) {
    console.error("Could not save tree to session storage:", error);
  }
}

export function saveData(dataSource: DataSource, data: TreeNode) {
  switch (dataSource) {
    case DataSource.Memory:
      saveToMemory(data);
      break;
    case DataSource.LocalStorage:
      saveDataToLocalStorage(data);
      break;
    case DataSource.SessionStorage:
      saveDataToSessionStorage(data);
      break;
    case DataSource.Cookies:
      break;
    case DataSource.IndexedDB:
      break;
    default:
      throw Error("No such datasource exists");
  }
}