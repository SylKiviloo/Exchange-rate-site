// CurrencyTable.js
import React from 'react';
import { Link } from "react-router-dom";

const CurrencyTable = (props) => {
  const { base, rates } = props; //define base and rates as object
  if (!rates) {
    return null;
  }
  return (
    <table className="table table-sm bg-light mt-4">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-right pr-4 py-2">1.00 {base}</th>
        </tr>
      </thead>
      <tbody>
        {[rates].map(currency =>  //needs rates to be an array in order to load app
          <tr key={currency.acronym}>
            <td className="pl-4 py-2">{currency.name} <small>({currency.acronym})</small></td>
            <td className="text-right pr-4 py-2">{currency.rate}</td> {/* error with .toFixed(6) */}  
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default CurrencyTable