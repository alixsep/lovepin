import React, { useState } from 'react';
import axios from 'axios';

import './getDB.scss';

import { deleteDB, saveDB } from '../utils/database';

const GetDB = () => {
  const [buttonData, setButtonData] = useState({
    msg: 'S T A R T',
    percentage: 0,
  });

  const getDatabaseHandler = async () => {
    if (buttonData.percentage > 0) return null;
    setButtonData({
      msg: 'Starting download...',
      percentage: 0,
    });
    let url =
      window.location.origin +
      window.location.pathname +
      'static/assets/oxford5000.min.json';
    await deleteDB();
    await axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        progressEvent.srcElement.getResponseHeader('content-length');
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        let validation = percentCompleted >= 0 && percentCompleted <= 100;
        setButtonData({
          msg: validation ? `${percentCompleted}%` : 'Downloading...',
          percentage: percentCompleted,
        });
      },
    })
      .then((res) => {
        let fr = new FileReader();
        fr.onload = function () {
          let data = JSON.parse(this.result);
          saveDB(data);
        };
        fr.readAsText(res.data);
        setButtonData({
          msg: 'Completed! Processing data...',
          percentage: 100,
        });
      })
      .catch((error) => {
        setButtonData({
          msg: 'An Error Occurred! Please try again.',
          percentage: 0,
        });
      });
  };

  return (
    <div className='get-db mica dsh' onClick={getDatabaseHandler}>
      <p>{buttonData.msg}</p>
      <div
        className='progressbar'
        style={{
          width: `${buttonData.percentage}%`,
          backgroundSize: `${10000 / buttonData.percentage}%`,
        }}
      />
    </div>
  );
};

export default GetDB;
