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
    return JSON.parse(serializedTree);
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
    return JSON.parse(serializedTree);
  } catch (error) {
    console.error("Could not parse tree from session storage:", error);
    return null;
  }
}

function getDataFromCookie() {
  try {
    let name = "treeData=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let components = decodedCookie.split(';');
    for (let c of components) {
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        const serializedTree = c.substring(name.length, c.length);
        return JSON.parse(serializedTree);
      }
    }
    return null;
  } catch (error) {
    console.error("Could not parse tree from cookie:", error);
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
      return getDataFromCookie();
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

function saveDataToCookie(treeObject: TreeNode) {
  try {
    const name = 'treeData';
    const serializedTree = JSON.stringify(treeObject);

    const d = new Date();
    const daysToExpire = 2;
    d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    document.cookie = `${name}=${serializedTree};${expires};path=/`;
  } catch (error) {
    console.error("Could not save tree to cookie:", error);
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
      saveDataToCookie(data);
      break;
    case DataSource.IndexedDB:
      break;
    default:
      throw Error("No such datasource exists");
  }
}